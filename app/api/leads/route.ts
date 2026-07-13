import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  availabilityRequestSchema,
  ownerSelfServiceSchema,
  ownerAssistedSchema,
} from "@/schemas/lead";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schemasByType = {
  availability_request: availabilityRequestSchema,
  owner_self_service: ownerSelfServiceSchema,
  owner_assisted: ownerAssistedSchema,
} as const;

type LeadType = keyof typeof schemasByType;

const requestBodySchema = z.object({
  type: z.enum(["availability_request", "owner_self_service", "owner_assisted"]),
  data: z.record(z.string(), z.unknown()),
});

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

async function forwardToWebhook(type: LeadType, data: Record<string, unknown>) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[Festei] LEADS_WEBHOOK_URL não configurada no servidor. " +
        "Nenhum lead está sendo entregue a lugar nenhum. Configure a variável " +
        "de ambiente (nunca com prefixo NEXT_PUBLIC_) antes de publicar."
    );
    return { delivered: false, reason: "webhook_not_configured" as const };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, submittedAt: new Date().toISOString(), data }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) {
      console.error(`[Festei] Webhook respondeu ${response.status} para lead do tipo ${type}`);
      return { delivered: false, reason: "webhook_error" as const };
    }
    return { delivered: true };
  } catch (error) {
    clearTimeout(timeout);
    const isTimeout = error instanceof Error && error.name === "AbortError";
    console.error(
      `[Festei] Falha ao entregar lead (${type}):`,
      isTimeout ? "timeout após 8s" : error
    );
    return { delivered: false, reason: isTimeout ? ("timeout" as const) : ("network_error" as const) };
  }
}

export async function POST(req: NextRequest) {
  // 1. Rate limit por IP — antes de qualquer parsing, para não gastar
  // trabalho de validação em tráfego já identificado como abusivo.
  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas solicitações. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds ?? 60) } }
    );
  }

  // 2. Parse do envelope
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const envelope = requestBodySchema.safeParse(body);
  if (!envelope.success) {
    return NextResponse.json(
      { ok: false, error: "Dados da solicitação incompletos ou em formato inválido." },
      { status: 400 }
    );
  }

  const { type, data } = envelope.data;

  // 3. Honeypot — se o campo "website" (invisível para humanos) vier
  // preenchido, é bot. Responde sucesso falso para não ensinar o bot a
  // se adaptar, mas descarta silenciosamente sem entregar ao webhook.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Validação completa e específica do tipo de lead, no servidor —
  // nunca confiar apenas na validação já feita no navegador.
  const schema = schemasByType[type];
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Alguns campos não passaram na validação.",
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 422 }
    );
  }

  // 5. Encaminhamento ao destino real, isolado nesta função para
  // facilitar trocar o provedor no futuro sem tocar no restante da rota.
  const cleanData = { ...(parsed.data as Record<string, unknown>) };
  delete cleanData.website;
  const result = await forwardToWebhook(type, cleanData);

  if (!result.delivered) {
    // Nunca reportar sucesso ao cliente quando o lead não foi
    // efetivamente entregue — essa era a falha crítica do MVP anterior.
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível registrar sua solicitação agora. Tente novamente em instantes ou fale conosco por outro canal.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

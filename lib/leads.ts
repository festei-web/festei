/**
 * Captura de leads da Festei — client-side, chama sempre a API Route
 * interna (/api/leads), nunca um webhook diretamente do navegador.
 *
 * A URL do webhook real vive apenas no servidor (LEADS_WEBHOOK_URL, sem
 * prefixo NEXT_PUBLIC_) e nunca é exposta ao bundle do cliente.
 *
 * MODO DEMO: defina NEXT_PUBLIC_DEMO_MODE=true para simular sucesso sem
 * necessidade de um webhook configurado — útil para demonstrações, nunca
 * para captação real de leads. Fora do modo demo, uma falha de envio
 * SEMPRE retorna erro ao usuário; nunca um sucesso falso.
 */

export type LeadType = "availability_request" | "owner_self_service";

export interface SubmitLeadResult {
  ok: boolean;
  error?: string;
}

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export async function submitLead(
  type: LeadType,
  data: Record<string, unknown>
): Promise<SubmitLeadResult> {
  if (DEMO_MODE) {
    console.info("[Festei] NEXT_PUBLIC_DEMO_MODE ativo — lead simulado, nada foi enviado.", {
      type,
      data,
    });
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true };
  }

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        error:
          body?.error ??
          "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Não conseguimos conectar ao servidor. Verifique sua internet e tente novamente.",
    };
  }
}

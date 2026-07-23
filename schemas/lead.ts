import { z } from "zod";
import {
  AVAILABILITY_STATUSES,
  AVAILABILITY_SOURCES,
  AVAILABILITY_TIMEZONE,
  getISODateInTimeZone,
  isPastDateISO,
  isValidISODate,
} from "@/lib/availability";

// Campo-armadilha invisível para humanos, preenchido apenas por bots.
// Se vier preenchido, a submissão é descartada silenciosamente (ver app/api/leads/route.ts).
const honeypot = z.string().max(0).optional().or(z.literal(""));

// Formulário de solicitação de disponibilidade (cliente)
// Canal de contato preferido é obrigatório — PRD Cap. 5, seção 5.24; Cap. 6, RF-018.
//
// eventDate é validado de novo aqui (formato + não pode estar no passado)
// porque a única fonte confiável de "hoje" é o momento em que o servidor
// recebe a requisição — nunca confiar apenas na checagem já feita no
// calendário do cliente (prompt de melhorias, item 24).
export const availabilityRequestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  phone: z.string().trim().min(10, "Informe um telefone válido com DDD.").max(20),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  eventType: z.string().min(1, "Selecione o tipo de evento."),
  eventDate: z
    .string()
    .trim()
    .min(1, "Selecione a data do evento no calendário.")
    .refine(isValidISODate, "Data do evento em formato inválido.")
    .refine(
      (v) => !isValidISODate(v) || !isPastDateISO(v, getISODateInTimeZone(new Date())),
      "A data do evento não pode estar no passado."
    ),
  startTime: z.string().trim().max(10).optional(),
  endTime: z.string().trim().max(10).optional(),
  guestCount: z.coerce.number().int().min(1, "Informe a quantidade de convidados.").max(5000),
  contactChannel: z.enum(["apenas_texto", "aceita_ligacao"], {
    error: "Escolha como prefere ser contatado.",
  }),
  message: z.string().trim().max(1000).optional(),
  venueId: z.string(),
  venueName: z.string(),
  // Estado de disponibilidade conhecido no momento da seleção — nunca
  // equivalente a uma reserva confirmada (ver lib/availability.ts).
  availabilityStatus: z.enum(AVAILABILITY_STATUSES).default("unconfirmed"),
  availabilitySource: z.enum(AVAILABILITY_SOURCES).default("none"),
  selectedAt: z.string().trim().max(40).optional(),
  timezone: z.string().trim().max(60).default(AVAILABILITY_TIMEZONE),
  website: honeypot,
});

export type AvailabilityRequestInput = z.input<typeof availabilityRequestSchema>;
export type AvailabilityRequestValues = z.output<typeof availabilityRequestSchema>;

// Situação atual do local — ajuda a equipe a priorizar a triagem inicial
// (prompt de melhorias, item 15).
export const venueStatusOptions = [
  { value: "ja_recebe_festas", label: "Já recebe festas" },
  { value: "em_preparacao", label: "Está sendo preparado" },
  { value: "quero_saber_se_encaixa", label: "Quero saber se ele se encaixa na Festei" },
] as const;

export const venueStatusValues = venueStatusOptions.map((o) => o.value) as [
  (typeof venueStatusOptions)[number]["value"],
  ...(typeof venueStatusOptions)[number]["value"][],
];

// Cadastro de proprietário — triagem inicial simples, sem exigir
// documentos, CPF/CNPJ, dados bancários, endereço completo, tabela de
// preços, upload obrigatório de fotos ou comprovação de propriedade.
// Esses dados pertencem a uma etapa posterior do onboarding.
export const ownerSelfServiceSchema = z
  .object({
    name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
    phone: z.string().trim().min(10, "Informe um telefone válido com DDD.").max(20),
    email: z.string().trim().email("Informe um e-mail válido.").max(160),
    city: z.string().trim().min(2, "Informe a cidade.").max(100),
    neighborhood: z.string().trim().min(2, "Informe o bairro.").max(100),
    category: z.string().min(1, "Selecione o tipo de local."),
    approxCapacity: z.coerce.number().int().min(1, "Informe a capacidade aproximada.").max(10000),
    venueStatus: z.enum(venueStatusValues, {
      error: "Selecione a situação atual do local.",
    }),
    venueName: z.string().trim().max(150).optional(),
    venueHasNoName: z.boolean().optional(),
    instagram: z.string().trim().max(60).optional(),
    site: z.string().trim().max(160).optional(),
    message: z.string().trim().max(1000).optional(),
    website: honeypot,
    // Capturados automaticamente no cliente — nunca perguntados ao usuário
    // (prompt de melhorias, item 25).
    pageUrl: z.string().trim().max(500).optional(),
    pageOrigin: z.string().trim().max(120).optional(),
    utmSource: z.string().trim().max(120).optional(),
    utmMedium: z.string().trim().max(120).optional(),
    utmCampaign: z.string().trim().max(120).optional(),
    utmTerm: z.string().trim().max(120).optional(),
    utmContent: z.string().trim().max(120).optional(),
  })
  .refine((data) => data.venueHasNoName || (data.venueName && data.venueName.trim().length >= 2), {
    message: "Informe o nome do local ou marque a opção \"ainda não possui nome\".",
    path: ["venueName"],
  });

export type OwnerSelfServiceInput = z.input<typeof ownerSelfServiceSchema>;
export type OwnerSelfServiceValues = z.output<typeof ownerSelfServiceSchema>;

import { z } from "zod";

// Campo-armadilha invisível para humanos, preenchido apenas por bots.
// Se vier preenchido, a submissão é descartada silenciosamente (ver app/api/leads/route.ts).
const honeypot = z.string().max(0).optional().or(z.literal(""));

// Formulário de solicitação de disponibilidade (cliente)
// Canal de contato preferido é obrigatório — PRD Cap. 5, seção 5.24; Cap. 6, RF-018.
export const availabilityRequestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  phone: z.string().trim().min(10, "Informe um telefone válido com DDD.").max(20),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  eventType: z.string().min(1, "Selecione o tipo de evento."),
  eventDate: z.string().min(1, "Informe a data prevista do evento."),
  startTime: z.string().trim().max(10).optional(),
  endTime: z.string().trim().max(10).optional(),
  guestCount: z.coerce.number().int().min(1, "Informe a quantidade de convidados.").max(5000),
  contactChannel: z.enum(["apenas_texto", "aceita_ligacao"], {
    error: "Escolha como prefere ser contatado.",
  }),
  message: z.string().trim().max(1000).optional(),
  venueId: z.string(),
  venueName: z.string(),
  website: honeypot,
});

export type AvailabilityRequestInput = z.input<typeof availabilityRequestSchema>;
export type AvailabilityRequestValues = z.output<typeof availabilityRequestSchema>;

// Cadastro de proprietário — caminho self-service (formulário completo)
export const ownerSelfServiceSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  phone: z.string().trim().min(10, "Informe um telefone válido com DDD.").max(20),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  venueName: z.string().trim().min(2, "Informe o nome do local.").max(150),
  category: z.string().min(1, "Selecione o tipo de local."),
  neighborhood: z.string().trim().min(2, "Informe o bairro.").max(100),
  approxCapacity: z.coerce.number().int().min(1, "Informe a capacidade aproximada.").max(10000),
  instagram: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1000).optional(),
  website: honeypot,
});

export type OwnerSelfServiceInput = z.input<typeof ownerSelfServiceSchema>;
export type OwnerSelfServiceValues = z.output<typeof ownerSelfServiceSchema>;

// Cadastro de proprietário — caminho assistido ("Prefiro que me liguem")
// Apenas dois campos, de propósito — reduzir fricção para o proprietário cético
// (PRD Cap. 3, seção 3.9; Cap. 4, seção 4.4).
export const ownerAssistedSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  phone: z.string().trim().min(10, "Informe um telefone válido com DDD.").max(20),
  website: honeypot,
});

export type OwnerAssistedInput = z.input<typeof ownerAssistedSchema>;
export type OwnerAssistedValues = z.output<typeof ownerAssistedSchema>;

import { z } from "zod";

/**
 * Validação da quantidade de convidados da busca principal (prompt de
 * melhorias: limite máximo de 1.000 pessoas). Fonte única de verdade
 * para os limites e as mensagens de erro — usada tanto no campo da
 * busca (Hero) quanto na leitura do parâmetro `convidados` da URL, para
 * nunca confiar apenas nos atributos HTML (`min`/`max`) nem no cliente.
 */

export const MIN_GUEST_COUNT = 1;
export const MAX_GUEST_COUNT = 1000;

export const guestCountMessages = {
  notInteger: "Informe um número inteiro de convidados.",
  belowMin: "Informe pelo menos 1 convidado.",
  aboveMax: "Informe até 1.000 convidados.",
} as const;

/**
 * Valida a STRING bruta (não vazia) digitada/colada no campo ou vinda
 * da URL. String vazia é tratada à parte por `validateGuestCount`.
 */
const nonEmptyGuestCountSchema = z
  .string()
  .trim()
  .refine((v) => /^-?\d+$/.test(v), { message: guestCountMessages.notInteger })
  .transform((v) => Number(v))
  .refine((n) => n >= MIN_GUEST_COUNT, { message: guestCountMessages.belowMin })
  .refine((n) => n <= MAX_GUEST_COUNT, { message: guestCountMessages.aboveMax });

export interface GuestCountValidation {
  /** Número válido, ou `null` quando o campo está vazio (sem filtro) ou inválido. */
  value: number | null;
  error: string | null;
}

/**
 * Roda a validação e devolve um resultado pronto para uso na UI. String
 * vazia é válida (significa "sem filtro de convidados", não é erro).
 */
export function validateGuestCount(raw: string): GuestCountValidation {
  const trimmed = raw.trim();
  if (trimmed === "") return { value: null, error: null };

  const result = nonEmptyGuestCountSchema.safeParse(trimmed);
  if (!result.success) {
    return { value: null, error: result.error.issues[0]?.message ?? guestCountMessages.notInteger };
  }
  return { value: result.data, error: null };
}

/**
 * Usada para parâmetros vindos de fora (URL) — nunca confia no valor,
 * apenas aceita se for válido; caso contrário, ignora silenciosamente
 * (equivalente à validação de servidor nesta arquitetura sem endpoint
 * de busca dedicado — mesma decisão aplicada em data/rio-neighborhoods.ts
 * para o parâmetro de bairro).
 */
export function parseTrustedGuestCount(raw: string | null): number | null {
  if (!raw) return null;
  return validateGuestCount(raw).value;
}

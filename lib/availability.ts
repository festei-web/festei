/**
 * Camada de disponibilidade dos locais (calendário real de disponibilidade
 * — prompt de melhorias). Ainda não existe painel do proprietário nem
 * integração de agenda (Google Calendar, Outlook, iCal ou similar):
 * `getListingAvailability` sempre retorna uma lista vazia, então toda
 * data aparece como "unconfirmed" (sem bloqueio informado) até que uma
 * fonte real exista.
 *
 * Quando o painel do proprietário ou uma integração externa existir,
 * troque apenas a implementação de `getListingAvailability` (ex.: uma
 * consulta a uma tabela `availability_entries` no Supabase, filtrada por
 * `listingId`, ou um adaptador que sincroniza um calendário externo e
 * grava as mesmas entradas) — os tipos, a resolução de status e todos os
 * componentes de cliente continuam os mesmos.
 *
 * IMPORTANTE: "available" (confirmado por uma fonte real) e "unconfirmed"
 * (nenhuma fonte atualizou a data) nunca devem ser tratados como
 * equivalentes — ver AVAILABILITY_STATUS_COPY abaixo.
 */

export const AVAILABILITY_STATUSES = [
  "available",
  "reserved",
  "blocked",
  "pending",
  "unconfirmed",
] as const;
export type AvailabilityStatus = (typeof AVAILABILITY_STATUSES)[number];

export const AVAILABILITY_SOURCES = ["owner", "admin", "integration", "mock", "none"] as const;
export type AvailabilitySource = (typeof AVAILABILITY_SOURCES)[number];

export interface AvailabilityEntry {
  listingId: string;
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  source: AvailabilitySource;
  updatedAt?: string;
  reason?: string;
}

/** Fuso horário oficial da operação — evita o erro clássico de calcular
 * "hoje" a partir de UTC e exibir o dia errado perto da meia-noite. */
export const AVAILABILITY_TIMEZONE = "America/Sao_Paulo";

/** Limite de consulta futura no calendário, em meses. Configurável. */
export const AVAILABILITY_HORIZON_MONTHS = 12;

/**
 * Busca as entradas de disponibilidade de um local. Hoje não há fonte de
 * dados real (sem painel do proprietário, sem integração), então retorna
 * sempre uma lista vazia — nenhuma data é apresentada como "disponível",
 * "reservada" ou "bloqueada" sem uma fonte real e identificável.
 */
export async function getListingAvailability(listingId: string): Promise<AvailabilityEntry[]> {
  // TODO(backend real): substituir por uma consulta real por listingId
  // (painel do proprietário, administrador da Festei, ou uma integração
  // sincronizada de calendário externo), mantendo a mesma assinatura.
  void listingId;
  return [];
}

export interface ResolvedDateStatus {
  status: AvailabilityStatus;
  source: AvailabilitySource;
  reason?: string;
  updatedAt?: string;
}

/** Resolve o status de uma data específica a partir das entradas
 * conhecidas. Nenhuma entrada encontrada => "unconfirmed" / source "none". */
export function resolveDateStatus(
  entries: AvailabilityEntry[],
  dateISO: string
): ResolvedDateStatus {
  const entry = entries.find((e) => e.date === dateISO);
  if (!entry) {
    return { status: "unconfirmed", source: "none" };
  }
  return {
    status: entry.status,
    source: entry.source,
    reason: entry.reason,
    updatedAt: entry.updatedAt,
  };
}

/** Data (YYYY-MM-DD) de um instante, calculada num fuso horário explícito
 * — nunca a partir do fuso local do servidor/navegador, para que o
 * cálculo dê o mesmo resultado em qualquer máquina. */
export function getISODateInTimeZone(
  date: Date,
  timeZone: string = AVAILABILITY_TIMEZONE
): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function isPastDateISO(dateISO: string, todayISO: string): boolean {
  return dateISO < todayISO;
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
  );
}

const WEEKDAY_LABELS_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTH_LABELS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function getWeekdayShortLabels(): string[] {
  return WEEKDAY_LABELS_SHORT;
}

export function formatMonthLabel(year: number, month: number): string {
  return `${capitalize(MONTH_LABELS[month])} de ${year}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "Sábado, 18 de outubro de 2026" — sempre calculado em UTC a partir das
 * peças YYYY-MM-DD, para nunca sofrer deslocamento por fuso horário. */
export function formatLongDatePtBR(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: "UTC" }).format(
    date
  );
  return `${capitalize(weekday)}, ${d} de ${MONTH_LABELS[m - 1]} de ${y}`;
}

/** "18/10/2026" */
export function formatShortDatePtBR(dateISO: string): string {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}/${y}`;
}

export interface CalendarDayCell {
  dateISO: string;
  day: number;
  outsideMonth: boolean;
}

/** Gera a grade de um mês (semanas de domingo a sábado), incluindo os dias
 * do mês anterior/seguinte necessários para completar as semanas. */
export function buildMonthGrid(year: number, month: number): CalendarDayCell[][] {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const startWeekday = firstOfMonth.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const daysInPrevMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < startWeekday; i++) {
    const day = daysInPrevMonth - startWeekday + i + 1;
    const d = new Date(Date.UTC(year, month - 1, day));
    cells.push({
      dateISO: getISODateInTimeZone(d, "UTC"),
      day,
      outsideMonth: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, month, day));
    cells.push({ dateISO: getISODateInTimeZone(d, "UTC"), day, outsideMonth: false });
  }

  while (cells.length % 7 !== 0) {
    const day = cells.length - (startWeekday + daysInMonth) + 1;
    const d = new Date(Date.UTC(year, month + 1, day));
    cells.push({ dateISO: getISODateInTimeZone(d, "UTC"), day, outsideMonth: true });
  }

  const weeks: CalendarDayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export interface AvailabilityStatusCopy {
  /** Rótulo curto usado na legenda e no dia. */
  label: string;
  /** Complemento de acessibilidade anunciado por leitor de tela em cada dia. */
  a11ySuffix: string;
  /** Se o dia pode ser selecionado pelo visitante. */
  selectable: boolean;
  /** Mensagem exibida (região aria-live) ao selecionar ou tentar selecionar o dia. */
  interactionMessage: string;
}

export const AVAILABILITY_STATUS_COPY: Record<AvailabilityStatus, AvailabilityStatusCopy> = {
  available: {
    label: "Disponível",
    a11ySuffix: "disponível, selecionável",
    selectable: true,
    interactionMessage:
      "Esta data consta como disponível, mas a reserva só será confirmada após a aprovação da solicitação.",
  },
  reserved: {
    label: "Reservada",
    a11ySuffix: "reservada. Essa data não pode ser selecionada",
    selectable: false,
    interactionMessage: "Reservada. Essa data não pode ser selecionada.",
  },
  blocked: {
    label: "Bloqueada",
    a11ySuffix: "bloqueada. Essa data não pode ser selecionada",
    selectable: false,
    interactionMessage: "Bloqueada. Essa data não pode ser selecionada.",
  },
  pending: {
    label: "Aguardando confirmação",
    a11ySuffix: "aguardando confirmação. Esta data está em análise no momento",
    selectable: false,
    interactionMessage: "Aguardando confirmação. Esta data está em análise no momento.",
  },
  unconfirmed: {
    label: "Sem bloqueio informado",
    a11ySuffix: "sem bloqueio informado, selecionável",
    selectable: true,
    interactionMessage:
      "Data selecionada. A disponibilidade será confirmada pelo proprietário após o envio da solicitação.",
  },
};

"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Lock,
  Ban,
  Clock,
  CircleDashed,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { track, getDeviceType } from "@/lib/analytics";
import {
  AVAILABILITY_STATUS_COPY,
  AVAILABILITY_TIMEZONE,
  AVAILABILITY_HORIZON_MONTHS,
  buildMonthGrid,
  formatLongDatePtBR,
  formatMonthLabel,
  getISODateInTimeZone,
  getWeekdayShortLabels,
  isPastDateISO,
  resolveDateStatus,
  type AvailabilityEntry,
  type AvailabilityStatus,
} from "@/lib/availability";

const LEGEND_ITEMS: { status: AvailabilityStatus; icon: React.ElementType }[] = [
  { status: "available", icon: CheckCircle2 },
  { status: "reserved", icon: Lock },
  { status: "blocked", icon: Ban },
  { status: "pending", icon: Clock },
  { status: "unconfirmed", icon: CircleDashed },
];

function toMonthIndex(year: number, month: number) {
  return year * 12 + month;
}
function fromMonthIndex(index: number) {
  return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 };
}

/** "Hoje" nunca muda por conta própria durante a sessão — não há nada
 * para assinar, só a diferença entre o snapshot do server e o do cliente. */
function subscribeNever() {
  return () => {};
}

function dayButtonClasses({
  status,
  isPast,
  isSelected,
  isToday,
}: {
  status: AvailabilityStatus;
  isPast: boolean;
  isSelected: boolean;
  isToday: boolean;
}): string {
  if (isPast) {
    return "border border-transparent text-gray-300 cursor-not-allowed";
  }
  if (isSelected) {
    return "border border-primary bg-primary text-white shadow-sm";
  }

  const base = "hover:border-primary/60";
  switch (status) {
    case "available":
      return cn(base, "border border-success/50 bg-success/5 text-ink hover:bg-success/10");
    case "unconfirmed":
      return cn(
        base,
        "border border-dashed border-border text-ink hover:bg-primary-light/40",
        isToday && "border-primary/60"
      );
    case "reserved":
      return "border border-error/30 bg-error/5 text-gray-medium cursor-not-allowed line-through decoration-error/50";
    case "blocked":
      return "border border-gray-medium/30 bg-gray-light text-gray-medium cursor-not-allowed [background-image:repeating-linear-gradient(45deg,rgba(107,114,128,0.12)_0_4px,transparent_4px_8px)]";
    case "pending":
      return "border border-dashed border-warning/60 bg-warning/10 text-gray-medium cursor-not-allowed";
  }
}

function CalendarSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden>
      <div className="mb-3 flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg bg-gray-light" />
        <div className="h-4 w-32 rounded bg-gray-light" />
        <div className="h-8 w-8 rounded-lg bg-gray-light" />
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-9 rounded-lg bg-gray-light" />
        ))}
      </div>
    </div>
  );
}

export interface AvailabilityCalendarProps {
  listingId: string;
  availability: AvailabilityEntry[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  timezone?: string;
  loading?: boolean;
  error?: string | null;
  horizonMonths?: number;
}

/**
 * Calendário real de disponibilidade — reutilizável em qualquer página de
 * local: recebe apenas os dados do local correspondente (listingId,
 * availability) e não guarda nenhuma lógica específica de um anúncio.
 *
 * Datas sem entrada em `availability` são tratadas como "unconfirmed"
 * ("Sem bloqueio informado"), nunca como "available" — essa distinção é a
 * regra de transparência central desta funcionalidade (nunca prometer uma
 * disponibilidade que não foi confirmada por uma fonte real).
 */
export function AvailabilityCalendar({
  listingId,
  availability,
  selectedDate,
  onDateSelect,
  timezone = AVAILABILITY_TIMEZONE,
  loading = false,
  error = null,
  horizonMonths = AVAILABILITY_HORIZON_MONTHS,
}: AvailabilityCalendarProps) {
  const titleId = React.useId();
  // "Hoje" só existe de verdade no cliente: uma página de local é
  // pré-renderizada (SSG) potencialmente muito antes de ser aberta, então
  // não pode vir do momento da renderização no servidor — isso causaria
  // tanto um erro de hidratação quanto uma data errada exibida.
  // useSyncExternalStore (em vez de useEffect + setState) devolve `null`
  // no server e na primeira renderização do cliente (idênticas, sem
  // mismatch), e só passa a devolver a data real depois de montado.
  const todayISO = React.useSyncExternalStore(
    subscribeNever,
    () => getISODateInTimeZone(new Date(), timezone),
    () => null
  );
  // Deslocamento em meses a partir do mês atual — sempre começa em 0 no
  // server e no cliente (nunca depende de "hoje"), então não precisa de
  // nenhuma inicialização assíncrona.
  const [viewOffset, setViewOffset] = React.useState(0);
  const [liveMessage, setLiveMessage] = React.useState("");
  const viewedRef = React.useRef(false);

  React.useEffect(() => {
    if (todayISO !== null && !viewedRef.current) {
      viewedRef.current = true;
      track("availability_calendar_viewed", { listingId, deviceType: getDeviceType() });
    }
  }, [todayISO, listingId]);

  const showSkeleton = todayISO === null || loading;

  const todayMonthIndex = React.useMemo(() => {
    if (!todayISO) return null;
    const [y, m] = todayISO.split("-").map(Number);
    return toMonthIndex(y, m - 1);
  }, [todayISO]);

  const viewIndex = todayMonthIndex !== null ? todayMonthIndex + viewOffset : null;

  function changeMonth(nextOffset: number) {
    setViewOffset(nextOffset);
    if (todayMonthIndex === null) return;
    const { year, month } = fromMonthIndex(todayMonthIndex + nextOffset);
    track("availability_month_changed", {
      listingId,
      month: `${year}-${String(month + 1).padStart(2, "0")}`,
      deviceType: getDeviceType(),
    });
  }

  function handleDayInteraction(dateISO: string, isPast: boolean) {
    if (isPast) return;
    const resolved = resolveDateStatus(availability, dateISO);
    const copy = AVAILABILITY_STATUS_COPY[resolved.status];
    if (copy.selectable) {
      onDateSelect(dateISO);
      setLiveMessage(`${formatLongDatePtBR(dateISO)}. ${copy.interactionMessage}`);
      track("event_date_selected", {
        listingId,
        month: dateISO.slice(0, 7),
        status: resolved.status,
        deviceType: getDeviceType(),
      });
    } else {
      setLiveMessage(`${formatLongDatePtBR(dateISO)}. ${copy.interactionMessage}`);
      track("unavailable_date_clicked", {
        listingId,
        status: resolved.status,
        deviceType: getDeviceType(),
      });
    }
  }

  const selectedResolved = selectedDate ? resolveDateStatus(availability, selectedDate) : null;
  const weekdayLabels = getWeekdayShortLabels();
  const view = viewIndex !== null ? fromMonthIndex(viewIndex) : null;

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-4">
      <div>
        <h2 id={titleId} className="flex items-center gap-2 text-lg font-semibold text-ink">
          <CalendarDays className="h-5 w-5 text-primary" aria-hidden />
          Escolha a data do seu evento
        </h2>
        <p className="mt-1 text-sm text-gray-medium">
          Selecione uma data para consultar a disponibilidade deste local.
        </p>
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-gray-medium">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden />
          {error}
        </p>
      )}

      {showSkeleton ? (
        <>
          <CalendarSkeleton />
          <p className="text-sm text-gray-medium" role="status">
            Carregando disponibilidade...
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Mês anterior"
              disabled={viewOffset <= 0}
              onClick={() => changeMonth(viewOffset - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink transition-colors duration-150 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-ink" aria-live="off">
                {formatMonthLabel(view!.year, view!.month)}
              </span>
              {viewOffset !== 0 && (
                <button
                  type="button"
                  onClick={() => changeMonth(0)}
                  className="text-xs font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
                >
                  Voltar ao mês atual
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="Próximo mês"
              disabled={viewOffset >= horizonMonths}
              onClick={() => changeMonth(viewOffset + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink transition-colors duration-150 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <table className="w-full border-collapse text-center">
            <caption className="sr-only">{formatMonthLabel(view!.year, view!.month)}</caption>
            <thead>
              <tr>
                {weekdayLabels.map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="pb-1.5 text-xs font-medium uppercase text-gray-medium"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buildMonthGrid(view!.year, view!.month).map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((cell) => {
                      if (cell.outsideMonth) {
                        return (
                          <td key={cell.dateISO} className="p-0.5">
                            <span aria-hidden className="block h-9 w-full text-sm text-gray-300">
                              {cell.day}
                            </span>
                          </td>
                        );
                      }

                      const isPast = isPastDateISO(cell.dateISO, todayISO!);
                      const isToday = cell.dateISO === todayISO;
                      const isSelected = cell.dateISO === selectedDate;
                      const resolved = resolveDateStatus(availability, cell.dateISO);
                      const copy = AVAILABILITY_STATUS_COPY[resolved.status];
                      const dateLabel = formatLongDatePtBR(cell.dateISO);
                      const a11yLabel = isPast
                        ? `${dateLabel}, data anterior indisponível`
                        : `${dateLabel}, ${copy.a11ySuffix}`;

                      return (
                        <td key={cell.dateISO} className="p-0.5 align-middle">
                          <button
                            type="button"
                            disabled={isPast}
                            aria-disabled={!isPast && !copy.selectable ? true : undefined}
                            aria-pressed={isSelected}
                            aria-current={isToday ? "date" : undefined}
                            aria-label={a11yLabel}
                            onClick={() => handleDayInteraction(cell.dateISO, isPast)}
                            className={cn(
                              "relative flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                              dayButtonClasses({
                                status: resolved.status,
                                isPast,
                                isSelected,
                                isToday,
                              })
                            )}
                          >
                            {cell.day}
                            {isToday && !isSelected && (
                              <span
                                aria-hidden
                                className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"
                              />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                )
              )}
            </tbody>
          </table>

          <p aria-live="polite" className="sr-only">
            {liveMessage}
          </p>

          <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-medium">
            {LEGEND_ITEMS.map(({ status, icon: Icon }) => (
              <li key={status} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {AVAILABILITY_STATUS_COPY[status].label}
              </li>
            ))}
          </ul>

          {selectedDate && selectedResolved && (
            <div className="rounded-xl border border-border bg-gray-light/60 p-3.5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-medium">
                Data selecionada
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">
                {formatLongDatePtBR(selectedDate)}
              </p>
              <p className="mt-1 text-xs text-gray-medium">
                {AVAILABILITY_STATUS_COPY[selectedResolved.status].interactionMessage}
              </p>
            </div>
          )}

          {!error && availability.length === 0 && (
            <p className="text-xs text-gray-medium">
              Ainda não há informações de disponibilidade para este local. A
              data escolhida será confirmada pelo proprietário.
            </p>
          )}

          <p className="text-xs text-gray-medium">
            As datas exibidas podem depender da confirmação do proprietário. A
            seleção de uma data não garante a reserva.
          </p>
        </>
      )}
    </section>
  );
}

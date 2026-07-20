"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PartyPopper, MapPin, Users, ArrowRight, AlertCircle } from "lucide-react";
import { eventTypeLabels } from "@/data/constants";
import { allNeighborhoods } from "@/data/rio-neighborhoods";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { EventTypeSelect } from "@/components/ui/event-type-select";
import { NeighborhoodCombobox } from "@/components/ui/neighborhood-combobox";
import { validateGuestCount, MAX_GUEST_COUNT } from "@/schemas/guest-count";

const eventTypeOptions = Object.entries(eventTypeLabels).map(([value, label]) => ({
  value,
  label,
}));

/**
 * Busca da Festei — identidade própria, deliberadamente diferente do
 * padrão "pílula segmentada" do Airbnb: cada campo é um bloco distinto,
 * com selo circular colorido (não ícone flat) e o "Tipo de evento" vem
 * primeiro — porque na Festei a pessoa pensa na celebração antes de
 * pensar em onde ela vai acontecer.
 */
export function SearchBar() {
  const router = useRouter();
  const [eventType, setEventType] = React.useState("");
  const [neighborhoodSlug, setNeighborhoodSlug] = React.useState("");
  const [guests, setGuests] = React.useState("");
  const [guestsError, setGuestsError] = React.useState<string | null>(null);
  const guestsInputRef = React.useRef<HTMLInputElement>(null);

  // Nunca deixa digitar mais de 4 algarismos (limite de 1000 tem 4
  // dígitos) — restrição em tempo real, além da validação completa que
  // roda ao sair do campo e ao enviar o formulário.
  function handleGuestsChange(raw: string) {
    const digitCount = (raw.match(/\d/g) ?? []).length;
    if (digitCount > 4) return;
    setGuests(raw);
    if (guestsError) setGuestsError(null);
  }

  function handleGuestsBlur() {
    const { error } = validateGuestCount(guests);
    setGuestsError(error);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { value: guestsValue, error: guestsValidationError } = validateGuestCount(guests);
    if (guestsValidationError) {
      setGuestsError(guestsValidationError);
      guestsInputRef.current?.focus();
      return;
    }

    const params = new URLSearchParams();
    if (neighborhoodSlug) params.set("bairro", neighborhoodSlug);
    if (eventType) params.set("evento", eventType);
    if (guestsValue) params.set("convidados", String(guestsValue));
    track("hero_search_submitted", { neighborhoodSlug, eventType, guests: guestsValue });
    router.push(`/locais?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscar locais para eventos"
      className="w-full rounded-[28px] border border-border bg-white p-3 shadow-[var(--shadow-lg)] sm:p-4"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          icon={<PartyPopper className="h-5 w-5" aria-hidden />}
          label="Tipo de evento"
        >
          <EventTypeSelect
            variant="bare"
            value={eventType}
            onChange={setEventType}
            options={eventTypeOptions}
            placeholder="Selecione o tipo de festa"
          />
        </Field>

        <Field icon={<MapPin className="h-5 w-5" aria-hidden />} label="Região">
          <NeighborhoodCombobox
            variant="bare"
            value={neighborhoodSlug}
            onChange={setNeighborhoodSlug}
            options={allNeighborhoods}
            placeholder="Selecione um bairro"
          />
        </Field>

        <Field icon={<Users className="h-5 w-5" aria-hidden />} label="Convidados" error={!!guestsError}>
          <input
            ref={guestsInputRef}
            type="number"
            min={1}
            max={MAX_GUEST_COUNT}
            step={1}
            inputMode="numeric"
            placeholder="Quantas pessoas"
            value={guests}
            aria-invalid={!!guestsError}
            aria-describedby={guestsError ? "hero-guests-error" : undefined}
            onChange={(e) => handleGuestsChange(e.target.value)}
            onBlur={handleGuestsBlur}
            className="w-full min-w-0 bg-transparent text-[15px] font-medium text-ink placeholder:text-gray-medium placeholder:font-normal focus:outline-none"
          />
        </Field>
      </div>

      {guestsError && (
        <p id="hero-guests-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {guestsError}
        </p>
      )}

      <button
        type="submit"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-primary)] transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] sm:mt-3"
      >
        Buscar locais
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
  error,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-gray-light/50 px-4 py-3",
        "transition-colors duration-200 focus-within:border-primary focus-within:bg-primary-light/40",
        error && "border-error focus-within:border-error"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-[var(--shadow-sm)]">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-medium">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

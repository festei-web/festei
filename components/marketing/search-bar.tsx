"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PartyPopper, MapPin, Users, ArrowRight } from "lucide-react";
import { eventTypeLabels } from "@/data/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
  const [location, setLocation] = React.useState("");
  const [guests, setGuests] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("local", location);
    if (eventType) params.set("evento", eventType);
    if (guests) params.set("convidados", guests);
    track("hero_search_submitted", { location, eventType, guests });
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
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full appearance-none bg-transparent text-[15px] font-medium text-ink focus:outline-none"
          >
            <option value="">Qual a celebração?</option>
            {Object.entries(eventTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field icon={<MapPin className="h-5 w-5" aria-hidden />} label="Região">
          <input
            type="text"
            placeholder="Bairro ou cidade"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-[15px] font-medium text-ink placeholder:text-gray-medium placeholder:font-normal focus:outline-none"
          />
        </Field>

        <Field icon={<Users className="h-5 w-5" aria-hidden />} label="Convidados">
          <input
            type="number"
            min={1}
            placeholder="Quantas pessoas"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-[15px] font-medium text-ink placeholder:text-gray-medium placeholder:font-normal focus:outline-none"
          />
        </Field>
      </div>

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
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-gray-light/50 px-4 py-3",
        "transition-colors duration-200 focus-within:border-primary focus-within:bg-primary-light/40"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-[var(--shadow-sm)]">
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-medium">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

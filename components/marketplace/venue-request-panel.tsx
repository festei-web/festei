"use client";

import * as React from "react";
import { AvailabilityCalendar } from "./availability-calendar";
import { AvailabilityForm } from "./availability-form";
import {
  AVAILABILITY_TIMEZONE,
  resolveDateStatus,
  type AvailabilityEntry,
} from "@/lib/availability";

/**
 * Painel de solicitação do local: reúne o calendário real de
 * disponibilidade e o formulário de solicitação, compartilhando o estado
 * da data selecionada entre os dois (a seleção no calendário preenche o
 * formulário automaticamente — prompt de melhorias, item 9).
 */
export function VenueRequestPanel({
  venueId,
  venueName,
  venueSlug,
}: {
  venueId: string;
  venueName: string;
  venueSlug: string;
}) {
  const [entries, setEntries] = React.useState<AvailabilityEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedAt, setSelectedAt] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/availability/${venueId}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const body = await res.json();
        if (!cancelled) {
          setEntries(Array.isArray(body.entries) ? body.entries : []);
        }
      } catch {
        if (!cancelled) {
          setEntries([]);
          setError(
            "Não foi possível carregar a disponibilidade neste momento. Você ainda pode enviar uma solicitação para confirmação."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [venueId]);

  function handleDateSelect(date: string | null) {
    setSelectedDate(date);
    setSelectedAt(date ? new Date().toISOString() : null);
  }

  const resolved = selectedDate ? resolveDateStatus(entries, selectedDate) : null;

  return (
    <div className="flex flex-col gap-6">
      <AvailabilityCalendar
        listingId={venueId}
        availability={entries}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        loading={loading}
        error={error}
      />
      <hr className="border-border/70" />
      <AvailabilityForm
        venueId={venueId}
        venueName={venueName}
        venueSlug={venueSlug}
        selectedDate={selectedDate}
        selectedAt={selectedAt}
        availabilityStatus={resolved?.status ?? "unconfirmed"}
        availabilitySource={resolved?.source ?? "none"}
        timezone={AVAILABILITY_TIMEZONE}
      />
    </div>
  );
}

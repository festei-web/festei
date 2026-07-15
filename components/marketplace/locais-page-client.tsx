"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { DemoDataBanner } from "./demo-data-banner";
import { venues } from "@/data/venues";
import { VenueCard } from "@/components/marketplace/venue-card";
import { FilterBar } from "@/components/marketplace/filter-bar";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";
import { EmptyState } from "@/components/ui/states";
import { Select } from "@/components/ui/select";
import { eventTypeLabels } from "@/data/constants";
import { categories } from "@/data/categories";
import { amenities } from "@/data/amenities";
import type { EventType } from "@/types";
import {
  applyFilters,
  sortVenues,
  emptyFilters,
  type VenueFilters,
  type SortOption,
} from "@/lib/filters";
import { ArrowUpDown, X } from "lucide-react";
import { track } from "@/lib/analytics";

// Resumo contextual dinâmico — reflete os filtros realmente aplicados,
// em vez de um título genérico fixo (PRD Cap. 6, seção sobre busca).
function buildSummary(filters: VenueFilters, resultCount: number): string {
  const eventLabel = filters.eventType ? eventTypeLabels[filters.eventType as EventType] : null;

  let text = resultCount === 1 ? "1 local" : `${resultCount} locais`;

  if (eventLabel) {
    text += ` para ${eventLabel.toLowerCase()}`;
  }

  if (filters.location) {
    text += ` em ${filters.location}`;
  } else {
    text += " no Rio de Janeiro";
  }

  if (filters.guestCount) {
    text += `, com capacidade para ${filters.guestCount} convidados`;
  }

  return text;
}

// Chips dos filtros realmente aplicados, cada um removível individualmente
// (PRD Cap. 6 — busca; prompt de melhorias, item 14).
function ActiveFilterChips({
  filters,
  onChange,
}: {
  filters: VenueFilters;
  onChange: (filters: VenueFilters) => void;
}) {
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (filters.location) {
    chips.push({
      key: "location",
      label: filters.location,
      clear: () => onChange({ ...filters, location: "" }),
    });
  }
  if (filters.category) {
    const label = categories.find((c) => c.id === filters.category)?.label ?? filters.category;
    chips.push({
      key: "category",
      label,
      clear: () => onChange({ ...filters, category: "" }),
    });
  }
  if (filters.eventType) {
    chips.push({
      key: "eventType",
      label: eventTypeLabels[filters.eventType as EventType],
      clear: () => onChange({ ...filters, eventType: "" }),
    });
  }
  if (filters.guestCount) {
    chips.push({
      key: "guestCount",
      label: `${filters.guestCount}+ convidados`,
      clear: () => onChange({ ...filters, guestCount: null }),
    });
  }
  if (filters.maxPrice) {
    chips.push({
      key: "maxPrice",
      label: `Até ${filters.maxPrice.toLocaleString("pt-BR")}`,
      clear: () => onChange({ ...filters, maxPrice: null }),
    });
  }
  filters.amenityIds.forEach((id) => {
    const label = amenities.find((a) => a.id === id)?.label ?? id;
    chips.push({
      key: `amenity-${id}`,
      label,
      clear: () =>
        onChange({ ...filters, amenityIds: filters.amenityIds.filter((a) => a !== id) }),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.clear}
          className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary/40"
        >
          {chip.label}
          <X className="h-3 w-3 text-gray-medium" aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(emptyFilters)}
        className="text-xs font-medium text-primary underline underline-offset-2"
      >
        Limpar todos
      </button>
    </div>
  );
}

function VenueGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-border">
          <div className="aspect-[16/10] w-full bg-gray-light" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 rounded bg-gray-light" />
            <div className="h-3 w-1/2 rounded bg-gray-light" />
            <div className="h-3 w-1/3 rounded bg-gray-light" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LocaisPageClient() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<VenueFilters>(() => {
    const guestsParam = searchParams.get("convidados");
    return {
      ...emptyFilters,
      location: searchParams.get("local") ?? "",
      category: (searchParams.get("categoria") as VenueFilters["category"]) ?? "",
      eventType: (searchParams.get("evento") as VenueFilters["eventType"]) ?? "",
      guestCount: guestsParam ? Number(guestsParam) : null,
    };
  });
  const [sort, setSort] = React.useState<SortOption>("recomendados");

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    track("filters_applied", { ...filters });
  }, [filters]);

  const filtered = React.useMemo(
    () => sortVenues(applyFilters(venues, filters), sort),
    [filters, sort]
  );

  const summary = buildSummary(filters, filtered.length);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Locais" }]} />
      <DemoDataBanner />

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            {loading ? "Buscando locais…" : summary}
          </h1>
          {!loading && (
            <p className="mt-1 text-sm text-gray-medium">
              Ajuste os filtros para refinar o resultado.
            </p>
          )}
        </div>
        <div className="w-full sm:w-56">
          <Select
            icon={<ArrowUpDown className="h-4 w-4" aria-hidden />}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Ordenar locais"
          >
            <option value="recomendados">Mais recomendados</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-capacidade">Maior capacidade</option>
            <option value="recentes">Mais recentes</option>
          </Select>
        </div>
      </div>

      {!loading && <ActiveFilterChips filters={filters} onChange={setFilters} />}

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div>
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        <div>
          {loading ? (
            <VenueGridSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState onAction={() => setFilters(emptyFilters)} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

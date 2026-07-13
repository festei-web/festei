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
import {
  applyFilters,
  sortVenues,
  emptyFilters,
  type VenueFilters,
  type SortOption,
} from "@/lib/filters";
import { ArrowUpDown } from "lucide-react";

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
  const [filters, setFilters] = React.useState<VenueFilters>(() => ({
    ...emptyFilters,
    location: searchParams.get("local") ?? "",
    category: (searchParams.get("categoria") as VenueFilters["category"]) ?? "",
  }));
  const [sort, setSort] = React.useState<SortOption>("recomendados");

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = React.useMemo(
    () => sortVenues(applyFilters(venues, filters), sort),
    [filters, sort]
  );

  const summary = filters.location
    ? `Locais em ${filters.location}`
    : "Todos os locais no Rio de Janeiro";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Locais" }]} />
      <DemoDataBanner />

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">{summary}</h1>
          <p className="mt-1 text-sm text-gray-medium">
            {loading ? "Buscando locais…" : `${filtered.length} locais encontrados`}
          </p>
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

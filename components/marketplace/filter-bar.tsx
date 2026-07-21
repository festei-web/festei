"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterFields } from "./filter-fields";
import type { VenueFilters } from "@/lib/filters";
import { emptyFilters } from "@/lib/filters";

export function FilterBar({
  filters,
  onChange,
}: {
  filters: VenueFilters;
  onChange: (filters: VenueFilters) => void;
}) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden rounded-2xl border border-border bg-white p-5 md:block">
        <FilterFields filters={filters} onChange={onChange} />
      </div>

      {/* Mobile trigger + drawer */}
      <MobileFilterDrawer filters={filters} onChange={onChange} />
    </>
  );
}

function MobileFilterDrawer({
  filters,
  onChange,
}: {
  filters: VenueFilters;
  onChange: (filters: VenueFilters) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(filters);

  const openDrawer = () => {
    setDraft(filters);
    setOpen(true);
  };

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const activeCount =
    (filters.neighborhoodSlug ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.eventType ? 1 : 0) +
    (filters.guestCount ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    filters.amenityIds.length;

  return (
    <div className="md:hidden">
      <Button variant="secondary" onClick={openDrawer} className="w-full">
        <SlidersHorizontal className="h-4 w-4" aria-hidden />
        Filtros {activeCount > 0 && `(${activeCount})`}
      </Button>

      {open && (
        <div className="fixed inset-0 z-[500] flex items-end" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 pb-28">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Filtros</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar filtros"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-light"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterFields filters={draft} onChange={setDraft} />

            <div className="fixed inset-x-0 bottom-0 flex gap-3 border-t border-border bg-white p-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setDraft(emptyFilters);
                  onChange(emptyFilters);
                }}
              >
                Limpar
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  onChange(draft);
                  setOpen(false);
                }}
              >
                Aplicar filtros
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

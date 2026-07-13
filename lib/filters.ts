import type { Venue, VenueCategory } from "@/types";

// Filtros do MVP — consistentes com a lista fechada do PRD (Cap. 6, RF-036).
export interface VenueFilters {
  location: string;
  category: VenueCategory | "";
  minCapacity: number | null;
  maxPrice: number | null;
  amenityIds: string[];
}

export const emptyFilters: VenueFilters = {
  location: "",
  category: "",
  minCapacity: null,
  maxPrice: null,
  amenityIds: [],
};

export function applyFilters(venues: Venue[], filters: VenueFilters): Venue[] {
  return venues.filter((venue) => {
    if (
      filters.location &&
      !`${venue.neighborhood} ${venue.city}`
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (filters.category && venue.category !== filters.category) return false;
    if (filters.minCapacity && venue.capacityMax < filters.minCapacity) return false;
    if (filters.maxPrice && venue.startingPrice > filters.maxPrice) return false;
    if (
      filters.amenityIds.length > 0 &&
      !filters.amenityIds.every((id) => venue.amenityIds.includes(id))
    ) {
      return false;
    }
    return true;
  });
}

export type SortOption = "recomendados" | "menor-preco" | "maior-capacidade" | "recentes";

export function sortVenues(venues: Venue[], sort: SortOption): Venue[] {
  const copy = [...venues];
  switch (sort) {
    case "menor-preco":
      return copy.sort((a, b) => a.startingPrice - b.startingPrice);
    case "maior-capacidade":
      return copy.sort((a, b) => b.capacityMax - a.capacityMax);
    case "recentes":
      return copy.sort((a, b) => Number(b.id) - Number(a.id));
    case "recomendados":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

import type { EventType, Venue, VenueCategory } from "@/types";
import { getNeighborhoodByLabel } from "@/data/rio-neighborhoods";

// Filtros do MVP — consistentes com a lista fechada do PRD (Cap. 6, RF-036).
export interface VenueFilters {
  // Slug de um bairro da lista oficial (data/rio-neighborhoods.ts), ou ""
  // para "qualquer bairro". Nunca texto livre — ver NeighborhoodCombobox.
  neighborhoodSlug: string;
  category: VenueCategory | "";
  eventType: EventType | "";
  guestCount: number | null;
  maxPrice: number | null;
  amenityIds: string[];
}

export const emptyFilters: VenueFilters = {
  neighborhoodSlug: "",
  category: "",
  eventType: "",
  guestCount: null,
  maxPrice: null,
  amenityIds: [],
};

export function applyFilters(venues: Venue[], filters: VenueFilters): Venue[] {
  return venues.filter((venue) => {
    if (filters.neighborhoodSlug) {
      const venueSlug = getNeighborhoodByLabel(venue.neighborhood)?.slug;
      if (venueSlug !== filters.neighborhoodSlug) return false;
    }
    if (filters.category && venue.category !== filters.category) return false;
    if (filters.eventType && !venue.recommendedEvents.includes(filters.eventType)) return false;
    // Quantidade de convidados: o local precisa comportar o grupo informado.
    if (filters.guestCount && venue.capacityMax < filters.guestCount) return false;
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

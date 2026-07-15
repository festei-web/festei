export type EventType =
  | "aniversario"
  | "churrasco"
  | "festa-infantil"
  | "cha-revelacao"
  | "noivado"
  | "confraternizacao";

export type VenueCategory =
  | "casa"
  | "casa-piscina"
  | "salao"
  | "sitio"
  | "chacara"
  | "rooftop"
  | "espaco-gourmet";

export interface Amenity {
  id: string;
  label: string;
  icon: string; // lucide icon name, resolved via icon map
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  neighborhood: string;
  city: string;
  category: VenueCategory;
  recommendedEvents: EventType[];
  capacityMin: number;
  capacityMax: number;
  startingPrice: number;
  amenityIds: string[];
  rules: string[];
  images: string[];
  featured: boolean;
  // Selo "Verificado" — independente de featured. Ver Design System Cap. 9
  // para o que a verificação cobre (e não cobre).
  verified: boolean;
  // Indicador visual demonstrativo — nunca disponibilidade real (Design System Cap. 8)
  demoAvailability: "disponivel" | "poucas-datas" | "sob-consulta";
}

export interface Category {
  id: VenueCategory;
  label: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  group: "buscando" | "proprietarios";
}

export type ContactChannel = "apenas_texto" | "aceita_ligacao";

export type EventType =
  | "aniversario"
  | "churrasco"
  | "festa-infantil"
  | "cha-revelacao"
  | "noivado"
  | "confraternizacao"
  | "casamento"
  | "festa-15-anos";

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

/**
 * Localização pública aproximada de um local — a única informação
 * geográfica que pode chegar ao navegador do visitante. Gerada a partir
 * do centro do bairro com um deslocamento determinístico (ver
 * lib/geo.ts#derivePublicCoordinate), nunca a partir do endereço real.
 */
export interface VenuePublicLocation {
  latitude: number;
  longitude: number;
  approxRadiusMeters: number;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  neighborhood: string;
  city: string;
  state: string;
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
  // Único dado geográfico seguro para expor no frontend — ver VenuePublicLocation.
  publicLocation: VenuePublicLocation;
  /**
   * Campos preparados para um backend real com endereço exato por local
   * (mapa aproximado — item 4 do prompt de melhorias). Nesta fase de dados
   * demonstrativos NÃO existe endereço real a proteger, então estes campos
   * nunca são preenchidos em data/venues.ts — não afirme proteção de
   * backend que ainda não existe. Quando um cadastro real existir, apenas
   * o servidor deve ler/gravar estes campos; nenhum componente de cliente
   * deve recebê-los (a página de detalhes já só repassa `publicLocation`
   * para o mapa, ver app/locais/[slug]/page.tsx).
   */
  realLatitude?: number;
  realLongitude?: number;
  fullAddress?: string;
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

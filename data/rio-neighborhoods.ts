/**
 * Lista oficial e centralizada de bairros do Rio de Janeiro aceitos pela
 * Festei (prompt de melhorias: modernizar o campo "Região" da busca).
 *
 * Fonte única — nenhum outro arquivo deve declarar esta lista de novo.
 * Usada por:
 * - NeighborhoodCombobox (frontend, autocomplete controlado);
 * - lib/filters.ts (filtro de locais por bairro);
 * - schemas/lead.ts (validação Zod, cliente e servidor);
 * - data/venues.ts (locais demonstrativos referenciam estes mesmos slugs).
 *
 * Para adicionar um novo bairro no futuro: acrescente um objeto dentro da
 * zona correspondente abaixo. Nada mais precisa ser tocado — todo o resto
 * (validação, combobox, filtro) deriva desta lista automaticamente.
 */

export interface RioNeighborhood {
  label: string;
  slug: string;
  zone: string;
}

export interface RioNeighborhoodZone {
  zone: string;
  neighborhoods: RioNeighborhood[];
}

export const rioNeighborhoods: RioNeighborhoodZone[] = [
  {
    zone: "Zona Sul",
    neighborhoods: [
      { label: "Botafogo", slug: "botafogo", zone: "Zona Sul" },
      { label: "Catete", slug: "catete", zone: "Zona Sul" },
      { label: "Copacabana", slug: "copacabana", zone: "Zona Sul" },
      { label: "Flamengo", slug: "flamengo", zone: "Zona Sul" },
      { label: "Gávea", slug: "gavea", zone: "Zona Sul" },
      { label: "Glória", slug: "gloria", zone: "Zona Sul" },
      { label: "Humaitá", slug: "humaita", zone: "Zona Sul" },
      { label: "Ipanema", slug: "ipanema", zone: "Zona Sul" },
      { label: "Jardim Botânico", slug: "jardim-botanico", zone: "Zona Sul" },
      { label: "Lagoa", slug: "lagoa", zone: "Zona Sul" },
      { label: "Laranjeiras", slug: "laranjeiras", zone: "Zona Sul" },
      { label: "Leblon", slug: "leblon", zone: "Zona Sul" },
      { label: "Leme", slug: "leme", zone: "Zona Sul" },
      { label: "São Conrado", slug: "sao-conrado", zone: "Zona Sul" },
      { label: "Urca", slug: "urca", zone: "Zona Sul" },
    ],
  },
  {
    zone: "Zona Norte",
    neighborhoods: [
      { label: "Andaraí", slug: "andarai", zone: "Zona Norte" },
      { label: "Grajaú", slug: "grajau", zone: "Zona Norte" },
      { label: "Maracanã", slug: "maracana", zone: "Zona Norte" },
      { label: "Méier", slug: "meier", zone: "Zona Norte" },
      { label: "Tijuca", slug: "tijuca", zone: "Zona Norte" },
      { label: "Vila Isabel", slug: "vila-isabel", zone: "Zona Norte" },
    ],
  },
  {
    zone: "Zona Oeste",
    neighborhoods: [
      { label: "Barra da Tijuca", slug: "barra-da-tijuca", zone: "Zona Oeste" },
      { label: "Campo Grande", slug: "campo-grande", zone: "Zona Oeste" },
      { label: "Freguesia", slug: "freguesia", zone: "Zona Oeste" },
      { label: "Guaratiba", slug: "guaratiba", zone: "Zona Oeste" },
      { label: "Jacarepaguá", slug: "jacarepagua", zone: "Zona Oeste" },
      { label: "Recreio dos Bandeirantes", slug: "recreio-dos-bandeirantes", zone: "Zona Oeste" },
      { label: "Santa Cruz", slug: "santa-cruz", zone: "Zona Oeste" },
      { label: "Taquara", slug: "taquara", zone: "Zona Oeste" },
      { label: "Vargem Grande", slug: "vargem-grande", zone: "Zona Oeste" },
      { label: "Vargem Pequena", slug: "vargem-pequena", zone: "Zona Oeste" },
    ],
  },
  {
    zone: "Centro",
    neighborhoods: [
      { label: "Centro", slug: "centro", zone: "Centro" },
      { label: "Lapa", slug: "lapa", zone: "Centro" },
      { label: "Santa Teresa", slug: "santa-teresa", zone: "Centro" },
    ],
  },
];

/** Lista achatada — gerada a partir de `rioNeighborhoods`, nunca editada à mão. */
export const allNeighborhoods: RioNeighborhood[] = rioNeighborhoods.flatMap(
  (z) => z.neighborhoods
);

const slugSet: ReadonlySet<string> = new Set(allNeighborhoods.map((n) => n.slug));

/** Usado por Zod (cliente e servidor) e por qualquer outra validação. */
export function isValidNeighborhoodSlug(value: string): boolean {
  return slugSet.has(value);
}

export function getNeighborhoodBySlug(slug: string): RioNeighborhood | undefined {
  return allNeighborhoods.find((n) => n.slug === slug);
}

export function getNeighborhoodByLabel(label: string): RioNeighborhood | undefined {
  const normalized = label.trim().toLowerCase();
  return allNeighborhoods.find((n) => n.label.toLowerCase() === normalized);
}

/** Tupla de slugs válidos — usada diretamente em `z.enum(...)`. */
export const neighborhoodSlugValues = allNeighborhoods.map((n) => n.slug) as [
  string,
  ...string[],
];

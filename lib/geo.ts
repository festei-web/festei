/**
 * Geolocalização pública aproximada para as páginas de local (mapa
 * aproximado — prompt de melhorias sobre localização).
 *
 * Nada aqui lida com endereço ou coordenada real de nenhum imóvel — este
 * arquivo só sabe transformar "o centro de um bairro" (informação
 * geográfica pública, não específica de nenhuma propriedade) em uma
 * coordenada pública deslocada, estável e sem precisão de endereço.
 *
 * Em um backend real, a mesma função `derivePublicCoordinate` deve rodar
 * no servidor a partir da coordenada real e privada do imóvel (nunca no
 * navegador), e o resultado deve ser persistido — não recalculado a cada
 * carregamento de página. Nesta fase de dados demonstrativos
 * (data/venues.ts), não existe coordenada real: o "centro" usado como
 * entrada já é a única informação pública disponível (o bairro).
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/** Centros aproximados de bairros do Rio de Janeiro — informação geográfica
 * pública (nível de bairro), não a localização de nenhum imóvel específico. */
export const NEIGHBORHOOD_CENTERS: Record<string, LatLng> = {
  "Recreio dos Bandeirantes": { lat: -23.018, lng: -43.464 },
  Jacarepaguá: { lat: -22.9631, lng: -43.3644 },
  "Vargem Grande": { lat: -22.974, lng: -43.539 },
  Tijuca: { lat: -22.9257, lng: -43.2302 },
  Botafogo: { lat: -22.9519, lng: -43.1823 },
  Copacabana: { lat: -22.9711, lng: -43.1822 },
  "Vila Isabel": { lat: -22.9186, lng: -43.2461 },
  Guaratiba: { lat: -23.0602, lng: -43.5951 },
  "Barra da Tijuca": { lat: -23.0045, lng: -43.3651 },
  Méier: { lat: -22.9013, lng: -43.2799 },
  "Campo Grande": { lat: -22.9028, lng: -43.5615 },
  Laranjeiras: { lat: -22.9364, lng: -43.1857 },
};

export type UrbanDensity = "urbano-denso" | "urbano" | "suburbano" | "rural";

/**
 * Raio (em metros) do círculo de área aproximada, por densidade da região.
 * Regiões urbanas densas usam um raio menor; regiões rurais, chácaras e
 * sítios usam um raio maior (prompt de melhorias, item 3).
 */
export function approxRadiusForDensity(density: UrbanDensity): number {
  switch (density) {
    case "urbano-denso":
      return 550;
    case "urbano":
      return 900;
    case "suburbano":
      return 1200;
    case "rural":
      return 1500;
  }
}

// Hash determinístico de string -> inteiro 32 bits (FNV-1a). Não é
// criptográfico — serve só para gerar uma semente estável a partir do
// slug/id do local, garantindo que a coordenada pública nunca mude entre
// carregamentos (prompt de melhorias, item 5: "coordenada pública
// persistente").
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// PRNG determinístico (mulberry32) semeado pelo hash acima.
function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Desloca uma coordenada-base em uma distância/ângulo determinísticos
 * (derivados de `seed`), dentro de [minRadiusMeters, maxRadiusMeters].
 *
 * Resultado arredondado a 5 casas decimais (~1,1 m) — suficiente para
 * contexto público, sem sugerir uma precisão de endereço que não existe.
 */
export function derivePublicCoordinate({
  center,
  seed,
  minRadiusMeters,
  maxRadiusMeters,
}: {
  center: LatLng;
  seed: string;
  minRadiusMeters: number;
  maxRadiusMeters: number;
}): LatLng {
  const random = mulberry32(hashSeed(seed));
  const angle = random() * Math.PI * 2;
  const distance = minRadiusMeters + random() * (maxRadiusMeters - minRadiusMeters);

  const earthRadiusMeters = 6371000;
  const latRad = (center.lat * Math.PI) / 180;
  const deltaLat = (distance * Math.cos(angle)) / earthRadiusMeters;
  const deltaLng = (distance * Math.sin(angle)) / (earthRadiusMeters * Math.cos(latRad));

  const lat = center.lat + (deltaLat * 180) / Math.PI;
  const lng = center.lng + (deltaLng * 180) / Math.PI;

  return {
    lat: Math.round(lat * 1e5) / 1e5,
    lng: Math.round(lng * 1e5) / 1e5,
  };
}

/**
 * Gera o `publicLocation` completo de um local a partir do bairro e da
 * densidade da região. Usado hoje em data/venues.ts (dados demonstrativos);
 * um backend real chamaria a mesma lógica a partir da coordenada real, no
 * servidor, no momento do cadastro do local.
 */
export function buildPublicLocation({
  neighborhood,
  seed,
  density,
}: {
  neighborhood: string;
  seed: string;
  density: UrbanDensity;
}) {
  const center = NEIGHBORHOOD_CENTERS[neighborhood];
  if (!center) {
    throw new Error(`Centro do bairro "${neighborhood}" não cadastrado em NEIGHBORHOOD_CENTERS.`);
  }

  const approxRadiusMeters = approxRadiusForDensity(density);
  // O deslocamento fica bem menor que o raio exibido, para que o círculo
  // desenhado no mapa cubra com folga o ponto usado como referência.
  const { lat, lng } = derivePublicCoordinate({
    center,
    seed,
    minRadiusMeters: approxRadiusMeters * 0.15,
    maxRadiusMeters: approxRadiusMeters * 0.55,
  });

  return { latitude: lat, longitude: lng, approxRadiusMeters };
}

/** Provedor de mapa: OpenStreetMap (tiles públicos, sem chave de API).
 * Ver README para orientação sobre limites de uso em produção. */
export const MAP_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';
export const MAP_TILE_SUBDOMAINS = ["a", "b", "c"];

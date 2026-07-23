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

/**
 * Estado de uma regra do local. Cada campo de `ListingRules` usa um destes
 * quatro valores — nunca um booleano — para poder expressar também
 * "permitido com restrições" e "não informado" (Regras do Local, seção
 * "Estados"). Também é a base da futura busca facetada (ex.: "aceita
 * animais"): `permitido` e `restrito` contam como atendendo ao filtro,
 * `proibido` e `nao_informado` não.
 */
export type RuleStatus = "permitido" | "proibido" | "restrito" | "nao_informado";

/**
 * Um campo individual de regra. `detail` é a informação objetiva e curta
 * (ex.: "Até 22h"); `description` é o texto opcional mais longo. Nenhum dos
 * dois deve ser inventado quando o proprietário não informou o dado — nesse
 * caso o campo usa apenas `status: "nao_informado"` e fica sem `detail`.
 */
export interface RuleField {
  status: RuleStatus;
  detail?: string;
  description?: string;
}

export interface OperatingHoursRules {
  allowedHours?: RuleField;
  maxEndTime?: RuleField;
  setupTime?: RuleField;
  teardownTime?: RuleField;
  extraHours?: RuleField;
}

export interface CapacityRules {
  maxGuests?: RuleField;
  minGuests?: RuleField;
  seated?: RuleField;
  standing?: RuleField;
}

export interface MusicRules {
  musicAllowed?: RuleField;
  dj?: RuleField;
  liveBand?: RuleField;
  volumeLimit?: RuleField;
  externalSoundSystem?: RuleField;
}

export interface DecorationRules {
  decorationAllowed?: RuleField;
  tape?: RuleField;
  nails?: RuleField;
  candles?: RuleField;
  confetti?: RuleField;
  smokeMachine?: RuleField;
  fireworks?: RuleField;
}

export interface FoodRules {
  externalCatering?: RuleField;
  kitchenAvailable?: RuleField;
  externalDrinks?: RuleField;
  barbecue?: RuleField;
  foodTruck?: RuleField;
}

export interface ChildrenRules {
  allowed?: RuleField;
  restrictions?: RuleField;
  supervisionRequired?: RuleField;
}

export interface PetsRules {
  allowed?: RuleField;
  smallOnly?: RuleField;
}

export interface SuppliersRules {
  ownSuppliersAllowed?: RuleField;
  mandatoryList?: RuleField;
  exclusiveSupplier?: RuleField;
  setupAccess?: RuleField;
}

export interface CleaningRules {
  included?: RuleField;
  extraFee?: RuleField;
  trashRemoval?: RuleField;
  teardownRequired?: RuleField;
}

export interface DepositRules {
  required?: RuleField;
}

export interface SecurityRules {
  includedSecurity?: RuleField;
  mandatorySecurity?: RuleField;
  fireMarshal?: RuleField;
  emergencyExit?: RuleField;
}

export interface ParkingRules {
  spots?: RuleField;
  valet?: RuleField;
  thirdPartyParking?: RuleField;
}

export interface AccessibilityRules {
  wheelchairAccess?: RuleField;
  accessibleBathroom?: RuleField;
  elevator?: RuleField;
  ramps?: RuleField;
}

export interface CondominiumRules {
  quietHours?: RuleField;
  vehicleLimit?: RuleField;
  circulationRestrictions?: RuleField;
  guestRegistration?: RuleField;
}

/**
 * Conjunto completo de regras de um local. Estrutura pensada para, no
 * futuro, ser editada pelo proprietário em seu painel — cada categoria vira
 * uma seção do formulário e cada `RuleField` um campo com status +
 * detalhe + descrição (ver comentário em `data/venues.ts`). Também é a
 * base prevista para filtros de busca (ex.: `pets.allowed === "permitido"`),
 * ainda não implementados.
 */
export interface ListingRules {
  operatingHours?: OperatingHoursRules;
  capacity?: CapacityRules;
  music?: MusicRules;
  decoration?: DecorationRules;
  food?: FoodRules;
  children?: ChildrenRules;
  pets?: PetsRules;
  suppliers?: SuppliersRules;
  cleaning?: CleaningRules;
  deposit?: DepositRules;
  security?: SecurityRules;
  parking?: ParkingRules;
  accessibility?: AccessibilityRules;
  condominium?: CondominiumRules;
  /** Campo livre para observações importantes que não caibam nas categorias acima. */
  additionalRules?: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string; // lucide icon name, resolved via icon map
}

/**
 * Estado de um item da seção "O que este local oferece". Diferente das
 * comodidades simples (`Amenity`/`amenityIds`, uma lista plana), aqui cada
 * item também pode estar disponível só mediante contratação separada —
 * por isso quatro estados em vez de um booleano "tem/não tem".
 */
export type FeatureStatus = "included" | "optional" | "unavailable" | "unknown";

export type FeatureCategory =
  | "estrutura"
  | "conforto"
  | "tecnologia"
  | "logistica"
  | "servicos"
  | "alimentacao";

/**
 * Um item de "O que este local oferece". Estrutura pensada para, no
 * futuro, virar um formulário editável no painel do proprietário — cada
 * item é uma linha configurável (nome + categoria + status + descrição),
 * nunca um texto fixo no código (ver comentário em `data/venues.ts`).
 * `id` só precisa ser único dentro do array `features` do próprio local.
 */
export interface ListingFeature {
  id: string;
  name: string;
  category: FeatureCategory;
  status: FeatureStatus;
  description?: string;
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
  rules: ListingRules;
  features: ListingFeature[];
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

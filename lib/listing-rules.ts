import {
  Clock,
  Users,
  Music2,
  Sparkles,
  UtensilsCrossed,
  Baby,
  PawPrint,
  Truck,
  Trash2,
  Wallet,
  ShieldAlert,
  Car,
  Accessibility,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MinusCircle,
  type LucideIcon,
} from "lucide-react";
import type { ListingRules, RuleField, RuleStatus } from "@/types";

/**
 * Configuração central da seção "Regras do Local". Nunca contém dados de um
 * anúncio específico — só rótulos estruturais (nome do campo, ícone da
 * categoria), o mesmo papel que `data/amenities.ts` cumpre para comodidades.
 * Os valores de cada regra vêm sempre de `venue.rules` (ver data/venues.ts).
 */

export const RULE_STATUS_CONFIG: Record<
  RuleStatus,
  { label: string; icon: LucideIcon; badgeVariant: "success" | "error" | "warning" | "neutral" }
> = {
  permitido: { label: "Permitido", icon: CheckCircle2, badgeVariant: "success" },
  proibido: { label: "Não permitido", icon: XCircle, badgeVariant: "error" },
  restrito: { label: "Permitido com restrições", icon: AlertTriangle, badgeVariant: "warning" },
  nao_informado: { label: "Não informado", icon: MinusCircle, badgeVariant: "neutral" },
};

export type RuleCategoryKey = Exclude<keyof ListingRules, "additionalRules">;

export interface RuleCategoryConfig {
  key: RuleCategoryKey;
  label: string;
  icon: LucideIcon;
  /** Exibida imediatamente; as demais entram sob "Ver todas as regras". */
  priority: boolean;
  fields: { key: string; label: string }[];
}

export const RULE_CATEGORIES: RuleCategoryConfig[] = [
  {
    key: "operatingHours",
    label: "Horário",
    icon: Clock,
    priority: true,
    fields: [
      { key: "allowedHours", label: "Horário permitido" },
      { key: "maxEndTime", label: "Horário máximo" },
      { key: "setupTime", label: "Horário para montagem" },
      { key: "teardownTime", label: "Horário para desmontagem" },
      { key: "extraHours", label: "Horas extras" },
    ],
  },
  {
    key: "music",
    label: "Música e som",
    icon: Music2,
    priority: true,
    fields: [
      { key: "musicAllowed", label: "Música" },
      { key: "dj", label: "DJ" },
      { key: "liveBand", label: "Banda ao vivo" },
      { key: "volumeLimit", label: "Limite de volume" },
      { key: "externalSoundSystem", label: "Caixa de som externa" },
    ],
  },
  {
    key: "food",
    label: "Alimentação",
    icon: UtensilsCrossed,
    priority: true,
    fields: [
      { key: "externalCatering", label: "Buffet externo" },
      { key: "kitchenAvailable", label: "Cozinha disponível" },
      { key: "externalDrinks", label: "Bebidas externas" },
      { key: "barbecue", label: "Churrasqueira" },
      { key: "foodTruck", label: "Food truck" },
    ],
  },
  {
    key: "decoration",
    label: "Decoração",
    icon: Sparkles,
    priority: true,
    fields: [
      { key: "decorationAllowed", label: "Decoração" },
      { key: "tape", label: "Uso de fitas" },
      { key: "nails", label: "Uso de pregos" },
      { key: "candles", label: "Velas" },
      { key: "confetti", label: "Confetes" },
      { key: "smokeMachine", label: "Máquina de fumaça" },
      { key: "fireworks", label: "Fogos de artifício" },
    ],
  },
  {
    key: "children",
    label: "Crianças",
    icon: Baby,
    priority: true,
    fields: [
      { key: "allowed", label: "Crianças" },
      { key: "restrictions", label: "Restrições" },
      { key: "supervisionRequired", label: "Supervisão obrigatória" },
    ],
  },
  {
    key: "pets",
    label: "Animais",
    icon: PawPrint,
    priority: true,
    fields: [
      { key: "allowed", label: "Animais de estimação" },
      { key: "smallOnly", label: "Somente pequeno porte" },
    ],
  },
  {
    key: "deposit",
    label: "Caução",
    icon: Wallet,
    priority: true,
    fields: [{ key: "required", label: "Caução" }],
  },
  {
    key: "condominium",
    label: "Condomínio",
    icon: Building2,
    priority: true,
    fields: [
      { key: "quietHours", label: "Horário de silêncio" },
      { key: "vehicleLimit", label: "Limite de veículos" },
      { key: "circulationRestrictions", label: "Restrições de circulação" },
      { key: "guestRegistration", label: "Cadastro de convidados" },
    ],
  },
  {
    key: "capacity",
    label: "Capacidade",
    icon: Users,
    priority: false,
    fields: [
      { key: "maxGuests", label: "Capacidade máxima" },
      { key: "minGuests", label: "Mínimo de convidados" },
      { key: "seated", label: "Capacidade sentados" },
      { key: "standing", label: "Capacidade em pé" },
    ],
  },
  {
    key: "suppliers",
    label: "Fornecedores",
    icon: Truck,
    priority: false,
    fields: [
      { key: "ownSuppliersAllowed", label: "Fornecedor próprio" },
      { key: "mandatoryList", label: "Lista obrigatória" },
      { key: "exclusiveSupplier", label: "Fornecedor exclusivo" },
      { key: "setupAccess", label: "Acesso para montagem" },
    ],
  },
  {
    key: "cleaning",
    label: "Limpeza",
    icon: Trash2,
    priority: false,
    fields: [
      { key: "included", label: "Limpeza inclusa" },
      { key: "extraFee", label: "Taxa adicional" },
      { key: "trashRemoval", label: "Retirada de lixo" },
      { key: "teardownRequired", label: "Desmontagem obrigatória" },
    ],
  },
  {
    key: "security",
    label: "Segurança",
    icon: ShieldAlert,
    priority: false,
    fields: [
      { key: "includedSecurity", label: "Segurança inclusa" },
      { key: "mandatorySecurity", label: "Segurança obrigatória" },
      { key: "fireMarshal", label: "Brigadista obrigatório" },
      { key: "emergencyExit", label: "Saída de emergência" },
    ],
  },
  {
    key: "parking",
    label: "Estacionamento",
    icon: Car,
    priority: false,
    fields: [
      { key: "spots", label: "Vagas de estacionamento" },
      { key: "valet", label: "Valet" },
      { key: "thirdPartyParking", label: "Estacionamento terceirizado" },
    ],
  },
  {
    key: "accessibility",
    label: "Acessibilidade",
    icon: Accessibility,
    priority: false,
    fields: [
      { key: "wheelchairAccess", label: "Acesso para cadeirantes" },
      { key: "accessibleBathroom", label: "Banheiro acessível" },
      { key: "elevator", label: "Elevador" },
      { key: "ramps", label: "Rampas" },
    ],
  },
];

export const ADDITIONAL_RULES_ICON: LucideIcon = FileText;

export function getFilledFields(
  category: RuleCategoryConfig,
  data: Record<string, RuleField | undefined> | undefined
): { label: string; field: RuleField }[] {
  if (!data) return [];
  return category.fields
    .map(({ key, label }) => ({ label, field: data[key] }))
    .filter((entry): entry is { label: string; field: RuleField } => Boolean(entry.field));
}

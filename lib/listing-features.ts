import {
  CheckCircle2,
  PlusCircle,
  XCircle,
  MinusCircle,
  Building2,
  Thermometer,
  MonitorPlay,
  Truck,
  Users2,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { FeatureCategory, FeatureStatus } from "@/types";

/**
 * Configuração central de "O que este local oferece" — só rótulos
 * estruturais (nome/ícone de categoria e de estado), nunca dados de um
 * anúncio específico. Os itens em si vêm sempre de `venue.features` (ver
 * data/venues.ts), o mesmo papel que `lib/listing-rules.ts` cumpre para
 * Regras do Local.
 */

export const FEATURE_CATEGORY_ORDER: FeatureCategory[] = [
  "estrutura",
  "conforto",
  "tecnologia",
  "logistica",
  "servicos",
  "alimentacao",
];

export const FEATURE_CATEGORY_CONFIG: Record<FeatureCategory, { label: string; icon: LucideIcon }> = {
  estrutura: { label: "Estrutura", icon: Building2 },
  conforto: { label: "Conforto", icon: Thermometer },
  tecnologia: { label: "Tecnologia", icon: MonitorPlay },
  logistica: { label: "Logística", icon: Truck },
  servicos: { label: "Serviços", icon: Users2 },
  alimentacao: { label: "Alimentação", icon: UtensilsCrossed },
};

interface FeatureStatusConfig {
  label: string;
  icon: LucideIcon;
  /** Cor de fundo do "chip" de ícone ao lado de cada item da lista. */
  iconBg: string;
  iconColor: string;
  badgeVariant: "success" | "primary" | "error" | "neutral";
}

export const FEATURE_STATUS_CONFIG: Record<FeatureStatus, FeatureStatusConfig> = {
  included: {
    label: "Incluso",
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    badgeVariant: "success",
  },
  optional: {
    label: "Contratação adicional",
    icon: PlusCircle,
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
    badgeVariant: "primary",
  },
  unavailable: {
    label: "Não disponível",
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    badgeVariant: "error",
  },
  unknown: {
    label: "Não informado",
    icon: MinusCircle,
    iconBg: "bg-gray-light",
    iconColor: "text-gray-medium",
    badgeVariant: "neutral",
  },
};

export interface FeatureColumnConfig {
  status: FeatureStatus;
  title: string;
  subtitle: string;
}

/** As três colunas comparáveis descritas em "O que este local oferece". */
export const FEATURE_COLUMNS: FeatureColumnConfig[] = [
  { status: "included", title: "Incluso na locação", subtitle: "Já faz parte do valor anunciado" },
  { status: "optional", title: "Disponível mediante contratação", subtitle: "Serviços com custo adicional" },
  { status: "unavailable", title: "Não disponível neste local", subtitle: "Para evitar solicitações incompatíveis" },
];

/** Bloco extra, só exibido quando o local tem itens com status "unknown". */
export const FEATURE_UNKNOWN_COLUMN: FeatureColumnConfig = {
  status: "unknown",
  title: "Não informado",
  subtitle: "O proprietário ainda não especificou estes itens",
};

"use client";

import * as React from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FeatureCategory, ListingFeature } from "@/types";
import {
  FEATURE_CATEGORY_ORDER,
  FEATURE_CATEGORY_CONFIG,
  FEATURE_STATUS_CONFIG,
  FEATURE_COLUMNS,
  FEATURE_UNKNOWN_COLUMN,
  type FeatureColumnConfig,
} from "@/lib/listing-features";

const COLLAPSED_LIMIT = 6;

/**
 * Seção "O que este local oferece" — cada local recebe a sua própria
 * coleção de itens via `venue.features` (ver data/venues.ts). Nenhum item
 * é presumido: só aparece o que está de fato no cadastro do local.
 */
export function VenueFeaturesSection({ features }: { features: ListingFeature[] }) {
  const [expanded, setExpanded] = React.useState(false);

  if (features.length === 0) return null;

  const byStatus = {
    included: features.filter((f) => f.status === "included"),
    optional: features.filter((f) => f.status === "optional"),
    unavailable: features.filter((f) => f.status === "unavailable"),
    unknown: features.filter((f) => f.status === "unknown"),
  };

  const anyTruncated =
    FEATURE_COLUMNS.some((col) => byStatus[col.status].length > COLLAPSED_LIMIT) ||
    byStatus.unknown.length > COLLAPSED_LIMIT;

  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden />
        O que este local oferece
      </h2>
      <p className="mt-1.5 text-sm text-gray-medium">
        Confira o que já faz parte da locação, quais serviços podem ser contratados e quais itens não
        estão disponíveis neste local.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_COLUMNS.map((col) => (
          <FeatureColumn key={col.status} col={col} items={byStatus[col.status]} expanded={expanded} />
        ))}
      </div>

      {byStatus.unknown.length > 0 && (
        <div className="mt-4">
          <FeatureColumn col={FEATURE_UNKNOWN_COLUMN} items={byStatus.unknown} expanded={expanded} />
        </div>
      )}

      {anyTruncated && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-5 flex items-center gap-1.5 rounded-md text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {expanded ? "Ver menos itens" : "Ver todos os itens"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
            aria-hidden
          />
        </button>
      )}
    </section>
  );
}

function FeatureColumn({
  col,
  items,
  expanded,
}: {
  col: FeatureColumnConfig;
  items: ListingFeature[];
  expanded: boolean;
}) {
  const status = FEATURE_STATUS_CONFIG[col.status];
  const StatusIcon = status.icon;

  const orderedItems: ListingFeature[] = FEATURE_CATEGORY_ORDER.flatMap((category) =>
    items.filter((item) => item.category === category)
  );
  const visibleItems = expanded ? orderedItems : orderedItems.slice(0, COLLAPSED_LIMIT);
  const grouped = FEATURE_CATEGORY_ORDER.map((category) => ({
    category,
    items: visibleItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="rounded-xl border border-border bg-gray-light/40 p-5">
      <div className="flex items-center gap-2 font-semibold text-ink">
        <StatusIcon className={cn("h-[18px] w-[18px] shrink-0", status.iconColor)} aria-hidden />
        {col.title}
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <p className="text-xs text-gray-medium">{col.subtitle}</p>
        <Badge variant={status.badgeVariant} className="shrink-0">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </Badge>
      </div>

      <div className="mt-4 space-y-4">
        {grouped.map(({ category, items: categoryItems }) => (
          <FeatureCategoryGroup
            key={category}
            category={category}
            items={categoryItems}
            statusLabel={status.label}
            iconBg={status.iconBg}
            iconColor={status.iconColor}
            StatusIcon={StatusIcon}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCategoryGroup({
  category,
  items,
  statusLabel,
  iconBg,
  iconColor,
  StatusIcon,
}: {
  category: FeatureCategory;
  items: ListingFeature[];
  statusLabel: string;
  iconBg: string;
  iconColor: string;
  StatusIcon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  const categoryConfig = FEATURE_CATEGORY_CONFIG[category];
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-medium">
        {categoryConfig.label}
      </span>
      <ul className="mt-2 space-y-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2.5">
            <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", iconBg)}>
              <StatusIcon className={cn("h-3 w-3", iconColor)} aria-hidden />
            </span>
            <div className="min-w-0">
              <span className="text-sm text-ink">
                <span className="sr-only">{statusLabel}: </span>
                {item.name}
              </span>
              {item.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-gray-medium">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

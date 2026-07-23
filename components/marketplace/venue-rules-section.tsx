"use client";

import * as React from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ListingRules, RuleField } from "@/types";
import {
  RULE_CATEGORIES,
  RULE_STATUS_CONFIG,
  ADDITIONAL_RULES_ICON,
  getFilledFields,
  type RuleCategoryConfig,
} from "@/lib/listing-rules";

/**
 * Seção "Regras do Local" — cada local recebe as suas próprias regras via
 * `venue.rules` (ver data/venues.ts), nunca um texto fixo compartilhado
 * entre anúncios. Categorias sem nenhum campo preenchido simplesmente não
 * aparecem (não inventamos regras que o proprietário não informou).
 */
export function VenueRulesSection({ rules }: { rules: ListingRules }) {
  const [expanded, setExpanded] = React.useState(false);

  const filled = RULE_CATEGORIES.map((category) => ({
    category,
    fields: getFilledFields(
      category,
      rules[category.key] as Record<string, RuleField | undefined> | undefined
    ),
  })).filter((entry) => entry.fields.length > 0);

  const priorityCategories = filled.filter((entry) => entry.category.priority);
  const otherCategories = filled.filter((entry) => !entry.category.priority);
  const hasAdditional = Boolean(rules.additionalRules);

  if (filled.length === 0 && !hasAdditional) return null;

  const AdditionalIcon = ADDITIONAL_RULES_ICON;
  const hasMore = otherCategories.length > 0 || hasAdditional;

  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
        <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
        Regras do local
      </h2>
      <p className="mt-1.5 text-sm text-gray-medium">
        Conheça as principais regras e condições de utilização deste local antes de enviar sua solicitação.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {priorityCategories.map(({ category, fields }) => (
          <RuleCategoryCard key={category.key} category={category} fields={fields} />
        ))}
      </div>

      {hasMore && (
        <div
          id="venue-rules-more"
          className={cn(
            "grid overflow-hidden transition-all duration-200 ease-out",
            expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {otherCategories.map(({ category, fields }) => (
              <RuleCategoryCard key={category.key} category={category} fields={fields} />
            ))}
            {hasAdditional && (
              <div className="rounded-xl border border-border bg-gray-light/40 p-5 md:col-span-2">
                <div className="flex items-center gap-2 font-semibold text-ink">
                  <AdditionalIcon className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />
                  Outras regras
                </div>
                <p className="mt-2 text-sm text-gray-medium">{rules.additionalRules}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="venue-rules-more"
          className="mt-5 flex items-center gap-1.5 rounded-md text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {expanded ? "Ver menos regras" : "Ver todas as regras"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
            aria-hidden
          />
        </button>
      )}
    </section>
  );
}

function RuleCategoryCard({
  category,
  fields,
}: {
  category: RuleCategoryConfig;
  fields: { label: string; field: RuleField }[];
}) {
  const Icon = category.icon;
  return (
    <div className="rounded-xl border border-border bg-gray-light/40 p-5">
      <div className="flex items-center gap-2 font-semibold text-ink">
        <Icon className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />
        {category.label}
      </div>
      <ul className="mt-3 space-y-3">
        {fields.map(({ label, field }) => {
          const status = RULE_STATUS_CONFIG[field.status];
          const StatusIcon = status.icon;
          return (
            <li
              key={label}
              className="flex flex-col gap-1.5 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-3"
            >
              <span className="text-ink">{label}</span>
              <div className="sm:text-right">
                <Badge variant={status.badgeVariant} className="w-fit sm:ml-auto">
                  <StatusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>
                    {field.detail ?? status.label}
                    {field.detail && <span className="sr-only"> ({status.label})</span>}
                  </span>
                </Badge>
                {field.description && (
                  <p className="mt-1 text-xs leading-relaxed text-gray-medium sm:max-w-[220px]">
                    {field.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

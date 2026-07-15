"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Users, Heart } from "lucide-react";
import type { Venue } from "@/types";
import { formatPrice } from "@/data/constants";
import { SafeImage } from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "./verified-badge";
import { useFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

const availabilityLabel: Record<Venue["demoAvailability"], string> = {
  disponivel: "Datas disponíveis",
  "poucas-datas": "Poucas datas no mês",
  "sob-consulta": "Disponibilidade sob consulta",
};

const availabilityVariant: Record<Venue["demoAvailability"], "success" | "outline"> = {
  disponivel: "success",
  "poucas-datas": "outline",
  "sob-consulta": "outline",
};

export function VenueCard({ venue }: { venue: Venue }) {
  const { favorited, toggle } = useFavorite(venue.id);

  return (
    <Link
      href={`/locais/${venue.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-light shadow-[var(--shadow-sm)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-lg)]">
        <SafeImage
          src={venue.images[0]}
          alt={`Foto de ${venue.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {venue.verified ? <VerifiedBadge /> : <span />}

          <button
            type="button"
            aria-label={favorited ? "Remover dos favoritos" : "Favoritar local"}
            aria-pressed={favorited}
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-transform duration-150 hover:scale-110 active:scale-95"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors duration-150",
                favorited ? "fill-error text-error" : "text-ink"
              )}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-ink">{venue.name}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-medium">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {venue.neighborhood}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-medium">
          <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Até {venue.capacityMax} convidados
        </div>

        <div className="mt-0.5">
          <Badge variant={availabilityVariant[venue.demoAvailability]}>
            {availabilityLabel[venue.demoAvailability]}
          </Badge>
        </div>

        <div className="mt-2 flex items-baseline gap-1.5 border-t border-border pt-2.5">
          <span className="text-base font-semibold text-ink">
            {formatPrice(venue.startingPrice)}
          </span>
          <span className="text-xs text-gray-medium">a partir de</span>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { Heart, Share2 } from "lucide-react";
import { useFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function VenueActionButtons({ venueId }: { venueId: string }) {
  const { favorited, toggle } = useFavorite(venueId);

  return (
    <div className="flex shrink-0 gap-2">
      <button
        aria-label={favorited ? "Remover dos favoritos" : "Favoritar local"}
        aria-pressed={favorited}
        onClick={toggle}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all duration-150 hover:scale-105 hover:border-primary hover:text-primary active:scale-95"
      >
        <Heart
          className={cn("h-5 w-5 transition-colors", favorited && "fill-error text-error")}
          aria-hidden
        />
      </button>
      <button
        aria-label="Compartilhar local"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all duration-150 hover:scale-105 hover:border-primary hover:text-primary active:scale-95"
      >
        <Share2 className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

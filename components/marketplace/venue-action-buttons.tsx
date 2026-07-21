"use client";

import { Heart, Share2 } from "lucide-react";
import { useFavorite } from "@/lib/favorites";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function VenueActionButtons({
  venueId,
  venueName,
}: {
  venueId: string;
  venueName: string;
}) {
  const { favorited, toggle } = useFavorite(venueId);
  const { show } = useToast();

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: venueName, url });
      } catch {
        // Usuário cancelou o compartilhamento — não é um erro a reportar.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      show("Link copiado para a área de transferência.", "success");
    } catch {
      show("Não foi possível copiar o link. Copie a partir da barra de endereço.", "error");
    }
  }

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
        type="button"
        aria-label="Compartilhar local"
        onClick={share}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all duration-150 hover:scale-105 hover:border-primary hover:text-primary active:scale-95"
      >
        <Share2 className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

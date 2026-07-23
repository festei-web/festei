"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { WifiOff } from "lucide-react";
import type { VenuePublicLocation } from "@/types";

const VenueLocationMap = dynamic(
  () => import("./venue-location-map").then((m) => m.VenueLocationMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div
      className="h-72 animate-pulse rounded-2xl border border-border bg-gray-light sm:h-80"
      aria-hidden
    />
  );
}

/**
 * Carrega o mapa somente quando a seção se aproxima da viewport (prompt de
 * melhorias sobre localização, item 11), e trata os estados de carregamento,
 * erro e dado ausente (item 8) — o texto de bairro/cidade/estado, que fica
 * fora deste componente (ver venue-location-section.tsx), continua visível
 * em qualquer um desses estados.
 */
export function VenueLocationMapLoader({
  venueId,
  publicLocation,
  neighborhood,
  city,
  state,
}: {
  venueId: string;
  publicLocation?: VenuePublicLocation;
  neighborhood: string;
  city: string;
  state: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // Sempre começa em false (igual no server e no client) para nunca causar
  // hydration mismatch — a correção para navegadores sem IntersectionObserver
  // acontece depois, de forma assíncrona, dentro do efeito.
  const [nearViewport, setNearViewport] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = window.setTimeout(() => setNearViewport(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!publicLocation) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-gray-light/50 px-6 text-center">
        <p className="text-sm text-gray-medium">
          Localização aproximada ainda não informada.
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-gray-light/50 px-6 text-center">
        <WifiOff className="mb-1 h-5 w-5 text-gray-medium" aria-hidden />
        <p className="text-sm text-gray-medium">
          Não foi possível carregar o mapa neste momento.
        </p>
        <p className="text-sm font-medium text-ink">
          {neighborhood}, {city} — {state}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {nearViewport ? (
        <VenueLocationMap
          venueId={venueId}
          latitude={publicLocation.latitude}
          longitude={publicLocation.longitude}
          approxRadiusMeters={publicLocation.approxRadiusMeters}
          neighborhood={neighborhood}
          city={city}
          state={state}
          onError={() => setHasError(true)}
        />
      ) : (
        <MapSkeleton />
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import { latLng } from "leaflet";
import { ExternalLink } from "lucide-react";
import { track } from "@/lib/analytics";
import {
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_SUBDOMAINS,
  MAP_TILE_URL,
} from "@/lib/geo";

// Verde/roxo primário da marca (--color-primary em app/globals.css). Leaflet
// desenha o círculo via atributos SVG (stroke/fill), que não aceitam
// var(--...) — o hex precisa ficar em sincronia manual com o token.
const CIRCLE_COLOR = "#6d4aff";

/**
 * Mapa real (OpenStreetMap) com uma área circular aproximada — nunca um
 * marcador preciso sobre o imóvel (mapa aproximado — prompt de melhorias
 * sobre localização, item 3). Só recebe dados já públicos: latitude/
 * longitude/raio deslocados do endereço real, bairro, cidade e estado.
 */
export function VenueLocationMap({
  venueId,
  latitude,
  longitude,
  approxRadiusMeters,
  neighborhood,
  city,
  state,
  onError,
}: {
  venueId: string;
  latitude: number;
  longitude: number;
  approxRadiusMeters: number;
  neighborhood: string;
  city: string;
  state: string;
  onError: () => void;
}) {
  const [interactive, setInteractive] = React.useState(false);
  const center: [number, number] = [latitude, longitude];

  // Só reporta falha se nenhum tile chegou a carregar com sucesso e vários
  // falharam — evita marcar o mapa como quebrado por causa de 1-2 tiles de
  // borda (ex.: sobre o mar, em zooms baixos), o que é normal.
  const tileLoadCount = React.useRef(0);
  const tileErrorCount = React.useRef(0);
  const reportedError = React.useRef(false);

  const handleTileError = React.useCallback(() => {
    tileErrorCount.current += 1;
    if (
      !reportedError.current &&
      tileLoadCount.current === 0 &&
      tileErrorCount.current >= 4
    ) {
      reportedError.current = true;
      onError();
    }
  }, [onError]);

  const maxBounds = React.useMemo(
    () => latLng(latitude, longitude).toBounds(approxRadiusMeters * 6),
    [latitude, longitude, approxRadiusMeters]
  );

  const zoom = approxRadiusMeters <= 700 ? 15 : approxRadiusMeters <= 1100 ? 14 : 13;

  const externalMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  return (
    <div>
      <div
        className="relative h-72 overflow-hidden rounded-2xl border border-border sm:h-80"
        role="group"
        aria-label={`Mapa interativo mostrando a área aproximada de ${neighborhood}, ${city} — ${state}. O ponto exato do local não é exibido.`}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={12}
          maxZoom={17}
          maxBounds={maxBounds}
          maxBoundsViscosity={1}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          className="h-full w-full"
          keyboard
        >
          <TileLayer
            url={MAP_TILE_URL}
            subdomains={MAP_TILE_SUBDOMAINS}
            attribution={MAP_TILE_ATTRIBUTION}
            eventHandlers={{
              tileerror: handleTileError,
              tileload: () => {
                tileLoadCount.current += 1;
              },
            }}
          />
          <Circle
            center={center}
            radius={approxRadiusMeters}
            pathOptions={{
              color: CIRCLE_COLOR,
              weight: 2,
              fillColor: CIRCLE_COLOR,
              fillOpacity: 0.18,
            }}
          />
          <InteractionGate active={!interactive} onActivate={() => setInteractive(true)} />
        </MapContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs text-gray-medium">
          <span
            className="h-2.5 w-2.5 rounded-full border-2"
            style={{ borderColor: CIRCLE_COLOR, backgroundColor: `${CIRCLE_COLOR}2E` }}
            aria-hidden
          />
          Área aproximada
        </span>

        <a
          href={externalMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("venue_map_region_link_clicked", { venueId })}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-hover"
        >
          Ver região no mapa
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

/**
 * Evita que um único toque/arraste no mapa sequestre a rolagem da página
 * (prompt de melhorias, item 9). Some ao primeiro clique/toque, liberando
 * arrastar, roda do mouse e pinça de zoom a partir daí.
 */
function InteractionGate({
  active,
  onActivate,
}: {
  active: boolean;
  onActivate: () => void;
}) {
  const map = useMap();

  React.useEffect(() => {
    if (active) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    }
  }, [active, map]);

  if (!active) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ativar navegação no mapa"
      onClick={onActivate}
      onTouchStart={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className="absolute inset-0 z-[1000] flex cursor-pointer items-center justify-center bg-ink/0 transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
    >
      <span className="rounded-full bg-ink/75 px-4 py-2 text-center text-xs font-medium text-white shadow-md">
        Toque para interagir com o mapa
      </span>
    </div>
  );
}

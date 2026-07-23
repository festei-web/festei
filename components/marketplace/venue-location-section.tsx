import { MapPin } from "lucide-react";
import type { VenuePublicLocation } from "@/types";
import { VenueLocationMapLoader } from "./venue-location-map-loader";

/**
 * Seção "Onde fica" da página de detalhes do local — só recebe e repassa
 * dados públicos (bairro, cidade, estado, publicLocation). O componente de
 * mapa (client, dinâmico) nunca recebe endereço completo nem coordenada
 * real (mapa aproximado — prompt de melhorias sobre localização).
 */
export function VenueLocationSection({
  venueId,
  neighborhood,
  city,
  state,
  publicLocation,
}: {
  venueId: string;
  neighborhood: string;
  city: string;
  state: string;
  publicLocation?: VenuePublicLocation;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
        <MapPin className="h-5 w-5 text-primary" aria-hidden />
        Onde fica
      </h2>
      <p className="mt-2 text-sm font-medium text-ink">
        {neighborhood}, {city} — {state}
      </p>
      <p className="mt-1 text-sm text-gray-medium">
        A localização exibida no mapa é aproximada. O endereço completo será
        informado no momento adequado, conforme as regras da plataforma.
      </p>
      <div className="mt-4">
        <VenueLocationMapLoader
          venueId={venueId}
          publicLocation={publicLocation}
          neighborhood={neighborhood}
          city={city}
          state={state}
        />
      </div>
    </section>
  );
}

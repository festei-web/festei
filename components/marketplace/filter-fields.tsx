import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { categories } from "@/data/categories";
import { amenities } from "@/data/amenities";
import { resolveIcon } from "@/lib/icon-map";
import type { VenueFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";

// Comodidades de destaque no MVP (subconjunto do RF-036 do PRD).
const featuredAmenityIds = ["piscina", "churrasqueira", "estacionamento", "area-coberta", "cozinha"];

export function FilterFields({
  filters,
  onChange,
}: {
  filters: VenueFilters;
  onChange: (filters: VenueFilters) => void;
}) {
  const toggleAmenity = (id: string) => {
    const has = filters.amenityIds.includes(id);
    onChange({
      ...filters,
      amenityIds: has
        ? filters.amenityIds.filter((a) => a !== id)
        : [...filters.amenityIds, id],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Localização"
          placeholder="Bairro ou região"
          icon={<MapPin className="h-4 w-4" aria-hidden />}
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
        />
        <Select
          label="Tipo de local"
          value={filters.category}
          onChange={(e) =>
            onChange({ ...filters, category: e.target.value as VenueFilters["category"] })
          }
        >
          <option value="">Todos os tipos</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Capacidade mínima"
          value={filters.minCapacity ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              minCapacity: e.target.value ? Number(e.target.value) : null,
            })
          }
        >
          <option value="">Qualquer capacidade</option>
          <option value="20">A partir de 20 convidados</option>
          <option value="50">A partir de 50 convidados</option>
          <option value="100">A partir de 100 convidados</option>
          <option value="200">A partir de 200 convidados</option>
        </Select>
        <Select
          label="Faixa de preço máxima"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              maxPrice: e.target.value ? Number(e.target.value) : null,
            })
          }
        >
          <option value="">Qualquer preço</option>
          <option value="1200">Até R$ 1.200</option>
          <option value="2000">Até R$ 2.000</option>
          <option value="3000">Até R$ 3.000</option>
          <option value="5000">Até R$ 5.000</option>
        </Select>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-ink">Recursos</span>
        <div className="flex flex-wrap gap-2">
          {featuredAmenityIds.map((id) => {
            const amenity = amenities.find((a) => a.id === id);
            if (!amenity) return null;
            const Icon = resolveIcon(amenity.icon);
            const active = filters.amenityIds.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleAmenity(id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border bg-white text-ink hover:border-primary/40"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {amenity.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

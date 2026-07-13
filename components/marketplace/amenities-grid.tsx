import { getAmenityById } from "@/data/amenities";
import { resolveIcon } from "@/lib/icon-map";

export function AmenitiesGrid({ amenityIds }: { amenityIds: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {amenityIds.map((id) => {
        const amenity = getAmenityById(id);
        if (!amenity) return null;
        const Icon = resolveIcon(amenity.icon);
        return (
          <div key={id} className="flex items-center gap-2.5 text-sm text-ink">
            <Icon className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden />
            {amenity.label}
          </div>
        );
      })}
    </div>
  );
}

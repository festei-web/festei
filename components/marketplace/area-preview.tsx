import { MapPin, Navigation } from "lucide-react";

/**
 * Substitui o placeholder cinza "Mapa aproximado" (que parecia quebrado) por
 * uma apresentação visual da região — sem expor o endereço exato antes da
 * negociação (prompt de melhorias, item 18, opção 2).
 */
export function AreaPreview({
  neighborhood,
  city,
}: {
  neighborhood: string;
  city: string;
}) {
  return (
    <div className="relative flex h-56 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary-light/70 via-gray-light/60 to-primary-light/40">
      {/* Linhas decorativas sugerindo ruas, sem pretender ser um mapa real */}
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-[15%] top-0 h-full w-px bg-ink/10" />
        <div className="absolute left-[45%] top-0 h-full w-px bg-ink/10" />
        <div className="absolute left-[75%] top-0 h-full w-px bg-ink/10" />
        <div className="absolute top-[30%] left-0 h-px w-full bg-ink/10" />
        <div className="absolute top-[65%] left-0 h-px w-full bg-ink/10" />
      </div>

      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-md)]">
        <MapPin className="h-7 w-7" aria-hidden />
      </div>
      <p className="relative z-10 mt-3 text-base font-semibold text-ink">
        {neighborhood}
      </p>
      <p className="relative z-10 text-sm text-gray-medium">{city}</p>

      <span className="relative z-10 mt-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink/70">
        <Navigation className="h-3 w-3" aria-hidden />
        Região aproximada
      </span>
    </div>
  );
}

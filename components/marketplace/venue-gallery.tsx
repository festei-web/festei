"use client";

import * as React from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function VenueGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + images.length) % images.length);

  React.useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-2 md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2 md:rounded-2xl md:overflow-hidden md:h-[420px]">
        <button
          className="relative col-span-2 row-span-2"
          onClick={() => {
            setActive(0);
            setLightbox(true);
          }}
        >
          <SafeImage
            src={images[0]}
            alt={`${alt} — foto principal`}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={img}
            className="relative"
            onClick={() => {
              setActive(i + 1);
              setLightbox(true);
            }}
          >
            <SafeImage
              src={img}
              alt={`${alt} — foto ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96 md:hidden">
        <SafeImage
          src={images[active]}
          alt={`${alt} — foto ${active + 1} de ${images.length}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <button
          aria-label="Foto anterior"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Próxima foto"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-white">
          {active + 1} / {images.length}
        </span>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos em tela cheia"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Fechar galeria"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className={cn("relative h-[70vh] w-full max-w-4xl")}>
            <SafeImage
              src={images[active]}
              alt={`${alt} — foto ${active + 1} de ${images.length}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Próxima foto"
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}

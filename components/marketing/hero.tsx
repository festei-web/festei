import { SafeImage } from "@/components/ui/safe-image";
import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Foto de celebração real como pano de fundo, não um local vazio —
          decisão explícita para diferenciar da estética "imóvel" do Airbnb.
          Texto branco direto sobre a foto (referência enviada por Rafael);
          overlay escuro moderado + text-shadow garantem legibilidade sem
          esconder a foto atrás de um painel. */}
      <div className="absolute inset-0">
        <SafeImage
          src="/images/hero-celebration.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/70" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-xs font-medium text-ink/70 backdrop-blur">
          Aniversários, Churrascos, Casamentos e mais
        </span>

        <h1 className="max-w-3xl text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl md:text-[68px]">
          Encontre o local certo para a sua festa
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-lg">
          Compare casas, sítios, salões, chácaras e outros locais para a sua
          festa. Consulte estrutura, capacidade e valores em um só lugar.
        </p>

        <div className="mt-10 w-full max-w-3xl">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

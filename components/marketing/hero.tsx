import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Foto de celebração real como pano de fundo, não um local vazio —
          decisão explícita para diferenciar da estética "imóvel" do Airbnb. */}
      <div className="absolute inset-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1800&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-xs font-medium text-ink/70 backdrop-blur">
          Rio de Janeiro · aniversários, churrascos, casamentos e mais
        </span>

        <h1 className="max-w-3xl text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl md:text-[68px]">
          Onde a sua próxima celebração vai acontecer
        </h1>

        <p className="mt-6 max-w-xl text-base text-gray-medium sm:text-lg">
          Casas, sítios, salões e locais para festas em um só lugar.
          Encontre o cenário certo para o seu momento especial.
        </p>

        <div className="mt-10 w-full max-w-2xl">
          <SearchBar />
        </div>

        <Link
          href="/anunciar"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-primary"
        >
          Tem um local? Anuncie na Festei
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

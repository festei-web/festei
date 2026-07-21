import Image from "next/image";
import { Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Comunica visão de longo prazo (app futuro) sem prometer lançamento
 * próximo — propositalmente sem App Store/Google Play, download,
 * pré-cadastro, lista de espera ou datas. O foco de conversão do site
 * continua sendo a plataforma web (CtaSection, logo acima).
 */
export function AppFutureSection() {
  return (
    <section className="bg-gray-light py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2 md:gap-20 lg:px-10">
        <Reveal className="relative mx-auto flex justify-center">
          <div
            className="absolute inset-0 -z-10 flex items-center justify-center"
            aria-hidden
          >
            <div className="h-56 w-56 rounded-full bg-primary-light/60 blur-3xl sm:h-64 sm:w-64" />
          </div>

          <div className="relative w-56 rounded-[2.75rem] border border-border bg-white p-3 shadow-[var(--shadow-lg)] sm:w-64">
            <div
              className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-border"
              aria-hidden
            />
            <div className="flex aspect-[9/19] items-center justify-center rounded-[2rem] bg-gray-light">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <Image
                  src="/images/logo.png"
                  alt="Logo do aplicativo Festei"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="mx-auto max-w-lg text-center md:mx-0 md:text-left"
        >
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            O futuro da Festei também estará no seu bolso.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-medium sm:text-lg">
            Estamos desenvolvendo o aplicativo da Festei para tornar a busca,
            a reserva e a gestão dos seus eventos ainda mais simples.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-medium sm:text-lg">
            Quando chegar o momento, você poderá fazer tudo diretamente pelo
            celular, com a mesma segurança e praticidade da plataforma web.
          </p>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-gray-medium">
            <Smartphone className="h-3.5 w-3.5 text-primary" aria-hidden />
            Aplicativo em desenvolvimento
          </span>
        </Reveal>
      </div>
    </section>
  );
}

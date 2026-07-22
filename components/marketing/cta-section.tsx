import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-primary px-6 py-16 text-center text-white sm:px-12 md:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.16)_0%,transparent_60%)]"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
            Faça parte dos primeiros locais da Festei.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/80">
            Estamos começando pelo Rio de Janeiro, com um número pequeno de
            locais escolhidos a dedo. Envie as informações do seu espaço e
            participe dessa primeira fase.
          </p>
          <div className="relative mx-auto mt-9 flex max-w-md flex-col items-center gap-4">
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full bg-white shadow-[var(--shadow-lg)] hover:bg-white/90"
            >
              <Link href="/anunciar#formulario">Enviar meu local para análise</Link>
            </Button>
            <Link
              href="/locais"
              className="text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
            >
              Encontrar locais para festas
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

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
            Encontre o local certo — ou anuncie o seu
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/80">
            Seja você quem procura o lugar perfeito para uma festa ou tem um
            espaço para oferecer, a Festei ajuda a dar o próximo passo.
          </p>
          <div className="relative mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="flex-1 bg-white shadow-[var(--shadow-lg)] hover:bg-white/90"
            >
              <Link href="/locais">Encontrar local</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="flex-1 bg-white shadow-[var(--shadow-lg)] hover:bg-white/90"
            >
              <Link href="/anunciar">Anunciar meu local</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

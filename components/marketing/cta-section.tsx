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
            Seu próximo evento começa encontrando o local certo.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/80">
            Descubra ambientes preparados para receber momentos especiais.
          </p>
          <Button
            asChild
            size="xl"
            className="relative mt-9 bg-white text-primary shadow-[var(--shadow-lg)] hover:bg-white/90"
          >
            <Link href="/locais">Começar agora</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

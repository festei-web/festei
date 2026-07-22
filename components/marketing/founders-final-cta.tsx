import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FoundersFinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center text-white sm:px-12 md:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08)_0%,transparent_60%)]"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Os primeiros grandes projetos começam com pessoas que acreditam
            antes de todos.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/70">
            Hoje estamos formando os primeiros Parceiros Fundadores da
            Festei.
          </p>
          <div className="relative mx-auto mt-9 max-w-md">
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full bg-white shadow-[var(--shadow-lg)] hover:bg-white/90"
            >
              <Link href="#candidatura">Quero fazer parte dos 50 Parceiros Fundadores</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

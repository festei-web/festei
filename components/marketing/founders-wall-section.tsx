import { Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Enquanto não há Parceiros Fundadores reais, o mural mostra apenas
// placeholders numerados. Quando houver parceiros aprovados, cada slot
// passa a exibir foto, nome do espaço, cidade e número do fundador.
const PLACEHOLDER_COUNT = 10;

export function FoundersWallSection() {
  return (
    <section className="bg-gray-light/40 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Mural dos Fundadores
          </h2>
          <p className="mt-3 text-sm text-gray-medium">
            Aqui vão ficar os primeiros 50 espaços da Festei, na ordem em
            que forem aprovados.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-white p-4 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-light text-gray-medium">
                <Building2 className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-xs font-semibold text-ink">
                Fundador #{String(i + 1).padStart(3, "0")}
              </span>
              <span className="text-xs text-gray-medium">Em breve</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

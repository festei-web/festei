import { Sparkles, Users, MessageSquare, Star, Award } from "lucide-react";
import { FoundersProgramCTA } from "./founders-program-cta";
import { Reveal } from "@/components/ui/reveal";

const benefits = [
  {
    icon: Users,
    text: "Acompanhamento mais próximo da nossa equipe",
  },
  {
    icon: Sparkles,
    text: "Orientação para organizar as informações do anúncio",
  },
  {
    icon: MessageSquare,
    text: "Espaço para enviar feedback sobre a plataforma",
  },
  {
    icon: Star,
    text: "Prioridade na análise inicial dos cadastros",
  },
];

/**
 * Bloco do programa de proprietários fundadores.
 *
 * IMPORTANTE (prompt de melhorias, item 12 e item 32): esta seção NUNCA
 * deve prometer visibilidade/audiência ("mais visibilidade numa
 * plataforma com poucos concorrentes"), gratuidade permanente, ausência
 * de comissão, destaque vitalício, exclusividade ou garantia de demanda
 * / publicação. Os benefícios listados abaixo são deliberadamente
 * limitados a coisas que a Festei já pode cumprir nesta fase.
 */
export function FounderProgramSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="founder-gold-card group overflow-hidden rounded-[32px] p-6 sm:p-10 md:p-14">
          {/* Brilho diagonal discreto no hover — desativado com
              prefers-reduced-motion (ver globals.css) */}
          <div className="founder-gold-shimmer" aria-hidden />

          {/* Confete minimalista discreto — decorativo, desativado com
              prefers-reduced-motion (ver globals.css) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <span className="absolute left-[8%] top-10 h-2 w-2 rounded-full bg-coral/70" />
            <span className="absolute right-[12%] top-24 h-1.5 w-1.5 rounded-full bg-coral/50" />
            <span className="absolute left-[20%] bottom-16 h-2 w-2 rotate-45 bg-coral/40" />
            <span className="absolute right-[22%] bottom-10 h-1.5 w-1.5 rounded-full bg-primary/30" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="founder-gold-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                <Award className="h-3.5 w-3.5" aria-hidden />
                Parceiros fundadores
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Você pode ser um dos primeiros anfitriões da Festei
              </h2>
              <p className="mt-4 text-base text-gray-medium sm:text-lg">
                A Festei está formando sua primeira seleção de locais para
                festas no Rio de Janeiro. Os proprietários escolhidos nesta
                fase poderão acompanhar mais de perto a criação dos anúncios e
                contribuir com sugestões para o desenvolvimento da plataforma.
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-10 grid gap-4 text-left sm:grid-cols-2">
              {benefits.map((b) => (
                <div
                  key={b.text}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5"
                >
                  <div className="founder-gold-icon-circle flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <b.icon className="founder-gold-icon h-5 w-5" aria-hidden />
                  </div>
                  <p className="pt-1.5 text-sm font-medium text-ink">{b.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={160} className="mx-auto mt-8 max-w-xl rounded-xl border border-[#D4AF37]/25 bg-white/80 p-4 text-sm text-gray-medium">
              As condições da fase inicial serão apresentadas individualmente
              antes da publicação do local.
            </Reveal>

            <Reveal delay={220} className="mx-auto mt-8 max-w-md">
              <FoundersProgramCTA fullWidth size="xl" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Award,
  Percent,
  MessageSquare,
  Rocket,
  Lightbulb,
  Star,
  Ticket,
  Zap,
  Heart,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Ícones deliberadamente monocromáticos (neutros) nesta seção — pedido
// explícito de manter o grid de benefícios discreto, sem cor.
const benefits = [
  { icon: Award, text: "Selo Parceiro Fundador" },
  { icon: Percent, text: "Comissão reduzida exclusiva para Parceiros Fundadores" },
  { icon: MessageSquare, text: "Canal direto com a Equipe Festei" },
  { icon: Rocket, text: "Acesso antecipado às novas funcionalidades" },
  { icon: Lightbulb, text: "Influência na evolução da plataforma" },
  { icon: Star, text: "Destaque institucional" },
  { icon: Ticket, text: "Convites para ações exclusivas" },
  { icon: Zap, text: "Onboarding prioritário" },
  { icon: Heart, text: "Atendimento prioritário" },
];

export function FoundersBenefitsSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Benefícios exclusivos
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-light text-ink/70">
                <b.icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-medium text-ink">{b.text}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

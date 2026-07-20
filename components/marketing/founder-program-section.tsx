import { Sparkles, Users, MessageSquare } from "lucide-react";
import { OwnerCTA } from "./owner-cta";
import { Reveal } from "@/components/ui/reveal";

const benefits = [
  {
    icon: Sparkles,
    text: "Um dos primeiros locais visíveis na plataforma",
  },
  {
    icon: Users,
    text: "Cadastro com apoio direto da nossa equipe",
  },
  {
    icon: MessageSquare,
    text: "Espaço pra dar feedback e ajudar a moldar a experiência",
  },
];

/**
 * Bloco de recrutamento de proprietários, posicionado cedo na home
 * (substituiu "Locais em destaque") — foco em urgência/exclusividade de
 * fase inicial (Onda 0), diferente da OwnerSection mais abaixo, que foca
 * nos benefícios contínuos de usar a plataforma. As duas coexistem de
 * propósito: esta é o gancho pra quem já pode agir sem rolar a página
 * inteira; a de baixo é a versão completa, com lista de benefícios do dia
 * a dia.
 */
export function FounderProgramSection() {
  return (
    <section className="bg-primary-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Programa de parceiros fundadores
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Estamos selecionando os primeiros locais da Festei
          </h2>
          <p className="mt-4 text-base text-gray-medium sm:text-lg">
            A Festei está começando pelo Rio de Janeiro, e os primeiros
            locais cadastrados vão sair na frente: mais visibilidade numa
            plataforma com poucos concorrentes ainda, e atendimento próximo
            da nossa equipe pra te ajudar a montar um perfil completo desde
            o início.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.text}
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <b.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm font-medium text-ink">{b.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={180} className="mx-auto mt-10 max-w-md">
          <OwnerCTA fullWidth />
        </Reveal>
      </div>
    </section>
  );
}

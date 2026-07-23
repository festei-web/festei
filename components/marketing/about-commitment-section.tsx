import { Reveal } from "@/components/ui/reveal";

export function AboutCommitmentSection() {
  return (
    <section className="bg-gray-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Nosso compromisso
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-medium sm:text-lg">
            Na Festei, buscamos construir uma plataforma baseada em
            transparência, simplicidade e confiança.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-medium sm:text-lg">
            Nosso objetivo é facilitar a conexão entre quem procura o local
            ideal e quem deseja apresentar seu espaço para novos clientes,
            sempre evoluindo para oferecer uma experiência cada vez melhor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

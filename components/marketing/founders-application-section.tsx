import { OwnerLeadForm } from "@/components/marketplace/owner-lead-form";
import { SecondaryContactCta } from "./secondary-contact-cta";
import { Reveal } from "@/components/ui/reveal";

export function FoundersApplicationSection() {
  return (
    <section id="candidatura" className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Candidate-se para ser um Parceiro Fundador
          </h2>
          <p className="mt-3 text-sm text-gray-medium">
            O envio não garante a participação no programa. A equipe da
            Festei analisará as informações e entrará em contato para
            apresentar os próximos passos.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <OwnerLeadForm />
        </Reveal>

        <Reveal delay={160} className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-gray-medium">
            Prefere conversar antes de enviar o cadastro?
          </p>
          <SecondaryContactCta />
        </Reveal>
      </div>
    </section>
  );
}

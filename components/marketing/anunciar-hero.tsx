import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnunciarHero() {
  return (
    <section className="border-b border-border bg-primary-light/30 py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-coral-border bg-coral-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-hover">
          Catálogo inicial · Rio de Janeiro
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Cadastre seu local para festas na Festei
        </h1>
        <p className="mt-4 text-base text-gray-medium sm:text-lg">
          Estamos selecionando casas, sítios, salões e outros locais para
          formar nosso catálogo inicial no Rio de Janeiro.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <a href="#formulario">
              <Send className="h-4 w-4" aria-hidden />
              Enviar meu local para análise
            </a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-gray-medium">
          O cadastro inicial leva poucos minutos. Informações complementares
          serão solicitadas somente após a análise.
        </p>
      </div>
    </section>
  );
}

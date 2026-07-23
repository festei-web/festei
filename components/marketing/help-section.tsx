import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL_URL, WHATSAPP_CONTACT_URL } from "@/lib/site";

/**
 * Seção de atendimento exibida antes do rodapé em todas as páginas
 * (renderizada em app/layout.tsx), para manter os canais oficiais da
 * Festei sempre acessíveis sem depender só do botão flutuante.
 */
export function HelpSection() {
  return (
    <section className="border-t border-border bg-gray-light">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Precisa de ajuda?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-gray-medium">
            Fale com a equipe da Festei. Estamos disponíveis para ajudar você
            a encontrar o local ideal ou anunciar seu local para eventos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Falar pelo WhatsApp
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={CONTACT_EMAIL_URL}>
                <Mail className="h-4 w-4" aria-hidden />
                Enviar e-mail
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

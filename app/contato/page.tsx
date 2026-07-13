import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = { title: "Contato" };

// Configure o número real da Festei em WHATSAPP_NUMBER (formato: 5521999999999,
// sem símbolos). Enquanto não houver um número oficial, o link abaixo não
// será renderizado — evitando um href="#" morto na página.
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ola@festei.com.br";

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Fale com a gente</h1>
      <p className="mt-4 text-[15px] text-gray-medium">
        Prefere falar diretamente? Escolha o canal que for mais fácil para você.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <a
          href={`mailto:${contactEmail}`}
          className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary"
        >
          <Mail className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm text-ink">{contactEmail}</span>
        </a>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary"
          >
            <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
            <span className="text-sm text-ink">Falar no WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}

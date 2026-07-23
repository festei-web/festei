import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  WHATSAPP_CONTACT_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Fale com a gente</h1>
      <p className="mt-4 text-[15px] text-gray-medium">
        Prefere falar diretamente? Escolha o canal que for mais fácil para você.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <a
          href={CONTACT_EMAIL_URL}
          className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary"
        >
          <Mail className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm text-ink">{CONTACT_EMAIL}</span>
        </a>
        <a
          href={WHATSAPP_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary"
        >
          <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm text-ink">WhatsApp: {WHATSAPP_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}

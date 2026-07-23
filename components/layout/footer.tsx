import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  WHATSAPP_CONTACT_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

const columns = [
  {
    title: "Festei",
    links: [
      { href: "/locais", label: "Encontrar locais" },
      { href: "/sobre", label: "Sobre" },
      { href: "/#como-funciona", label: "Como funciona" },
      { href: "/anunciar", label: "Para proprietários" },
      { href: "/#faq", label: "FAQ" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidade", label: "Política de Privacidade" },
      { href: "/termos", label: "Termos de Uso" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-medium">
              A Festei conecta pessoas aos melhores locais para eventos,
              tornando a organização de celebrações mais simples, rápida e
              segura.
            </p>
            {/* Redes sociais: adicionar os links reais aqui assim que os
                perfis oficiais da Festei forem criados. Removidos por
                enquanto para não deixar links mortos (href="#") no ar. */}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-ink">Atendimento</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={WHATSAPP_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-medium transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_EMAIL_URL}
                  className="flex items-center gap-2 text-sm text-gray-medium transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-gray-medium">
          © {new Date().getFullYear()} Festei. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

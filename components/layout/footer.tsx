import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Festei",
    links: [
      { href: "/sobre", label: "Sobre" },
      { href: "/#como-funciona", label: "Como funciona" },
      { href: "/anunciar", label: "Proprietários" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidade", label: "Política de Privacidade" },
      { href: "/termos", label: "Termos de Uso" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-medium">
              A Festei conecta pessoas aos melhores locais para eventos,
              tornando a organização de celebrações mais simples, rápida e
              segura. Cobertura na cidade do Rio de Janeiro.
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
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-gray-medium">
          © {new Date().getFullYear()} Festei. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

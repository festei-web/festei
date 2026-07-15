import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Festei | Encontre locais para festas e eventos no Rio de Janeiro",
    template: "%s | Festei",
  },
  description:
    "Compare casas, sítios, salões, chácaras e outros locais para festas e eventos no Rio de Janeiro. Consulte estrutura, capacidade e disponibilidade.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "pt_BR",
    siteName: "Festei",
    title: "Festei | Encontre locais para festas e eventos no Rio de Janeiro",
    description:
      "Compare casas, sítios, salões, chácaras e outros locais para festas e eventos no Rio de Janeiro.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festei | Encontre locais para festas e eventos no Rio de Janeiro",
    description:
      "Compare casas, sítios, salões, chácaras e outros locais para festas e eventos no Rio de Janeiro.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Festei",
  url: SITE_URL,
  description:
    "Plataforma que conecta pessoas a locais para eventos no Rio de Janeiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

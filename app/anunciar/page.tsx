import { Suspense } from "react";
import type { Metadata } from "next";
import { AnunciarPageClient } from "@/components/marketing/anunciar-page-client";
import { SITE_URL } from "@/lib/site";

const title = "Anuncie seu local para festas no Rio de Janeiro | Festei";
const description =
  "Cadastre casas, sítios, salões ou chácaras para festas na Festei e participe da formação do catálogo inicial no Rio de Janeiro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/anunciar" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/anunciar`,
    locale: "pt_BR",
    siteName: "Festei",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AnunciarPage() {
  return (
    <Suspense fallback={null}>
      <AnunciarPageClient />
    </Suspense>
  );
}

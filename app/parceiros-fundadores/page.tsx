import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { foundersFaqItems } from "@/data/founders";
import { FoundersHero } from "@/components/marketing/founders-hero";
import { FoundersWhatSection } from "@/components/marketing/founders-what-section";
import { FoundersWhyFiftySection } from "@/components/marketing/founders-why-fifty-section";
import { FoundersBenefitsSection } from "@/components/marketing/founders-benefits-section";
import { WhoCanListSection } from "@/components/marketing/who-can-list-section";
import { FoundersExpectationsSection } from "@/components/marketing/founders-expectations-section";
import { FoundersTimelineSection } from "@/components/marketing/founders-timeline-section";
import { FoundersWallSection } from "@/components/marketing/founders-wall-section";
import { FoundersFaqSection } from "@/components/marketing/founders-faq-section";
import { FoundersFinalCta } from "@/components/marketing/founders-final-cta";
import { FoundersApplicationSection } from "@/components/marketing/founders-application-section";

const title = "Parceiros Fundadores da Festei | Programa exclusivo para 50 proprietários";
const description =
  "A Festei está selecionando os 50 primeiros Parceiros Fundadores: proprietários de casas, sítios, chácaras e salões que vão construir com a gente um novo padrão para o mercado de locação de espaços para eventos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/parceiros-fundadores" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/parceiros-fundadores`,
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: foundersFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ParceirosFundadoresPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <FoundersHero />
      <FoundersWhatSection />
      <FoundersWhyFiftySection />
      <FoundersBenefitsSection />
      <WhoCanListSection title="Quem estamos procurando" />
      <FoundersExpectationsSection />
      <FoundersTimelineSection />
      <FoundersWallSection />
      <FoundersFaqSection />
      <FoundersFinalCta />
      <FoundersApplicationSection />
    </div>
  );
}

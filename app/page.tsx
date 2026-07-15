import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { CategoriesSection } from "@/components/marketing/categories-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustSection } from "@/components/marketing/trust-section";
import { BenefitsSection } from "@/components/marketing/benefits-section";
import { OwnerSection } from "@/components/marketing/owner-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaSection } from "@/components/marketing/cta-section";
import { VenueCard } from "@/components/marketplace/venue-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedVenues } from "@/data/venues";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedVenues().slice(0, 6);

  return (
    <>
      <Hero />
      <ProblemSection />
      <CategoriesSection />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Destaques
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Locais que podem ser perfeitos para sua celebração
          </h2>
          <p className="mt-3 text-gray-medium">
            Conheça alguns exemplos de locais disponíveis na plataforma.
          </p>
          <p className="mt-1 text-xs text-gray-medium/70">
            Locais demonstrativos, para ilustrar a experiência da Festei.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((venue, i) => (
            <Reveal key={venue.id} delay={(i % 3) * 80}>
              <VenueCard venue={venue} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/locais">Ver todos os locais</Link>
          </Button>
        </div>
      </section>

      <HowItWorks />
      <TrustSection />
      <BenefitsSection />
      <OwnerSection />
      <FaqAccordion />
      <CtaSection />
    </>
  );
}

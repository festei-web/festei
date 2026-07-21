import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { CategoriesSection } from "@/components/marketing/categories-section";
import { FounderProgramSection } from "@/components/marketing/founder-program-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustSection } from "@/components/marketing/trust-section";
import { OwnerSection } from "@/components/marketing/owner-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaSection } from "@/components/marketing/cta-section";
import { AppFutureSection } from "@/components/marketing/app-future-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <OwnerSection />
      <ProblemSection />
      <HowItWorks />
      <TrustSection />
      <FounderProgramSection />
      <FaqAccordion />
      <CtaSection />
      <AppFutureSection />
    </>
  );
}

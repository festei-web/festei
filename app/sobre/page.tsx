import type { Metadata } from "next";
import { AboutHero } from "@/components/marketing/about-hero";
import { AboutStorySection } from "@/components/marketing/about-story-section";
import { AboutMissionVisionSection } from "@/components/marketing/about-mission-vision-section";
import { AboutValuesSection } from "@/components/marketing/about-values-section";
import { AboutHowItWorksSection } from "@/components/marketing/about-how-it-works-section";
import { AboutAudienceSection } from "@/components/marketing/about-audience-section";
import { AboutCommitmentSection } from "@/components/marketing/about-commitment-section";
import { AboutFutureSection } from "@/components/marketing/about-future-section";
import { AboutTrustIndicatorsSection } from "@/components/marketing/about-trust-indicators-section";
import { AboutFinalCtaSection } from "@/components/marketing/about-final-cta-section";

export const metadata: Metadata = {
  title: "Sobre a Festei",
  description:
    "A Festei nasceu para transformar a forma como as pessoas encontram locais para celebrar — conectando quem procura um espaço a proprietários, com transparência e simplicidade.",
};

export default function SobrePage() {
  return (
    <>
      <AboutHero />
      <AboutStorySection />
      <AboutMissionVisionSection />
      <AboutValuesSection />
      <AboutHowItWorksSection />
      <AboutAudienceSection />
      <AboutCommitmentSection />
      <AboutFutureSection />
      <AboutTrustIndicatorsSection />
      <AboutFinalCtaSection />
    </>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { AnunciarPageClient } from "@/components/marketing/anunciar-page-client";

export const metadata: Metadata = {
  title: "Anuncie seu local na Festei",
  description:
    "Cadastre seu local para eventos na Festei e receba novas oportunidades de reserva no Rio de Janeiro.",
};

export default function AnunciarPage() {
  return (
    <Suspense fallback={null}>
      <AnunciarPageClient />
    </Suspense>
  );
}

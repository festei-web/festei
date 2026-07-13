import { Suspense } from "react";
import type { Metadata } from "next";
import { LocaisPageClient } from "@/components/marketplace/locais-page-client";

export const metadata: Metadata = {
  title: "Encontre locais para eventos no Rio de Janeiro",
  description:
    "Busque e compare casas, sítios, salões, chácaras e rooftops para festas e eventos em todo o Rio de Janeiro.",
  alternates: { canonical: "/locais" },
};

export default function LocaisPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-medium">Carregando locais…</div>}>
      <LocaisPageClient />
    </Suspense>
  );
}

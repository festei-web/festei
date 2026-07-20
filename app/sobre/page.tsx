import type { Metadata } from "next";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Sobre a Festei" };

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
        <PartyPopper className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="mt-5 text-3xl font-bold text-ink sm:text-4xl">Sobre a Festei</h1>
      <p className="mt-6 text-[15px] leading-relaxed text-gray-medium">
        A Festei nasceu para simplificar a forma como pessoas encontram locais
        para celebrar. Acreditamos que celebrar aproxima pessoas — e que
        encontrar o lugar certo para isso não deveria ser um processo cansativo
        e desorganizado.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-gray-medium">
        Começamos pela cidade do Rio de Janeiro, conectando quem procura um
        local para aniversários, churrascos, festas infantis e outras pequenas
        celebrações a proprietários de casas, sítios, salões e chácaras.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-gray-light/40 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-ink">Quer participar?</h2>
        <p className="mt-2 text-sm text-gray-medium">
          Seja você quem procura o lugar perfeito para uma festa ou tem um
          espaço para oferecer, a Festei ajuda a dar o próximo passo.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="flex-1">
            <Link href="/anunciar">Anunciar meu local</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="flex-1">
            <Link href="/locais">Encontrar um local</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

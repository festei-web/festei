import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre a Festei" };

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Sobre a Festei</h1>
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
    </div>
  );
}

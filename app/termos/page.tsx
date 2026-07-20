import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold text-ink">Termos de Uso</h1>
      <p className="mt-2 text-sm text-gray-medium">Última atualização: julho de 2026.</p>

      <div className="mt-8 flex flex-col gap-8 text-[15px] leading-relaxed text-gray-medium">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Sobre a Festei</h2>
          <p className="mt-2">
            A Festei é uma plataforma de descoberta de locais para eventos,
            que conecta pessoas que procuram um local para celebrar a
            proprietários que desejam divulgar seus locais. A Festei atua
            como intermediária na etapa de descoberta e no contato inicial —
            não é parte do contrato de locação firmado entre cliente e
            proprietário.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. Cadastro e uso da plataforma</h2>
          <p className="mt-2">
            Ao enviar uma solicitação de disponibilidade ou cadastrar um
            local, você declara que as informações fornecidas são
            verdadeiras e que possui autoridade para representar o local
            anunciado, quando aplicável. É proibido usar a plataforma para
            fins ilícitos, discriminatórios ou que violem direitos de
            terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">3. Intermediação e responsabilidade</h2>
          <p className="mt-2">
            A Festei verifica as informações fornecidas por proprietários
            dentro do razoável, mas não garante a veracidade absoluta de
            fotos, preços ou disponibilidade a qualquer momento. A
            confirmação final de reserva, pagamento e condições do evento é
            negociada entre cliente e proprietário, com a nossa equipe
            intermediando o contato.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Comissão e gratuidade</h2>
          <p className="mt-2">
            O cadastro de proprietários é gratuito nesta fase. A Festei
            poderá cobrar comissão sobre reservas efetivamente concluídas,
            conforme informado ao proprietário no momento do cadastro. Não
            há cobrança para quem busca um local.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Propriedade intelectual</h2>
          <p className="mt-2">
            A marca Festei, seu layout, textos e identidade visual são de
            propriedade da empresa. Fotos enviadas por proprietários
            permanecem de propriedade de quem as enviou, mas seu uso na
            plataforma é autorizado para fins de divulgação do local.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Alterações destes termos</h2>
          <p className="mt-2">
            Estes termos podem ser atualizados conforme a plataforma evolui.
            Alterações relevantes serão comunicadas por e-mail ou aviso na
            própria plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">7. Contato</h2>
          <p className="mt-2">
            Dúvidas sobre estes Termos de Uso podem ser enviadas para{" "}
            <a href="mailto:ola@festei.com.br" className="text-primary underline">
              ola@festei.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

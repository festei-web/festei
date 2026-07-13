import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold text-ink">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-gray-medium">Última atualização: julho de 2026.</p>

      <div className="mt-8 flex flex-col gap-8 text-[15px] leading-relaxed text-gray-medium">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Quais dados coletamos</h2>
          <p className="mt-2">
            Quando você envia uma solicitação de disponibilidade ou cadastra
            um local, coletamos: nome, telefone, e-mail e, dependendo do
            formulário, data do evento, quantidade de convidados, nome e
            características do local. Também coletamos sua preferência de
            canal de contato, para que possamos falar com você da forma que
            escolher.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. Para que usamos esses dados</h2>
          <p className="mt-2">
            Usamos esses dados exclusivamente para: (a) intermediar o
            contato entre clientes e proprietários de locais; (b) responder
            solicitações de disponibilidade ou de cadastro; (c) melhorar a
            qualidade do atendimento. Não vendemos seus dados a terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">3. Como armazenamos</h2>
          <p className="mt-2">
            Nesta fase do produto, os dados enviados por formulários são
            encaminhados diretamente à equipe da Festei através de um canal
            interno seguro, sem constituir um banco de dados público ou
            acessível a terceiros. À medida que a plataforma evoluir para um
            marketplace completo, esta política será atualizada para
            refletir o armazenamento em banco de dados próprio, com as
            devidas salvaguardas técnicas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Tempo de retenção</h2>
          <p className="mt-2">
            Mantemos os dados de contato pelo tempo necessário para
            concluir o atendimento da sua solicitação e por um período
            adicional razoável para fins de suporte e histórico comercial,
            após o qual podem ser removidos mediante solicitação.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Seus direitos (LGPD)</h2>
          <p className="mt-2">
            Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
            você tem direito a: confirmar a existência de tratamento dos
            seus dados; acessar, corrigir ou solicitar a exclusão dos seus
            dados; solicitar a portabilidade; e revogar o consentimento
            dado. Para exercer qualquer um desses direitos, escreva para{" "}
            <a href="mailto:privacidade@festei.com.br" className="text-primary underline">
              privacidade@festei.com.br
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Cookies</h2>
          <p className="mt-2">
            Esta versão da plataforma não utiliza cookies de rastreamento ou
            analytics de terceiros. Caso isso mude no futuro — por exemplo,
            para medir desempenho de marketing — esta política será
            atualizada e um aviso de cookies será exibido antes de qualquer
            coleta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">7. Compartilhamento com proprietários</h2>
          <p className="mt-2">
            Quando você solicita disponibilidade de um local, seu nome e
            forma de contato preferida podem ser compartilhados com o
            proprietário correspondente, exclusivamente para viabilizar a
            negociação do seu evento.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">8. Contato</h2>
          <p className="mt-2">
            Dúvidas sobre esta Política de Privacidade podem ser enviadas
            para{" "}
            <a href="mailto:privacidade@festei.com.br" className="text-primary underline">
              privacidade@festei.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

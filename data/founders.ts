import { OWNER_RESPONSE_TIME_PLACEHOLDER } from "@/lib/site";

/**
 * Programa Parceiros Fundadores — números do progresso de vagas.
 *
 * Única fonte de verdade para a contagem exibida na barra de progresso da
 * página /parceiros-fundadores e no bloco correspondente da home. Atualize
 * apenas FOUNDER_SPOTS_FILLED conforme novos parceiros forem aprovados.
 */
export const FOUNDER_SPOTS_TOTAL = 50;
export const FOUNDER_SPOTS_FILLED = 17;

// Conteúdo do FAQ da página /parceiros-fundadores. Vive em um módulo sem
// "use client" para poder ser importado tanto pelo accordion (client) quanto
// pela página (server, para gerar o JSON-LD de FAQPage) sem cruzar a
// fronteira client/server.
export const foundersFaqItems = [
  {
    question: "Precisa pagar?",
    answer: "Não. A participação no programa Parceiros Fundadores não tem custo de inscrição.",
  },
  {
    question: "Existe contrato?",
    answer:
      "Sim. As condições e o contrato serão apresentados durante o processo de aprovação, antes da publicação do local.",
  },
  {
    question: "Quanto tempo leva a aprovação?",
    answer: `Nossa equipe realiza a avaliação inicial ${OWNER_RESPONSE_TIME_PLACEHOLDER}.`,
  },
  {
    question: "Meu espaço pode ser recusado?",
    answer:
      "Sim. Nem todos os locais inscritos serão aprovados nesta fase — buscamos espaços alinhados com o padrão de qualidade da Festei.",
  },
  {
    question: "Posso sair quando quiser?",
    answer:
      "Sim. A participação é voluntária e você pode encerrar sua parceria com a Festei a qualquer momento.",
  },
  {
    question: "O selo permanece para sempre?",
    answer:
      "O selo Parceiro Fundador reconhece quem participou desta fase inicial e permanece associado ao seu perfil enquanto você fizer parte da Festei.",
  },
];

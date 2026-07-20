import type { FaqItem } from "@/types";
import { OWNER_RESPONSE_TIME_PLACEHOLDER } from "@/lib/site";

export const faq: FaqItem[] = [
  // Para quem procura um local
  {
    group: "buscando",
    question: "A solicitação já confirma a reserva?",
    answer:
      "Não. A solicitação leva os dados do seu evento até a nossa equipe, que confirma disponibilidade e condições com o responsável pelo local. A reserva só acontece depois desse processo.",
  },
  {
    group: "buscando",
    question: "Existe cobrança para enviar uma solicitação?",
    answer: "Não. Buscar locais e enviar solicitações é totalmente gratuito, sem nenhuma cobrança.",
  },
  {
    group: "buscando",
    question: "Como recebo a resposta?",
    answer:
      "Pelo canal de contato que você escolher no formulário — telefone/WhatsApp ou apenas mensagem de texto. Nossa equipe entra em contato com você trazendo a resposta do responsável pelo local.",
  },
  {
    group: "buscando",
    question: "Posso visitar o local antes de reservar?",
    answer:
      "Isso depende de cada proprietário. Você pode perguntar sobre a possibilidade de visita com a nossa equipe, depois de enviar sua solicitação.",
  },
  {
    group: "buscando",
    question: "A Festei participa do contrato?",
    answer:
      "A Festei não é parte no contrato final, mas intermedia toda a negociação. O contrato e a reserva são combinados entre você e o responsável pelo local, sempre com o apoio da nossa equipe.",
  },
  {
    group: "buscando",
    question: "Os valores apresentados são finais?",
    answer:
      "Os valores exibidos são valores iniciais de referência. O valor final pode variar de acordo com data, duração, serviços adicionais e outros detalhes combinados com o responsável.",
  },
  {
    group: "buscando",
    question: "Como funciona a verificação?",
    answer:
      "O selo \"Verificado\" pode indicar identidade confirmada, existência do local validada e informações principais conferidas. Ele não é garantia de qualidade, segurança ou cumprimento contratual.",
  },
  {
    group: "buscando",
    question: "Onde encontro o endereço completo?",
    answer:
      "O endereço completo é compartilhado pela nossa equipe durante a negociação — por segurança, ele não fica público na página do local.",
  },

  // Para proprietários
  {
    group: "proprietarios",
    question: "O cadastro garante que meu local será publicado?",
    answer:
      "Não. A equipe da Festei analisará as informações antes de confirmar a participação no catálogo inicial.",
  },
  {
    group: "proprietarios",
    question: "Quem define o valor do local?",
    answer:
      "O responsável pelo local informa os valores e as condições. A Festei organiza essas informações para apresentá-las aos interessados.",
  },
  {
    group: "proprietarios",
    question: "Sou obrigado a aceitar todas as festas?",
    answer:
      "Não. O responsável mantém a liberdade para analisar cada solicitação e decidir se deseja aceitá-la.",
  },
  {
    group: "proprietarios",
    question: "Posso bloquear datas?",
    answer:
      "Sim. A disponibilidade será informada pelo responsável pelo local. A forma de atualização poderá evoluir conforme o desenvolvimento da plataforma.",
  },
  {
    group: "proprietarios",
    question: "Preciso enviar documentos no primeiro cadastro?",
    answer:
      "Não. O formulário inicial serve para conhecermos o local. Caso ele avance na análise, a equipe informará os documentos e dados complementares necessários.",
  },
  {
    group: "proprietarios",
    question: "Preciso ter fotos profissionais?",
    answer:
      "Não necessariamente. A equipe avaliará as imagens disponíveis e poderá orientar sobre como apresentar melhor o local.",
  },
  {
    group: "proprietarios",
    question: "Existe alguma taxa?",
    answer:
      "As condições comerciais serão explicadas antes da publicação do local, de forma individual.",
  },
  {
    group: "proprietarios",
    question: "O cadastro é automático?",
    answer: "Não. Cada local passa por uma análise inicial antes de ser aprovado.",
  },
  {
    group: "proprietarios",
    question: "Em quanto tempo receberei retorno?",
    answer: `Nossa equipe entra em contato ${OWNER_RESPONSE_TIME_PLACEHOLDER}.`,
  },
];

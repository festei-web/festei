/**
 * URL canônica oficial da Festei.
 *
 * Única fonte de verdade para o domínio do site — usada em metadata,
 * Open Graph, JSON-LD, sitemap e robots. Alterar apenas aqui em caso de
 * troca de domínio no futuro.
 */
export const SITE_URL = "https://www.festeiapp.com.br";

/**
 * Canais oficiais de atendimento da Festei.
 *
 * Única fonte de verdade para telefone/WhatsApp e e-mail de contato —
 * usados no botão flutuante, no rodapé, na seção "Precisa de ajuda?" e nos
 * formulários de lead. Configuráveis via NEXT_PUBLIC_WHATSAPP_NUMBER
 * (formato internacional, apenas dígitos) e NEXT_PUBLIC_CONTACT_EMAIL,
 * com os valores oficiais como padrão.
 */
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5521936183831";

/** Telefone formatado para exibição (rodapé, página de contato). */
export const WHATSAPP_DISPLAY = "(21) 93618-3831";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "festei.contato@gmail.com";

export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

/**
 * Prazo de retorno para proprietários após o envio do cadastro.
 *
 * PLACEHOLDER: nenhum prazo operacional real foi definido ainda pela
 * Festei (prompt de melhorias, item 14, pergunta "Em quanto tempo
 * receberei retorno?"). Ajuste este valor assim que o prazo real for
 * definido pela operação — é a única string que precisa mudar.
 */
export const OWNER_RESPONSE_TIME_PLACEHOLDER =
  "em breve — o prazo exato será confirmado pela nossa equipe";

/** Link wa.me com a mensagem padrão de contato geral do site. */
export const WHATSAPP_CONTACT_URL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Olá, vim pelo site da Festei e gostaria de mais informações."
)}`;

/** Link wa.me com mensagem voltada a proprietários (CTA "Falar com a Festei"). */
export const WHATSAPP_OWNER_URL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Olá! Tenho um local para festas e gostaria de conversar sobre a Festei."
)}`;

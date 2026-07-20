/**
 * URL canônica oficial da Festei.
 *
 * Única fonte de verdade para o domínio do site — usada em metadata,
 * Open Graph, JSON-LD, sitemap e robots. Alterar apenas aqui em caso de
 * troca de domínio no futuro.
 */
export const SITE_URL = "https://www.festeiapp.com.br";

/**
 * Canal de contato secundário ("Falar com a Festei") para proprietários que
 * preferem conversar antes de enviar o cadastro (prompt de melhorias, item 18).
 *
 * Configurado via variável de ambiente NEXT_PUBLIC_WHATSAPP_NUMBER (formato
 * internacional, apenas dígitos — ex.: 5521999999999). Nunca use um número
 * fictício aqui. Se a variável não estiver definida, WHATSAPP_CONTACT_URL
 * é `null` e qualquer componente que dependa dele deve se ocultar (ver
 * components/marketing/secondary-contact-cta.tsx).
 */
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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

export const WHATSAPP_CONTACT_URL = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Olá! Tenho um local para festas e gostaria de conversar sobre a Festei."
    )}`
  : null;

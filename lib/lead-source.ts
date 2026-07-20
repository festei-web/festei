/**
 * Captura automática de origem do lead — página de origem, URL completa
 * e parâmetros UTM (prompt de melhorias, item 25). Nunca perguntado ao
 * usuário; lido diretamente do navegador no momento do envio.
 */
export function captureLeadSource(): {
  pageUrl: string;
  pageOrigin: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === "undefined") {
    return { pageUrl: "", pageOrigin: "" };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    pageUrl: window.location.href,
    pageOrigin: window.location.pathname,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}

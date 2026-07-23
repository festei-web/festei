/**
 * Camada central de eventos de conversão — sem nenhuma ferramenta externa
 * instalada ainda. Por enquanto registra no console (visível apenas em
 * desenvolvimento); quando uma ferramenta real for integrada (GA4, Meta
 * Pixel, PostHog etc.), basta trocar a implementação de `track` aqui,
 * sem alterar nenhum ponto de chamada (prompt de melhorias, item 29).
 */
export type AnalyticsEvent =
  // Clientes
  | "hero_search_submitted"
  | "search_started"
  | "search_submitted"
  | "category_selected"
  | "filters_applied"
  | "location_card_viewed"
  | "location_details_opened"
  | "venue_opened"
  | "favorite_added"
  | "favorite_removed"
  | "availability_request_started"
  | "availability_request_submitted"
  | "availability_form_started"
  | "availability_submitted"
  | "availability_success"
  | "availability_error"
  | "availability_calendar_viewed"
  | "availability_month_changed"
  | "event_date_selected"
  | "unavailable_date_clicked"
  | "venue_map_region_link_clicked"
  // Proprietários
  | "owner_section_viewed"
  | "owner_cta_clicked"
  | "owner_form_started"
  | "owner_form_field_error"
  | "owner_form_submitted"
  | "owner_form_success"
  | "owner_form_error"
  | "owner_whatsapp_clicked"
  | "owner_faq_opened";

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event}`, payload ?? {});
  }
  // TODO: encaminhar para a ferramenta de analytics real quando integrada.
}

/** "mobile" | "desktop" a partir da largura da viewport — nunca coleta
 * nenhum dado pessoal, só o formato usado para segmentar eventos. */
export function getDeviceType(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia("(max-width: 640px)").matches ? "mobile" : "desktop";
}

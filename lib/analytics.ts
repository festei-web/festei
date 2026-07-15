/**
 * Camada central de eventos de conversão — sem nenhuma ferramenta externa
 * instalada ainda. Por enquanto registra no console (visível apenas em
 * desenvolvimento); quando uma ferramenta real for integrada (GA4, Meta
 * Pixel, PostHog etc.), basta trocar a implementação de `track` aqui,
 * sem alterar nenhum ponto de chamada (prompt de melhorias, item 29).
 */
export type AnalyticsEvent =
  | "hero_search_submitted"
  | "category_selected"
  | "filters_applied"
  | "location_card_viewed"
  | "location_details_opened"
  | "favorite_added"
  | "favorite_removed"
  | "availability_request_started"
  | "availability_request_submitted"
  | "owner_cta_clicked"
  | "owner_form_submitted";

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event}`, payload ?? {});
  }
  // TODO: encaminhar para a ferramenta de analytics real quando integrada.
}

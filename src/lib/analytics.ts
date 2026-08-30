export type AnalyticsEvent =
  | "view_work"
  | "view_services"
  | "start_project_click"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error"
  | "language_switch"
  | "explore_the_lab"
  | "academy_interest";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: AnalyticsEvent, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...detail };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("focuslabs:analytics", { detail: payload }));
}

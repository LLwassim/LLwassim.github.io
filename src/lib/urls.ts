export const CALENDLY_BASE = "https://calendly.com/wassimlacorchy/30min";

export function buildCalendlyUrl(medium: string, campaign = "hire_me") {
  const url = new URL(CALENDLY_BASE);
  url.searchParams.set("utm_source", "portfolio");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

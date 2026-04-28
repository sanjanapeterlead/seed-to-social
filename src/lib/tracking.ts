export type EventPayload = {
  eventName: string;
  metaData?: Record<string, unknown>;
  path?: string;
  timestamp?: string;
};

export function trackEvent({ eventName, metaData = {} }: EventPayload) {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("seed_to_social_events");
  const events: EventPayload[] = existing ? JSON.parse(existing) : [];

  events.push({
    eventName,
    metaData,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("seed_to_social_events", JSON.stringify(events));
}

export function getEvents(): EventPayload[] {
  if (typeof window === "undefined") return [];

  const existing = localStorage.getItem("seed_to_social_events");
  return existing ? (JSON.parse(existing) as EventPayload[]) : [];
}
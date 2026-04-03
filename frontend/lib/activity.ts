export type ActivityEvent = {
  type:
    | "page_view"
    | "property_viewed"
    | "property_created"
    | "property_deleted"
    | "property_edited"
    | "search";
  detail?: string;
  timestamp: string;
};

const COOKIE_NAME = "kiri_activity";
const MAX_EVENTS = 50;

function readCookie(): ActivityEvent[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return [];
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return [];
  }
}

function writeCookie(events: ActivityEvent[]) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(events));
  // Expires in 30 days
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function trackEvent(type: ActivityEvent["type"], detail?: string) {
  const events = readCookie();
  const newEvent: ActivityEvent = {
    type,
    detail,
    timestamp: new Date().toISOString(),
  };
  // Keep only the most recent MAX_EVENTS
  const updated = [...events, newEvent].slice(-MAX_EVENTS);
  writeCookie(updated);
}

export function getActivityLog(): ActivityEvent[] {
  return readCookie();
}

export function clearActivityLog() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

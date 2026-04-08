import posthog from "posthog-js";

export function initAnalytics() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }
}

export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== "undefined") {
    posthog.capture(event, properties);
  }
}

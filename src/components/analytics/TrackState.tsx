"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export default function TrackState({ event }: { event: AnalyticsEvent }) {
  useEffect(() => trackEvent(event), [event]);
  return null;
}

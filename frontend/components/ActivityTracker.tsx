"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/activity";

export function ActivityTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", pathname);
  }, [pathname]);

  return null;
}

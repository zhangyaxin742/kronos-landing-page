"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type PageAnalyticsProps = {
  page: string;
  data?: Record<string, string | number | boolean>;
};

export default function PageAnalytics({ page, data }: PageAnalyticsProps) {
  useEffect(() => {
    track("page_view", { page, ...(data ?? {}) });
  }, [page, data]);

  return null;
}

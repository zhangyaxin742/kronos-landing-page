"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export default function AnalyticsTracker() {
  const startTimeRef = useRef(Date.now());
  const trackedDepthsRef = useRef<Set<number>>(new Set());
  const timeSentRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const documentElement = document.documentElement;
      const scrollHeight =
        documentElement.scrollHeight - documentElement.clientHeight;
      const percent =
        scrollHeight > 0
          ? Math.min(
              100,
              Math.round((window.scrollY / scrollHeight) * 100)
            )
          : 100;

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !trackedDepthsRef.current.has(threshold)) {
          trackedDepthsRef.current.add(threshold);
          track("scroll_depth", { percent: threshold });
        }
      });
    };

    const handleTimeOnPage = () => {
      if (timeSentRef.current) return;
      timeSentRef.current = true;
      const seconds = Math.max(
        1,
        Math.round((Date.now() - startTimeRef.current) / 1000)
      );
      track("time_on_page", { seconds });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleTimeOnPage();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleTimeOnPage);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleTimeOnPage);
      handleTimeOnPage();
    };
  }, []);

  return null;
}

import type { Metadata } from "next";

import PageAnalytics from "@/components/PageAnalytics";
import SuccessContent from "@/components/SuccessContent";
import { FadeIn } from "@/components/Motion";

export const metadata: Metadata = {
  title: "You're in. — KRONOS",
  description:
    "You're on the KRONOS waitlist. We'll notify you the moment we launch.",
  robots: { index: false, follow: true },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bone)] text-[color:var(--color-void)]">
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <FadeIn className="w-full">
          <SuccessContent />
        </FadeIn>
      </main>
      <PageAnalytics page="success" />
    </div>
  );
}

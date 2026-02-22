import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import PageAnalytics from "@/components/PageAnalytics";
import SignupPageContent from "@/components/SignupPageContent";
import { FadeIn } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Join KRONOS — Stop Making Excuses",
  description: "Join KRONOS and stop making excuses.",
  robots: { index: false, follow: true },
};

type SignupPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function SignupPage({ searchParams }: SignupPageProps) {
  const planParam =
    typeof searchParams?.plan === "string" ? searchParams.plan : undefined;

  return (
    <div className="min-h-screen bg-[color:var(--color-bone)] text-[color:var(--color-void)]">
      <Navbar links={[]} homeHref="/" showCta={false} showMenu={false} />
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center pt-24 pb-16">
        <section className="w-full px-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
            <FadeIn className="w-full">
              <div className="mb-12 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-crimson)]">
                  JOIN KRONOS
                </p>
                <h1
                  className="mt-4 text-[40px] font-extrabold tracking-[-0.02em] text-[color:var(--color-void)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ready to stop making excuses?
                </h1>
                <p className="mt-4 text-[18px] text-[color:var(--color-mid-gray)]">
                  The wait is over. Pick a plan. Start being accountable.
                </p>
              </div>
              <SignupPageContent selectedPlan={planParam} />
            </FadeIn>
          </div>
        </section>
      </main>
      <PageAnalytics page="signup" />
    </div>
  );
}

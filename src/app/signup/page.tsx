import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageAnalytics from "@/components/PageAnalytics";
import SignupPageContent from "@/components/SignupPageContent";
import { FadeIn } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Join the Waitlist - KRONOS",
  description:
    "Get early access to KRONOS. Join the waitlist and be first to experience premium timeblocking.",
  openGraph: {
    title: "Join KRONOS Waitlist",
    description: "Be first to experience the future of productivity.",
    url: "https://kronos.app/signup",
  },
  robots: { index: false, follow: true },
};

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/pricing#faq" },
];

type SignupPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function SignupPage({ searchParams }: SignupPageProps) {
  const planParam =
    typeof searchParams?.plan === "string" ? searchParams.plan : undefined;

  return (
    <div className="min-h-screen bg-[color:var(--color-white)] text-[color:var(--color-black)]">
      <Navbar links={navLinks} ctaHref="/pricing" ctaLabel="View Pricing" homeHref="/" />
      <main className="pt-24">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-black-8),_transparent_65%)]" />
          <div className="absolute -left-40 bottom-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_var(--color-black-10),_transparent_70%)] blur-3xl" />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6">
            <FadeIn className="w-full">
              <SignupPageContent selectedPlan={planParam} />
            </FadeIn>
          </div>
        </section>
      </main>
      <PageAnalytics page="signup" />
      <Footer />
    </div>
  );
}

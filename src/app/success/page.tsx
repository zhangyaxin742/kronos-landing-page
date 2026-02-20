import type { Metadata } from "next";

import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageAnalytics from "@/components/PageAnalytics";
import SuccessShare from "@/components/SuccessShare";
import { FadeIn } from "@/components/Motion";

export const metadata: Metadata = {
  title: "You're on the list - KRONOS",
  description:
    "You're on the KRONOS waitlist. We'll notify you the moment we launch.",
  openGraph: {
    title: "You're on the list - KRONOS",
    description: "We'll notify you the moment we launch.",
    url: "https://kronos.app/success",
  },
  robots: { index: false, follow: true },
};

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Home", href: "/" },
];

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-white)] text-[color:var(--color-black)]">
      <Navbar links={navLinks} ctaHref="/pricing" ctaLabel="View Pricing" homeHref="/" />
      <main className="pt-24">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-black-8),_transparent_70%)]" />
          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <FadeIn>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent-green)] text-2xl text-[color:var(--color-success)]">
                ✓
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
                You're on the list!
              </h1>
              <p className="mt-4 text-base text-[color:var(--color-gray-700)] sm:text-lg">
                We'll email you the moment KRONOS launches. Expect a premium
                onboarding experience and early access perks.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button href="/" variant="primary" size="lg">
                  Back to Home
                </Button>
                <Button href="/pricing" variant="secondary" size="lg">
                  Review Pricing
                </Button>
              </div>
              <SuccessShare />
            </FadeIn>
          </div>
        </section>
      </main>
      <PageAnalytics page="success" />
      <Footer />
    </div>
  );
}

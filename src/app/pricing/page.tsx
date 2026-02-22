import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageAnalytics from "@/components/PageAnalytics";
import FAQ from "@/components/FAQ";
import PricingSection from "@/components/PricingSection";
import { FadeIn } from "@/components/Motion";
import type { PricingTier } from "@/components/PricingCard";
import type { FAQItem } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Pricing — KRONOS | Start Free, Upgrade When Ready",
  description:
    "Simple, honest pricing for KRONOS. Free tier, Pro at $12/mo, Elite at $23/mo. 14-day free trial on Pro.",
  openGraph: {
    title: "Pricing — KRONOS",
    description:
      "Simple, honest pricing for KRONOS. Free tier, Pro at $12/mo, Elite at $23/mo.",
    url: "https://heykronos.com/pricing",
  },
};

const tiers: PricingTier[] = [
  {
    id: "free",
    name: "Starter",
    description: "Start building proof. Keep it honest.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { label: "Up to 3 moonshot goals", included: true },
      { label: "Daily check-ins", included: true },
      { label: "Basic timeblocking (7 days)", included: true },
      { label: "AI coaching (5 messages/day)", included: true },
      { label: "Unlimited goals", included: false },
      { label: "AI confrontation mode", included: false },
      { label: "Advanced analytics", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "The plan that calls you out and keeps you sharp.",
    monthlyPrice: 15,
    annualPrice: 12,
    features: [
      { label: "Unlimited moonshot goals", included: true },
      { label: "Daily check-ins", included: true },
      { label: "Full timeblocking suite", included: true },
      { label: "Unlimited AI coaching", included: true },
      { label: "AI confrontation mode", included: true },
      { label: "Screentime integration", included: true },
      { label: "Weekly progress reports", included: true },
      { label: "14-day free trial", included: true },
    ],
    cta: "Start Free Trial",
    recommended: true,
    badge: "Most Chosen",
    trialNote: "14-day free trial",
  },
  {
    id: "elite",
    name: "Elite",
    description: "For the few who want no ceiling.",
    monthlyPrice: 29,
    annualPrice: 23,
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Priority AI response time", included: true },
      { label: "Custom goal frameworks", included: true },
      { label: "Monthly 1:1 AI deep review", included: true },
      { label: "Early access to new features", included: true },
      { label: "Export all data (CSV, PDF)", included: true },
      { label: "Dedicated support", included: true },
    ],
    cta: "Go Elite",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How does the AI coach actually work?",
    answer:
      "You set moonshot goals. KRONOS tracks your execution — timeblocks completed, todos done, screentime. When there's a gap between what you said and what you did, it tells you. Directly.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "14 days on Pro, no credit card required. If it doesn't change how you work in two weeks, cancel without a conversation.",
  },
  {
    question: "Will the AI actually confront me?",
    answer:
      "Yes. That's the whole point. If your goal says \"ship the product\" but your calendar says \"2hrs of actual work this week,\" KRONOS will ask what happened.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Upgrade or downgrade anytime. Changes take effect at next billing cycle. Downgrades don't lose your data.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "All major credit cards via Stripe. Annual plans can be invoiced upon request.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your goals, timeblocks, and AI conversations are yours. We do not sell data. We do not train on your personal content without consent.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel anytime from your account settings. No email required, no retention flow, no dark patterns.",
  },
];

const navLinks = [
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
  { label: "Join", href: "/signup" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bone)] text-[color:var(--color-void)]">
      <Navbar
        links={navLinks}
        ctaHref="/signup?plan=pro"
        ctaLabel="Start Trial"
        homeHref="/"
      />
      <main className="pt-24">
        <section id="plans" className="py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-muted)]">
                PRICING
              </p>
              <h1
                className="mt-5 text-balance text-[var(--text-h1)] font-extrabold tracking-[-0.02em] text-[color:var(--color-void)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Simple. Honest. No gotchas.
              </h1>
              <p className="mt-5 max-w-2xl text-[var(--text-body-large)] text-[color:var(--color-mid-gray)]">
                The AI doesn't cost more when it works harder. Pick a plan. Start
                today.
              </p>
            </FadeIn>
            <PricingSection tiers={tiers} />
          </div>
        </section>
        <section id="faq" className="bg-[color:var(--color-white)] py-24">
          <div className="mx-auto w-full max-w-[720px] px-6">
            <FAQ items={faqs} />
          </div>
        </section>
        <section className="bg-[color:var(--color-charcoal)] py-24 text-[color:var(--color-white)]">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <h2
              className="text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Still deciding?
            </h2>
            <p className="mt-4 text-[18px] text-[color:var(--color-mid-gray)]">
              Start free. Upgrade when you're convinced.
            </p>
            <a
              href="/signup?plan=free"
              className="btn-primary mt-10 inline-flex min-h-[44px] items-center justify-center px-8 py-4 text-[16px] font-semibold"
            >
              Start Free — No Credit Card
            </a>
            <p className="mt-4 text-[13px] text-[color:var(--color-muted)]">
              Or compare plans above.
            </p>
          </div>
        </section>
      </main>
      <PageAnalytics page="pricing" />
      <Footer />
    </div>
  );
}

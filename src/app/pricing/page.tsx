import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageAnalytics from "@/components/PageAnalytics";
import PricingSection from "@/components/PricingSection";
import { FadeIn } from "@/components/Motion";
import type { PricingTier } from "@/components/PricingCard";
import type { FAQItem } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Pricing - KRONOS | Premium Timeblocking",
  description:
    "Simple, transparent pricing for KRONOS. Start free or go Pro for advanced features.",
  openGraph: {
    title: "KRONOS Pricing",
    description: "Choose the perfect plan for your productivity needs.",
    url: "https://heykronos.com/pricing",
  },
};

const tiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "Essential timeblocking for focused individuals.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { label: "Core timeblocking", included: true },
      { label: "Focus session presets", included: true },
      { label: "Calendar sync", included: true },
      { label: "Analytics dashboard", included: false },
      { label: "Team rituals", included: false },
      { label: "Priority support", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For high-performers who want every advantage.",
    monthlyPrice: 12,
    annualPrice: 115,
    features: [
      { label: "Everything in Free", included: true },
      { label: "Deep work analytics", included: true },
      { label: "Custom rituals", included: true },
      { label: "AI time optimization", included: true },
      { label: "Priority support", included: true },
      { label: "Team rituals", included: false },
    ],
    cta: "Start Free Trial",
    recommended: true,
    badge: "Most Popular",
  },
  {
    id: "team",
    name: "Team",
    description: "Align teams with shared time intelligence.",
    monthlyPrice: 8,
    annualPrice: 77,
    priceSuffix: "per user",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Team timeblocking", included: true },
      { label: "Shared rituals & templates", included: true },
      { label: "Workspace analytics", included: true },
      { label: "Admin controls", included: true },
      { label: "Dedicated success manager", included: true },
    ],
    cta: "Contact Sales",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Is there a free trial?",
    answer: "Yes. The Pro plan includes a 14-day trial with no credit card required.",
  },
  {
    question: "Can I change plans later?",
    answer: "Upgrade or downgrade anytime. Changes apply immediately with prorated billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "All major credit cards via Stripe. Enterprise plans can pay by invoice.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. We offer a 30-day money-back guarantee if you are not satisfied.",
  },
  {
    question: "What happens when my trial ends?",
    answer: "We will remind you three days before. Stay on Free or upgrade to Pro.",
  },
];

const navLinks = [
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
  { label: "Join", href: "/signup" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-white)] text-[color:var(--color-black)]">
      <Navbar
        links={navLinks}
        ctaHref="/signup?plan=pro"
        ctaLabel="Start Trial"
        homeHref="/"
      />
      <main className="pt-24">
        <section
          id="plans"
          className="relative overflow-hidden border-b border-[color:var(--color-black-5)] py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-black-8),_transparent_65%)]" />
          <div className="absolute -right-40 top-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_var(--color-black-10),_transparent_70%)] blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-gray-500)]">
                Pricing
              </p>
              <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Choose the plan that respects your time.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-[color:var(--color-gray-700)] sm:text-lg">
                Transparent pricing, premium craftsmanship, and a workflow that keeps
                every hour intentional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-[color:var(--color-gray-700)]">
                {[
                  "14-day Pro trial",
                  "Cancel anytime",
                  "30-day guarantee",
                  "No setup fees",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[color:var(--color-gray-100)] px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeIn>
            <PricingSection tiers={tiers} faqs={faqs} faqId="faq" />
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Designed for clarity, built for momentum.
              </h2>
              <p className="mt-4 text-base text-[color:var(--color-gray-700)] sm:text-lg">
                Every plan includes the core KRONOS experience: elegant timeblocking,
                rich analytics, and the calm confidence of always knowing what matters
                next.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Crystal-clear focus",
                  detail: "Ritual templates that cut decision fatigue.",
                },
                {
                  title: "Precision analytics",
                  detail: "See exactly where your time is going.",
                },
                {
                  title: "Team alignment",
                  detail: "Shared timeblocks that respect deep work.",
                },
                {
                  title: "Human support",
                  detail: "Concierge onboarding for Pro and Team.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-[var(--radius-lg)] border border-[color:var(--color-gray-200)] bg-[color:var(--color-white-90)] p-5 shadow-sm"
                >
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-gray-700)]">
                    {value.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PageAnalytics page="pricing" />
      <Footer />
    </div>
  );
}

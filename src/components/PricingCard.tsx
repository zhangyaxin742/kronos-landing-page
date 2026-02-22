"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/ui/Button";

type BillingPeriod = "monthly" | "annual";

export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingTier = {
  id: "free" | "pro" | "elite";
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PricingFeature[];
  cta: string;
  recommended?: boolean;
  badge?: string;
  trialNote?: string;
};

type PricingCardProps = {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
};

export default function PricingCard({ tier, billingPeriod }: PricingCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const price = billingPeriod === "annual" ? tier.annualPrice : tier.monthlyPrice;
  const periodLabel = tier.id === "free"
    ? "forever"
    : billingPeriod === "annual"
      ? "month, billed annually"
      : "month, billed monthly";

  const handleSelect = () => {
    if (isLoading) return;
    setIsLoading(true);
    track("pricing_cta_click", { plan: tier.id, billing: billingPeriod });
    router.push(`/signup?plan=${tier.id}`);
  };

  return (
    <div
      className={`relative flex h-full flex-col rounded-[var(--radius-xl)] border bg-[color:var(--color-white)] px-10 py-12 text-left transition duration-300 ${
        tier.recommended
          ? "border-2 border-[color:var(--color-void)] md:scale-[1.03]"
          : "border-[color:var(--color-light)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
      }`}
    >
      {tier.badge ? (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--color-void)] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--color-white)]">
          {tier.badge}
        </span>
      ) : null}
      <div>
        <h3
          className="text-[20px] font-semibold text-[color:var(--color-void)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {tier.name}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-mid-gray)]">
          {tier.description}
        </p>
      </div>
      <div className="mt-8">
        <div className="flex items-end gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${tier.id}-${billingPeriod}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[64px] font-extrabold tracking-[-0.03em] text-[color:var(--color-void)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ${price}
            </motion.span>
          </AnimatePresence>
          {tier.id !== "free" ? (
            <span className="pb-2 text-[16px] text-[color:var(--color-mid-gray)]">
              /month
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-[16px] text-[color:var(--color-mid-gray)]">
          {tier.id === "free" ? "/forever" : periodLabel}
        </p>
        {tier.trialNote ? (
          <p className="mt-2 text-[13px] italic text-[color:var(--color-crimson)]">
            {tier.trialNote}
          </p>
        ) : null}
      </div>
      <ul className="mt-8 flex flex-col">
        {tier.features.map((feature) => (
          <li
            key={feature.label}
            className={`flex items-center gap-3 py-2 text-[15px] ${
              feature.included
                ? "text-[color:var(--color-void)]"
                : "text-[color:var(--color-muted)]"
            } border-b border-[color:var(--color-light)] last:border-b-0`}
          >
            <span
              className="flex h-5 w-5 items-center justify-center"
              aria-hidden="true"
            >
              {feature.included ? (
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path
                    d="M4 10.5l3.5 3.5L16 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none">
                  <path
                    d="M5 10h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
      <Button
        variant="primary"
        size="lg"
        onClick={handleSelect}
        disabled={isLoading}
        aria-busy={isLoading}
        className="mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-white)] border-t-[color:var(--color-white)]" />
            Loading...
          </span>
        ) : (
          tier.cta
        )}
      </Button>
    </div>
  );
}

"use client";

import * as React from "react";

import PricingCard, { PricingTier } from "@/components/PricingCard";
import PricingToggle from "@/components/PricingToggle";
import FAQ, { FAQItem } from "@/components/FAQ";
import { Stagger } from "@/components/Motion";

type BillingPeriod = "monthly" | "annual";

type PricingSectionProps = {
  tiers: PricingTier[];
  faqs: FAQItem[];
  faqId?: string;
};

const STORAGE_KEY = "kronos-billing-period";

export default function PricingSection({
  tiers,
  faqs,
  faqId = "faq",
}: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] =
    React.useState<BillingPeriod>("annual");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "monthly" || stored === "annual") {
      setBillingPeriod(stored);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, billingPeriod);
  }, [billingPeriod]);

  return (
    <div className="mt-12">
      <PricingToggle value={billingPeriod} onChange={setBillingPeriod} />
      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingPeriod={billingPeriod}
          />
        ))}
      </Stagger>
      <div id={faqId}>
        <FAQ items={faqs} className="mt-16" />
      </div>
    </div>
  );
}

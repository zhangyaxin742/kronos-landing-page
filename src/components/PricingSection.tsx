"use client";

import * as React from "react";
import { track } from "@vercel/analytics";

import PricingCard, { PricingTier } from "@/components/PricingCard";
import PricingToggle from "@/components/PricingToggle";
import { Stagger } from "@/components/Motion";

type BillingPeriod = "monthly" | "annual";

type PricingSectionProps = {
  tiers: PricingTier[];
};

const STORAGE_KEY = "kronos-billing-period";

export default function PricingSection({
  tiers,
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

  const handleToggle = (value: BillingPeriod) => {
    setBillingPeriod(value);
    track("billing_toggle", { mode: value });
  };

  return (
    <div className="mt-12">
      <div className="flex justify-center">
        <PricingToggle value={billingPeriod} onChange={handleToggle} />
      </div>
      <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingPeriod={billingPeriod}
          />
        ))}
      </Stagger>
    </div>
  );
}

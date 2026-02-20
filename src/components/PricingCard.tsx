"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

import Button from "@/components/ui/Button";

type BillingPeriod = "monthly" | "annual";

export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingTier = {
  id: "free" | "pro" | "team";
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  priceSuffix?: string;
  features: PricingFeature[];
  cta: string;
  recommended?: boolean;
  badge?: string;
};

type PricingCardProps = {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
};

export default function PricingCard({ tier, billingPeriod }: PricingCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const price = billingPeriod === "annual" ? tier.annualPrice : tier.monthlyPrice;
  const periodLabel = billingPeriod === "annual" ? "year" : "month";
  const suffix = tier.priceSuffix ? ` ${tier.priceSuffix}` : "";

  const handleSelect = () => {
    if (isLoading) return;
    setIsLoading(true);
    track("pricing_cta_click", { plan: tier.id, billing: billingPeriod });
    router.push(`/signup?plan=${tier.id}`);
  };

  return (
    <div
      className={`relative flex h-full flex-col rounded-[var(--radius-lg)] border bg-[color:var(--color-white-90)] p-8 text-left shadow-sm backdrop-blur transition duration-300 ${
        tier.recommended
          ? "border-[color:var(--color-black)] shadow-[var(--shadow-soft)] md:-translate-y-2"
          : "border-[color:var(--color-gray-200)] hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
      }`}
    >
      {tier.badge ?
        (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--color-black)] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-white)]">
            {tier.badge}
          </span>
        ) : null}
      <div>
        <h3 className="text-xl font-semibold text-[color:var(--color-black)]">
          {tier.name}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-gray-500)]">
          {tier.description}
        </p>
      </div>
      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-extrabold tracking-tight text-[color:var(--color-black)]">
          ${price}
        </span>
        <span className="pb-1 text-sm text-[color:var(--color-gray-500)]">
          /{periodLabel}{suffix}
        </span>
      </div>
      <ul className="mt-8 flex flex-col gap-3 text-sm text-[color:var(--color-gray-700)]">
        {tier.features.map((feature) => (
          <li
            key={feature.label}
            className={`flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-1 ${
              feature.included
                ? ""
                : "text-[color:var(--color-gray-500)]"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                feature.included
                  ? "bg-[color:var(--accent-green)] text-[color:var(--color-black)]"
                  : "bg-[color:var(--color-gray-100)] text-[color:var(--color-gray-500)]"
              }`}
              aria-hidden="true"
            >
              {feature.included ? "✓" : "—"}
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
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-white-60)] border-t-[color:var(--color-white)]" />
            Loading...
          </span>
        ) : (
          tier.cta
        )}
      </Button>
    </div>
  );
}

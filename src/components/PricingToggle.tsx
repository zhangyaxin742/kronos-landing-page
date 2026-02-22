"use client";

import * as React from "react";

type BillingPeriod = "monthly" | "annual";

type PricingToggleProps = {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
};

export default function PricingToggle({
  value,
  onChange,
}: PricingToggleProps) {
  const isAnnual = value === "annual";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 text-sm font-semibold">
        <span
          className={`transition-colors ${
            !isAnnual
              ? "text-[color:var(--color-void)]"
              : "text-[color:var(--color-muted)]"
          }`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle billing period"
          onClick={() => onChange(isAnnual ? "monthly" : "annual")}
          className={`relative h-8 w-16 rounded-full border border-[color:var(--color-light)] transition ${
            isAnnual ? "bg-[color:var(--color-void)]" : "bg-[color:var(--color-white)]"
          }`}
        >
          <span
            className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-[color:var(--color-white)] transition-transform duration-300 ${
              isAnnual ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`flex items-center gap-2 transition-colors ${
            isAnnual
              ? "text-[color:var(--color-void)]"
              : "text-[color:var(--color-muted)]"
          }`}
        >
          Annual
          <span className="rounded-full bg-[color:var(--color-crimson)] px-2 py-0.5 text-[12px] font-semibold text-[color:var(--color-white)]">
            Save 20%
          </span>
        </span>
      </div>
    </div>
  );
}

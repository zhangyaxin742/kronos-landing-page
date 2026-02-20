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
      <div className="flex items-center gap-4 text-sm font-semibold text-[color:var(--color-gray-500)]">
        <span
          className={`transition-colors ${
            !isAnnual ? "text-[color:var(--color-black)]" : ""
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
          className="relative h-8 w-14 rounded-full border border-[color:var(--color-gray-200)] bg-[color:var(--color-white)] shadow-inner transition"
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-[color:var(--color-black)] transition-transform duration-300 ${
              isAnnual ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`flex items-center gap-2 transition-colors ${
            isAnnual ? "text-[color:var(--color-black)]" : ""
          }`}
        >
          Annual
          <span className="rounded-full bg-[color:var(--color-black)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-white)]">
            Save 20%
          </span>
        </span>
      </div>
    </div>
  );
}

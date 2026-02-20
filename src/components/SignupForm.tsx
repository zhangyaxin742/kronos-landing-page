"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

import Button from "@/components/ui/Button";
import { validateEmail, validateName } from "@/lib/validation";

type PlanOption = {
  value: "free" | "pro" | "team";
  label: string;
  price: string;
};

const PLAN_OPTIONS: PlanOption[] = [
  { value: "free", label: "KRONOS Free", price: "$0/month" },
  { value: "pro", label: "KRONOS Pro", price: "$12/month" },
  { value: "team", label: "KRONOS Team", price: "$8/user/month" },
];

const normalizePlan = (plan?: string): PlanOption => {
  const matched = PLAN_OPTIONS.find((option) => option.value === plan);
  return matched ?? PLAN_OPTIONS[0];
};

type SignupFormProps = {
  selectedPlan?: string;
};

export default function SignupForm({ selectedPlan }: SignupFormProps) {
  const router = useRouter();
  const initialPlan = normalizePlan(selectedPlan);
  const [plan, setPlan] = React.useState<PlanOption>(initialPlan);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [touched, setTouched] = React.useState({ email: false, name: false });
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    setPlan(normalizePlan(selectedPlan));
  }, [selectedPlan]);

  React.useEffect(() => {
    const loadCount = async () => {
      try {
        const response = await fetch("/api/waitlist/count");
        if (!response.ok) return;
        const data = (await response.json()) as { count: number };
        setWaitlistCount(data.count);
      } catch {
        setWaitlistCount(null);
      }
    };

    loadCount();
  }, []);

  const emailValid = validateEmail(email);
  const nameValid = validateName(name);
  const showEmailError = (touched.email || submitAttempted) && !emailValid;
  const showNameError = (touched.name || submitAttempted) && !nameValid;
  const isFormValid = emailValid && nameValid;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!isFormValid) return;

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          plan: plan.value,
          company: company || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      track("waitlist_signup", { plan: plan.value });
      router.push("/success");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[480px] rounded-[var(--radius-lg)] border border-[color:var(--color-black-8)] bg-[color:var(--color-white-90)] p-10 shadow-[var(--shadow-soft)] backdrop-blur"
    >
      <h1 className="text-center text-3xl font-bold text-[color:var(--color-black)]">
        Get Early Access
      </h1>
      <p className="mt-2 text-center text-sm text-[color:var(--color-gray-500)]">
        Join the KRONOS waitlist
      </p>

      {plan.value !== "free" ? (
        <div className="mt-6 rounded-[var(--radius-md)] bg-[color:var(--color-gray-100)] px-4 py-3 text-sm">
          Signing up for: <span className="font-semibold">{plan.label}</span>
          <span className="ml-2 text-[color:var(--color-gray-500)]">
            {plan.price}
          </span>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-6">
        <div>
          <label
            htmlFor="plan"
            className="text-sm font-semibold text-[color:var(--color-black)]"
          >
            Plan
          </label>
          <select
            id="plan"
            value={plan.value}
            onChange={(event) =>
              setPlan(normalizePlan(event.target.value))
            }
            className="mt-2 w-full rounded-[var(--radius-md)] border border-[color:var(--color-gray-200)] bg-[color:var(--color-white)] px-4 py-3 text-base text-[color:var(--color-black)] transition focus:border-[color:var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-focus)]"
          >
            {PLAN_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-[color:var(--color-black)]"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder="email@example.com"
              aria-invalid={showEmailError}
              required
              className={`mt-2 w-full rounded-[var(--radius-md)] border px-4 py-3 text-base transition focus:outline-none focus:ring-2 ${
                showEmailError
                  ? "border-[color:var(--color-error)] focus:ring-[color:var(--color-error)]"
                  : "border-[color:var(--color-gray-200)] focus:border-[color:var(--color-black)] focus:ring-[color:var(--color-focus)]"
              }`}
            />
            {emailValid && email ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-success)]">
                ✓
              </span>
            ) : null}
          </div>
          {showEmailError ? (
            <p className="mt-2 text-sm text-[color:var(--color-error)]">
              Please enter a valid email.
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-[color:var(--color-black)]"
          >
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              placeholder="Your name"
              aria-invalid={showNameError}
              required
              className={`mt-2 w-full rounded-[var(--radius-md)] border px-4 py-3 text-base transition focus:outline-none focus:ring-2 ${
                showNameError
                  ? "border-[color:var(--color-error)] focus:ring-[color:var(--color-error)]"
                  : "border-[color:var(--color-gray-200)] focus:border-[color:var(--color-black)] focus:ring-[color:var(--color-focus)]"
              }`}
            />
            {nameValid && name ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-success)]">
                ✓
              </span>
            ) : null}
          </div>
          {showNameError ? (
            <p className="mt-2 text-sm text-[color:var(--color-error)]">
              Name must be at least 2 characters.
            </p>
          ) : null}
        </div>

        {plan.value === "team" ? (
          <div>
            <label
              htmlFor="company"
              className="text-sm font-semibold text-[color:var(--color-black)]"
            >
              Company (optional)
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Company name"
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[color:var(--color-gray-200)] px-4 py-3 text-base transition focus:border-[color:var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-focus)]"
            />
          </div>
        ) : null}
      </div>

      {submitError ? (
        <div
          role="alert"
          className="mt-6 rounded-[var(--radius-md)] bg-[color:var(--accent-red)] px-4 py-3 text-sm text-[color:var(--color-error)]"
        >
          {submitError}
        </div>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!isFormValid || loading}
        className="mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-white-60)] border-t-[color:var(--color-white)]" />
            Joining...
          </span>
        ) : (
          "Join Waitlist"
        )}
      </Button>

      <p className="mt-4 text-center text-sm text-[color:var(--color-gray-500)]">
        🔒 We respect your privacy. Unsubscribe anytime.
      </p>

      {waitlistCount !== null ? (
        <p className="mt-3 text-center text-xs text-[color:var(--color-gray-500)]">
          Join {waitlistCount.toLocaleString()} others on the waitlist
        </p>
      ) : null}
    </form>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

import Button from "@/components/ui/Button";
import { validateEmail, validateName, validatePassword } from "@/lib/validation";

type PlanOption = {
  value: "free" | "pro" | "elite";
  label: string;
  price: string;
  trialNote?: string;
};

const PLAN_OPTIONS: PlanOption[] = [
  { value: "free", label: "KRONOS Free", price: "$0/month" },
  { value: "pro", label: "KRONOS Pro", price: "$12/month", trialNote: "14-day trial" },
  { value: "elite", label: "KRONOS Elite", price: "$23/month" },
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
  const plan = React.useMemo(
    () => normalizePlan(selectedPlan),
    [selectedPlan]
  );
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [touched, setTouched] = React.useState({
    email: false,
    name: false,
    password: false,
  });
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = React.useState<number | null>(null);
  const [formStarted, setFormStarted] = React.useState(false);

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
  const passwordValid = validatePassword(password);
  const showEmailError = (touched.email || submitAttempted) && !emailValid;
  const showNameError = (touched.name || submitAttempted) && !nameValid;
  const showPasswordError =
    (touched.password || submitAttempted) && !passwordValid;
  const isFormValid = emailValid && nameValid && passwordValid;
  const submitLabel = plan.value === "free" ? "Join Waitlist" : "Start Free Trial";

  const handleStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    track("signup_form_start");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!isFormValid) return;

    setLoading(true);
    track("signup_form_submit", { plan: plan.value });

    try {
      window.localStorage.setItem("kronos_signup_email", email);
    } catch {
      // Ignore storage errors
    }
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          plan: plan.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      track("signup_form_success", { plan: plan.value });
      router.push("/success");
    } catch (error) {
      track("signup_form_error", { reason: "submit_failed" });
      setSubmitError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-card">
      {selectedPlan ? (
        <div className="plan-badge">
          Signing up for: <strong>{plan.label}</strong> · {plan.price}
          {plan.trialNote ? ` · ${plan.trialNote}` : ""}
        </div>
      ) : null}

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-[color:var(--color-void)]">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              onFocus={handleStart}
              placeholder="you@example.com"
              aria-invalid={showEmailError}
              required
              className={`form-input mt-2 ${
                showEmailError ? "error" : emailValid && email ? "valid" : ""
              }`}
            />
            {emailValid && email ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#2D7A4F]">
                ✓
              </span>
            ) : null}
          </div>
          {showEmailError ? (
            <p className="mt-2 text-[13px] text-[color:var(--color-alert)]">
              Please enter a valid email.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-semibold text-[color:var(--color-void)]">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              onFocus={handleStart}
              placeholder="Your name"
              aria-invalid={showNameError}
              required
              className={`form-input mt-2 ${
                showNameError ? "error" : nameValid && name ? "valid" : ""
              }`}
            />
            {nameValid && name ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#2D7A4F]">
                ✓
              </span>
            ) : null}
          </div>
          {showNameError ? (
            <p className="mt-2 text-[13px] text-[color:var(--color-alert)]">
              Name must be at least 2 characters.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-semibold text-[color:var(--color-void)]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              onFocus={handleStart}
              placeholder="Password"
              aria-invalid={showPasswordError}
              required
              className={`form-input mt-2 ${
                showPasswordError
                  ? "error"
                  : passwordValid && password
                    ? "valid"
                    : ""
              }`}
            />
            {passwordValid && password ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#2D7A4F]">
                ✓
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-[12px] text-[color:var(--color-muted)]">
            Min 8 characters, 1 uppercase, 1 number
          </p>
          {showPasswordError ? (
            <p className="mt-2 text-[13px] text-[color:var(--color-alert)]">
              Password must meet the requirements.
            </p>
          ) : null}
        </div>
      </div>

      {submitError ? (
        <div role="alert" className="submit-error">
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
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-white)] border-t-[color:var(--color-white)]" />
            Joining...
          </span>
        ) : (
          submitLabel
        )}
      </Button>

      <p className="mt-4 text-center text-[13px] text-[color:var(--color-muted)]">
        We don't sell your data. We don't spam. Unsubscribe anytime.
      </p>

      {waitlistCount !== null ? (
        <p className="mt-6 text-center text-[14px] text-[color:var(--color-mid-gray)]">
          Join {waitlistCount.toLocaleString()}+ others who stopped settling.
        </p>
      ) : null}

      <p className="mt-4 text-center text-[14px] text-[color:var(--color-mid-gray)]">
        Already have an account?{" "}
        <a href="/signup" className="text-[color:var(--color-void)] transition hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

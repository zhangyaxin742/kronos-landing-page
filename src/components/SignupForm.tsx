"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { z } from "zod";
import {
  type FieldErrors,
  type Resolver,
  useForm,
} from "react-hook-form";

import Button from "@/components/ui/Button";

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

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .refine((value) => !/\d/.test(value), {
      message: "Name must be at least 2 characters.",
    }),
  password: z
    .string()
    .min(8, "Password must meet the requirements.")
    .regex(/[A-Z]/, "Password must meet the requirements.")
    .regex(/\d/, "Password must meet the requirements."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const formResolver: Resolver<SignupFormValues> = async (values) => {
  const result = signupSchema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const fieldErrors = result.error.flatten().fieldErrors;
  const errors: FieldErrors<SignupFormValues> = {};

  if (fieldErrors.email?.[0]) {
    errors.email = { type: "validation", message: fieldErrors.email[0] };
  }

  if (fieldErrors.name?.[0]) {
    errors.name = { type: "validation", message: fieldErrors.name[0] };
  }

  if (fieldErrors.password?.[0]) {
    errors.password = {
      type: "validation",
      message: fieldErrors.password[0],
    };
  }

  return { values: {}, errors };
};

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
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = React.useState<number | null>(null);
  const [formStarted, setFormStarted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<SignupFormValues>({
    mode: "onBlur",
    resolver: formResolver,
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const values = watch();

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

  const showEmailError = Boolean(errors.email);
  const showNameError = Boolean(errors.name);
  const showPasswordError = Boolean(errors.password);
  const showEmailValid =
    Boolean(values.email) && touchedFields.email && !errors.email;
  const showNameValid = Boolean(values.name) && touchedFields.name && !errors.name;
  const showPasswordValid =
    Boolean(values.password) && touchedFields.password && !errors.password;
  const isFormValid = isValid;
  const submitLabel = plan.value === "free" ? "Join Waitlist" : "Start Free Trial";

  const handleStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    track("signup_form_start");
  };

  const onSubmit = async (data: SignupFormValues) => {
    setSubmitError(null);
    track("signup_form_submit", { plan: plan.value });

    try {
      window.localStorage.setItem("kronos_signup_email", data.email);
    } catch {
      // Ignore storage errors
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
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
    }
  };

  const onInvalid = () => {
    track("signup_form_error", { reason: "validation" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="signup-card">
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
              {...register("email")}
              onFocus={handleStart}
              placeholder="you@example.com"
              aria-invalid={showEmailError}
              required
              className={`form-input mt-2 ${showEmailError ? "error" : showEmailValid ? "valid" : ""}`}
            />
            {showEmailValid ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#2D7A4F]">
                ✓
              </span>
            ) : null}
          </div>
          {showEmailError ? (
            <p className="mt-2 text-[13px] text-[color:var(--color-alert)]">
              {errors.email?.message}
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
              {...register("name")}
              onFocus={handleStart}
              placeholder="Your name"
              aria-invalid={showNameError}
              required
              className={`form-input mt-2 ${showNameError ? "error" : showNameValid ? "valid" : ""}`}
            />
            {showNameValid ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#2D7A4F]">
                ✓
              </span>
            ) : null}
          </div>
          {showNameError ? (
            <p className="mt-2 text-[13px] text-[color:var(--color-alert)]">
              {errors.name?.message}
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
              {...register("password")}
              onFocus={handleStart}
              placeholder="Password"
              aria-invalid={showPasswordError}
              required
              className={`form-input mt-2 ${showPasswordError ? "error" : showPasswordValid ? "valid" : ""}`}
            />
            {showPasswordValid ? (
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
              {errors.password?.message}
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
        disabled={!isFormValid || isSubmitting}
        className="mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
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

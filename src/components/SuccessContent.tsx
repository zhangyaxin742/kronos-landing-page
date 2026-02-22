"use client";

import * as React from "react";

import Button from "@/components/ui/Button";
import SuccessShare from "@/components/SuccessShare";

export default function SuccessContent() {
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const storedEmail = window.localStorage.getItem("kronos_signup_email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch {
      setEmail(null);
    }
  }, []);

  const emailText = email ?? "your email";

  return (
    <div className="mx-auto w-full max-w-[640px] rounded-[var(--radius-xl)] border border-[color:var(--color-light)] bg-[color:var(--color-white)] px-10 py-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.07)]">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="mx-auto"
      >
        <path
          className="checkmark-path"
          d="M14 34l14 14 28-32"
          stroke="var(--color-crimson)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1
        className="mt-6 text-[clamp(40px,5vw,56px)] font-extrabold tracking-[-0.02em] text-[color:var(--color-void)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        You're in.
      </h1>
      <p className="mt-4 text-[18px] text-[color:var(--color-mid-gray)]">
        Check your email — we sent confirmation to {emailText}.
      </p>
      <p className="mt-3 text-[18px] text-[color:var(--color-mid-gray)]">
        KRONOS launches soon. You'll be first.
      </p>
      <Button href="/" variant="primary" size="lg" className="mt-10 px-10">
        Back to Home
      </Button>
      <div className="mt-10 border-t border-[color:var(--color-light)] pt-8">
        <SuccessShare />
      </div>
    </div>
  );
}

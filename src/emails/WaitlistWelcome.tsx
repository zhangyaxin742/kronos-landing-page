import * as React from "react";

type WaitlistWelcomeProps = {
  name: string;
  plan?: string;
};

export default function WaitlistWelcome({ name, plan }: WaitlistWelcomeProps) {
  const normalizedPlan = plan ? plan.toUpperCase() : "FREE";

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        color: "#161A1D",
        lineHeight: "1.6",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>You're in.</h1>
      <p style={{ margin: "0 0 12px" }}>Hey {name},</p>
      <p style={{ margin: "0 0 12px" }}>
        Your KRONOS waitlist spot is locked. You selected the {normalizedPlan} plan.
      </p>
      <p style={{ margin: "0 0 12px" }}>
        We'll email you the moment we launch. KRONOS launches soon, and you'll be
        first.
      </p>
      <p style={{ margin: "24px 0 0", fontSize: "14px", color: "#6B6B6B" }}>
        — Team KRONOS
      </p>
    </div>
  );
}

"use client";

import SignupForm from "@/components/SignupForm";

type SignupPageContentProps = {
  selectedPlan?: string;
};

export default function SignupPageContent({
  selectedPlan,
}: SignupPageContentProps) {
  return <SignupForm selectedPlan={selectedPlan} />;
}

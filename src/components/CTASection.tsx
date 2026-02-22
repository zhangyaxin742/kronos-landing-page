import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-[color:var(--color-charcoal)] py-24 text-[color:var(--color-white)] sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <h2
          className="text-[clamp(40px,4.5vw,56px)] font-extrabold tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stop lying to yourself about your goals.
        </h2>
        <p className="mt-6 max-w-xl text-[20px] text-[color:var(--color-mid-gray)]">
          You know what you're capable of. KRONOS just won't let you forget it.
        </p>
        <TrackedButton
          href={CTA_LINK}
          variant="primary"
          size="lg"
          eventName="cta_click"
          eventData={{ location: "final_cta" }}
          className="mt-16 px-14 py-5 text-[18px]"
        >
          Get Started
        </TrackedButton>
        <p className="mt-4 text-[13px] text-[color:var(--color-muted)]">
          14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

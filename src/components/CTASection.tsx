import Button from "@/components/ui/Button";
import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-[color:var(--color-black)] py-24 text-[color:var(--color-white)] sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-white-60)]">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Ready to unf*ck your life?
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-white-70)] sm:text-lg">
            Meet the AI coach that calls you out, tracks your moonshots, and
            forces the execution layer to match your ambition.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <TrackedButton
            href={CTA_LINK}
            variant="primary"
            size="lg"
            eventName="cta_click"
            eventData={{ location: "cta_section" }}
          >
            Get Started
          </TrackedButton>
          <Button href="#showcase" variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

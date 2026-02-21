import Image from "next/image";

import Button from "@/components/ui/Button";
import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--color-white)] pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-black-8),_transparent_60%)]" />
      <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_var(--color-black-8),_transparent_70%)] blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-gray-500)]">
          AI life coach
        </p>
        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-[color:var(--color-black)] sm:text-5xl lg:text-7xl">
          Always seek the asymmetric outcome.
          <span className="mt-3 block text-2xl font-semibold text-[color:var(--color-gray-700)] sm:text-3xl">
            For the unreasonably ambitious.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-[color:var(--color-gray-700)] sm:text-xl">
          AI life coach that won't let you settle. Set moonshot goals. Get
          confronted when you fall short. Unf*ck your life.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <TrackedButton
            href={CTA_LINK}
            variant="inverse"
            size="lg"
            eventName="cta_click"
            eventData={{ location: "hero" }}
          >
            Get Started
          </TrackedButton>
          <Button href="#showcase" size="lg" variant="secondary">
            View Demo
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[color:var(--color-gray-700)]">
          <span className="rounded-full bg-[color:var(--accent-blue)] px-3 py-1">Brutal Honesty</span>
          <span className="rounded-full bg-[color:var(--accent-green)] px-3 py-1">Moonshot Goals</span>
          <span className="rounded-full bg-[color:var(--accent-purple)] px-3 py-1">Daily Check-ins</span>
          <span className="rounded-full bg-[color:var(--accent-yellow)] px-3 py-1">Smart Execution</span>
          <span className="rounded-full bg-[color:var(--accent-orange)] px-3 py-1">AI Confrontation</span>
          <span className="rounded-full bg-[color:var(--accent-red)] px-3 py-1">Timeblocking</span>
        </div>
        <div className="float-panel mt-12 w-full max-w-5xl rounded-[24px] border border-[color:var(--color-gray-200)] bg-[color:var(--color-white-90)] p-4 shadow-[var(--shadow-strong)] backdrop-blur">
          <Image
            src="/mockup-dashboard.svg"
            alt="KRONOS AI coach dashboard showing moonshot goals, a confrontation thread, and execution timeblocks."
            width={1200}
            height={720}
            className="h-auto w-full rounded-[18px]"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="scroll-indicator" aria-hidden="true" />
      </div>
    </section>
  );
}

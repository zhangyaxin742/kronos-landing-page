"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, stagger } from "@/components/Motion";
import Button from "@/components/ui/Button";
import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [showIndicator, setShowIndicator] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--color-bone)] pt-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 text-center">
        <motion.div
          className="flex w-full flex-col items-center"
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : "initial"}
          animate={reduceMotion ? undefined : "animate"}
        >
          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-mid-gray)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            YOU, BUT BETTER.
          </motion.p>
          <motion.h1
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-6 text-balance text-[clamp(64px,8vw,96px)] font-extrabold leading-[1] tracking-[-0.03em] text-[color:var(--color-void)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Unf*ck your life.
          </motion.h1>
          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-6 max-w-2xl text-pretty text-[clamp(18px,2vw,22px)] text-[color:var(--color-mid-gray)]"
          >
            Win the asymmetric outcome.
          </motion.p>
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <TrackedButton
              href={CTA_LINK}
              variant="primary"
              size="lg"
              eventName="cta_click"
              eventData={{ location: "hero", plan: "none" }}
            >
              Get Started
            </TrackedButton>
            <Button href="#showcase" size="lg" variant="secondary">
              View Demo
            </Button>
          </motion.div>
          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-6 text-[14px] text-[color:var(--color-muted)]"
          >
            Brutal Honesty · Moonshot Goals · Daily Check-ins · Smart Execution ·
            AI Confrontation · Timeblocking
          </motion.p>
        </motion.div>
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          initial={reduceMotion ? undefined : "initial"}
          animate={reduceMotion ? undefined : "animate"}
          className="mt-12 w-full max-w-[1100px] rounded-[24px] border border-[color:var(--color-light)] bg-[color:var(--color-white)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
        >
          <Image
            src="/mockup-dashboard.svg"
            alt="KRONOS AI coach dashboard showing moonshot goals, a confrontation thread, and execution timeblocks."
            width={1200}
            height={720}
            className="h-auto w-full rounded-[18px]"
            priority
          />
        </motion.div>
      </div>
      {showIndicator ? (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="scroll-chevron h-6 w-6 text-[color:var(--color-light)]"
            fill="none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : null}
    </section>
  );
}

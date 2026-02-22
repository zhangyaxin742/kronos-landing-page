"use client";

import { motion, useReducedMotion } from "framer-motion";

import { sectionReveal } from "@/components/Motion";

export default function PainSection() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0 },
        viewport: { once: true },
      }
    : sectionReveal;

  return (
    <section className="bg-[color:var(--color-bone)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <motion.div
            initial={reveal.initial}
            whileInView={reveal.whileInView}
            viewport={reveal.viewport}
            transition={reveal.transition}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-crimson)]">
              THE PROBLEM
            </p>
            <h2
              className="mt-4 text-[var(--text-h2)] font-extrabold tracking-[-0.02em] text-[color:var(--color-void)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You already know what you're capable of.
            </h2>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-[color:var(--color-mid-gray)]">
              The plans are in your notes app. The goals are in your head. The
              excuses change weekly, but the gap between who you are and who you
              said you'd be — that stays constant.
              <br />
              <br />
              You don't need more motivation. You need someone to stop looking
              away.
            </p>
          </motion.div>
          <motion.div
            initial={reveal.initial}
            whileInView={reveal.whileInView}
            viewport={reveal.viewport}
            transition={reduceMotion ? reveal.transition : { ...reveal.transition, delay: 0.15 }}
          >
            <div className="rounded-[var(--radius-xl)] bg-[color:var(--color-charcoal)] p-8 text-[color:var(--color-white)] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                KRONOS
              </p>
              <div className="mt-6 rounded-[var(--radius-md)] border-l-[3px] border-[color:var(--color-crimson)] bg-[rgba(196,18,48,0.12)] px-5 py-4">
                <p className="text-[15px] leading-[1.6] text-[color:var(--color-white)]">
                  "You've rescheduled this goal 6 days in a row. Your screentime
                  is 94hrs this week. What is going on?"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

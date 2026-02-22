"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  className?: string;
  title?: string;
  description?: string;
  hideHeader?: boolean;
};

export default function FAQ({
  items,
  className = "",
  title = "Every question you're about to Google.",
  description,
  hideHeader = false,
}: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={className}>
      {!hideHeader ? (
        <>
          <h2
            className="text-[clamp(28px,3vw,32px)] font-semibold text-[color:var(--color-void)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[16px] text-[color:var(--color-mid-gray)]">
              {description}
            </p>
          ) : null}
        </>
      ) : null}
      <div className="mt-8">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-content-${index}`;

          return (
            <div
              key={item.question}
              className="border-b border-[color:var(--color-light)] py-6"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left text-[18px] font-semibold text-[color:var(--color-void)]"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center text-[20px] text-[color:var(--color-crimson)] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={contentId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-[16px] text-[color:var(--color-mid-gray)] leading-[1.65] pr-8">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type { FAQItem };

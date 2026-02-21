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
  title = "Frequently asked questions",
  description,
  hideHeader = false,
}: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[color:var(--color-gray-200)] bg-[color:var(--color-white-90)] p-8 shadow-sm backdrop-blur ${className}`.trim()}
    >
      {!hideHeader ? (
        <>
          <h2 className="text-2xl font-semibold text-[color:var(--color-black)]">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm text-[color:var(--color-gray-700)]">
              {description}
            </p>
          ) : null}
        </>
      ) : null}
      <div className="mt-6 divide-y divide-[color:var(--color-gray-200)]">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-content-${index}`;

          return (
            <div key={item.question} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left text-base font-medium text-[color:var(--color-black)]"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-gray-200)] text-lg transition-transform duration-300 ${
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
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-[color:var(--color-gray-700)]">
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

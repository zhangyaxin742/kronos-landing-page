import FAQ, { FAQItem } from "@/components/FAQ";
import { FadeIn } from "@/components/Motion";

const faqs: FAQItem[] = [
  {
    question: "How does the AI coach work?",
    answer:
      "KRONOS pairs moonshot goals with daily check-ins and execution data from your timeblocks to deliver blunt feedback and next steps.",
  },
  {
    question: "Will the AI actually confront me?",
    answer:
      "Yes. If you say you want X but your screentime is 100hrs/week, KRONOS will ask, ‘What is going on?’ That’s the point.",
  },
  {
    question: "Is timeblocking still included?",
    answer:
      "Absolutely. Timeblocking is the execution layer the coach monitors and tunes to keep momentum real.",
  },
  {
    question: "How many goals can I set?",
    answer:
      "Up to 10 active moonshot goals, each broken into milestones and action items you can track daily.",
  },
];

export default function LandingFAQ() {
  return (
    <section id="faq" className="bg-[color:var(--color-white)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gray-500)]">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[color:var(--color-black)] sm:text-4xl">
            Direct answers, no fluff.
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-gray-700)] sm:text-lg">
            KRONOS is built for people who want the truth, the plan, and the
            execution layer that actually sticks.
          </p>
        </FadeIn>
        <FAQ
          items={faqs}
          className="mt-12"
          hideHeader
        />
      </div>
    </section>
  );
}

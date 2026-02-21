import Image from "next/image";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="bg-[color:var(--color-white)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gray-500)]">
              Coach Demo
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[color:var(--color-black)] sm:text-4xl">
              See the AI coach in action.
            </h2>
            <p className="mt-4 text-base text-[color:var(--color-gray-700)] sm:text-lg">
              Goals, confrontations, and execution timeblocks live in the same
              command center so nothing slips past your intent.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[color:var(--color-gray-700)]">
            {[
              "AI check-ins",
              "Moonshot tracking",
              "Execution layer",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[color:var(--color-gray-200)] px-4 py-2"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-[color:var(--color-gray-200)] bg-[color:var(--color-gray-100)] p-4 shadow-[var(--shadow-strong)]">
          <Image
            src="/mockup-showcase.svg"
            alt="KRONOS dashboard showing AI coach prompts, moonshot goals, and execution timeblocks."
            width={1400}
            height={820}
            className="h-auto w-full rounded-[18px]"
          />
        </div>
        <p className="mt-6 text-sm italic text-[color:var(--color-gray-500)]">
          One surface for goal progress, confrontation notes, and the timeblocks
          that make it real.
        </p>
      </div>
    </section>
  );
}

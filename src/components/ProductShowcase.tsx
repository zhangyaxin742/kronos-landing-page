import Image from "next/image";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="bg-[color:var(--color-white)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gray-500)]">
              Product Demo
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[color:var(--color-black)] sm:text-4xl">
              See it in action.
            </h2>
            <p className="mt-4 text-base text-[color:var(--color-gray-700)] sm:text-lg">
              A clean, color-coded dashboard keeps you focused on what matters
              now while giving your week the structure it deserves.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[color:var(--color-gray-700)]">
            {[
              "Color-coded blocks",
              "Weekly overview",
              "Focus analytics",
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
            alt="KRONOS dashboard showing timeblocks across the day with accent colors and analytics panels."
            width={1400}
            height={820}
            className="h-auto w-full rounded-[18px]"
          />
        </div>
        <p className="mt-6 text-sm italic text-[color:var(--color-gray-500)]">
          A balanced view of the day, with insight tiles and adaptive focus
          blocks.
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="bg-[color:var(--color-white)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            SEE IT IN ACTION
          </p>
          <h2
            className="mt-4 text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.02em] text-[color:var(--color-void)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            No fluff. Just your data, laid bare.
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mid-gray)] sm:text-lg">
            The interface is quiet. The AI isn't.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-[color:var(--color-light)] bg-[color:var(--color-bone)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <Image
            src="/mockup-showcase.svg"
            alt="KRONOS dashboard showing AI coach prompts, moonshot goals, and execution timeblocks."
            width={1400}
            height={820}
            className="h-auto w-full rounded-[18px]"
          />
        </div>
        <p className="mt-6 text-center text-[15px] italic text-[color:var(--color-muted)]">
          KRONOS tracks what you commit to, not what you feel like doing that
          morning.
        </p>
      </div>
    </section>
  );
}

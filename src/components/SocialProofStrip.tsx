import { FadeIn } from "@/components/Motion";

const stats = ["10 Moonshot Goals", "Daily Accountability", "Zero Coddling"];

export default function SocialProofStrip() {
  return (
    <section className="border-y border-[color:var(--color-light)] bg-[color:var(--color-white)] py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p
              className="text-[22px] font-extrabold tracking-[-0.02em] text-[color:var(--color-void)] sm:text-[26px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2,400+ on the waitlist
            </p>
            <div
              className="flex flex-wrap items-center gap-3 text-[18px] font-semibold text-[color:var(--color-mid-gray)] sm:text-[22px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stats.map((stat, index) => (
                <span key={stat} className="flex items-center gap-3">
                  <span>{stat}</span>
                  {index < stats.length - 1 ? (
                    <span className="text-[color:var(--color-light)]">·</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

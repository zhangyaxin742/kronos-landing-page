import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    title: "AI Confrontation",
    description:
      "You said this was your #1 goal. Your timeblocks say otherwise. KRONOS won't let that slide.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
      >
        <path
          d="M8 4h8a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-3l-4 4v-4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 10h6M9 13h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Moonshot Goals",
    description:
      "Set 10 unreasonable goals for 12 months. Get execution plans built to the week. No vague intentions — just milestones and deadlines.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 4v2M20 12h-2M12 20v-2M4 12h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Timeblock Engine",
    description:
      "Drag. Drop. Track. Your calendar is your commitment. KRONOS knows when you're slipping before you do.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
      >
        <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 11h4M7 15h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[color:var(--color-charcoal)] py-24 text-[color:var(--color-white)] sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            HOW IT WORKS
          </p>
          <h2
            className="mt-4 text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your sparring partner. Your execution engine.
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mid-gray)] sm:text-lg">
            Set the goals. Get the confrontation. Ship the work.
          </p>
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <GlassCard className="flex h-full flex-col gap-6 p-12 text-[color:var(--color-white)]">
                <div className="text-[color:var(--color-crimson)]">{feature.icon}</div>
                <div>
                  <h3
                    className="text-[22px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-mid-gray)]">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

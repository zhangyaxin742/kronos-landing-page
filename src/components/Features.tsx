import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    title: "Brutal Honesty",
    description:
      "AI coach that confronts you when you're off track. No sugarcoating, just clarity.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
      >
        <path
          d="M12 5v3m0 8v3m7-7h-3M8 12H5m11.5-4.5l-2.1 2.1m-6.8 6.8-2.1 2.1m0-11 2.1 2.1m6.8 6.8 2.1 2.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Moonshot Goals",
    description:
      "Set 10 unreasonable goals for the next 12 months. KRONOS keeps you on pace.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
      >
        <path
          d="M12 3l2.2 4.5L19 8l-3.5 3.4.8 4.8L12 14.5 7.7 16.2l.8-4.8L5 8l4.8-.5L12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Smart Execution",
    description:
      "AI-integrated timeblocking turns intent into daily action. Drag, drop, deliver.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
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
      className="bg-[color:var(--color-black)] py-24 text-[color:var(--color-white)] sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-white-60)]">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Accountability at full volume.
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-white-70)] sm:text-lg">
            KRONOS blends confrontational coaching with moonshot planning and
            timeblocking that keeps you honest.
          </p>
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <GlassCard className="flex h-full flex-col gap-6 p-8 text-[color:var(--color-white)] transition duration-300 hover:bg-[color:var(--color-white-10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-white-20)] bg-[color:var(--color-white-5)] text-[color:var(--color-white)]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-white-70)]">
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

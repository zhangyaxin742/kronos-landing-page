import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    title: "Drag & Drop Flow",
    description:
      "Place timeblocks anywhere. Adjust duration instantly. Your schedule, your rules.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Focus Streaks",
    description:
      "Track deep work blocks and maintain momentum with adaptive focus cues.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
      >
        <path
          d="M4 12c2.5-4 5.5-6 8-6s5.5 2 8 6c-2.5 4-5.5 6-8 6s-5.5-2-8-6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Smart Insights",
    description:
      "See where your time goes and refine your weekly cadence with clarity.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
      >
        <path
          d="M6 18V9m6 9V6m6 12v-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 20h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
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
            Every minute, intentional.
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-white-70)] sm:text-lg">
            KRONOS combines premium design with powerful timeblocking so your
            calendar works as elegantly as you do.
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

import { FadeIn } from "@/components/Motion";

const testimonials = [
  {
    quote: "Shipped the side project I'd been 'planning' for 2 years. In 6 weeks.",
    name: "Maya Chen",
    role: "Founder, Signalstack",
    initials: "MC",
  },
  {
    quote: "My screentime confrontation was uncomfortable. That was the point.",
    name: "Jordan Hale",
    role: "Product Lead",
    initials: "JH",
  },
  {
    quote: "I stopped lying to myself about what I actually wanted.",
    name: "Priya Nair",
    role: "Creator & Operator",
    initials: "PN",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[color:var(--color-bone)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn>
          <h2
            className="text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.02em] text-[color:var(--color-void)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What happens when you can't lie to yourself anymore.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[color:var(--color-light)] bg-[color:var(--color-white)] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <p
                className="text-[20px] font-semibold text-[color:var(--color-void)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {testimonial.quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-charcoal)] text-sm font-semibold text-[color:var(--color-white)]">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--color-void)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[color:var(--color-mid-gray)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

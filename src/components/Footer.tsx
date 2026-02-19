import Image from "next/image";

import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter/X", href: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-white-10)] bg-[color:var(--color-black)] py-16 text-[color:var(--color-white)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <Image src="/logo.svg" alt="Kronos logo" width={32} height={32} />
              <span>KRONOS</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-[color:var(--color-white-70)]">
              Premium timeblocking for modern professionals. Build rituals,
              protect focus, and own your schedule.
            </p>
          </div>
          <TrackedButton
            href={CTA_LINK}
            variant="inverse"
            size="lg"
            eventName="cta_click"
            eventData={{ location: "footer" }}
          >
            Get Started
          </TrackedButton>
        </div>
        <div className="flex flex-col gap-6 border-t border-[color:var(--color-white-10)] pt-8 text-sm text-[color:var(--color-white-60)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[color:var(--color-white)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[color:var(--color-white)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p>© 2024 KRONOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

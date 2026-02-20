import Image from "next/image";

import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

type NavLink = {
  label: string;
  href: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
];

type NavbarProps = {
  links?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
  homeHref?: string;
};

export default function Navbar({
  links = defaultNavLinks,
  ctaHref = CTA_LINK,
  ctaLabel = "Get Started",
  homeHref = "#hero",
}: NavbarProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[color:var(--color-black-5)] bg-[color:var(--color-white-80)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:h-16">
        <a
          href={homeHref}
          className="flex items-center gap-3 text-lg font-semibold tracking-tight"
          aria-label="Kronos home"
        >
          <Image src="/logo.png" alt="Kronos logo" width={32} height={32} />
          <span className="leading-none">KRONOS</span>
        </a>
        <nav
          className="hidden items-center gap-8 text-sm font-medium text-[color:var(--color-gray-700)] md:flex"
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[color:var(--color-black)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <TrackedButton
            href={ctaHref}
            variant="inverse"
            size="lg"
            eventName="cta_click"
            eventData={{ location: "navbar" }}
          >
            {ctaLabel}
          </TrackedButton>
        </div>
        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-gray-200)] bg-[color:var(--color-white-90)] text-[color:var(--color-black)] shadow-sm transition hover:bg-[color:var(--color-gray-100)]">
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1">
              <span className="block h-px w-5 bg-[color:var(--color-black)] transition group-open:translate-y-[6px] group-open:rotate-45" />
              <span className="block h-px w-5 bg-[color:var(--color-black)] transition group-open:opacity-0" />
              <span className="block h-px w-5 bg-[color:var(--color-black)] transition group-open:-translate-y-[6px] group-open:-rotate-45" />
            </div>
          </summary>
          <div className="absolute right-0 mt-3 w-56 rounded-[var(--radius-lg)] border border-[color:var(--color-gray-200)] bg-[color:var(--color-white-95)] p-4 shadow-lg backdrop-blur-md">
            <div className="flex flex-col gap-3 text-sm font-medium text-[color:var(--color-gray-700)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--color-black)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <TrackedButton
              href={ctaHref}
              variant="inverse"
              size="lg"
              eventName="cta_click"
              eventData={{ location: "navbar_mobile" }}
              className="mt-4 w-full justify-center"
            >
              {ctaLabel}
            </TrackedButton>
          </div>
        </details>
      </div>
    </header>
  );
}

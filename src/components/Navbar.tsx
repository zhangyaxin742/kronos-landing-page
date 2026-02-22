"use client";

import * as React from "react";

import TrackedButton from "@/components/ui/TrackedButton";
import { CTA_LINK } from "@/lib/constants";

type NavLink = {
  label: string;
  href: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/pricing#faq" },
];

type NavbarProps = {
  links?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
  homeHref?: string;
  showCta?: boolean;
  showMenu?: boolean;
};

export default function Navbar({
  links = defaultNavLinks,
  ctaHref = CTA_LINK,
  ctaLabel = "Get Started",
  homeHref = "#hero",
  showCta = true,
  showMenu = true,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-200 ${
        isScrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:h-16">
        <a
          href={homeHref}
          className="flex items-center gap-3 text-[17px] font-semibold tracking-[-0.02em] text-[color:var(--color-void)]"
          aria-label="Kronos home"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="flex h-7 w-7 items-center justify-center text-[color:var(--color-crimson)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path
                d="M5 3h9l-3.5 6.5H18l-9 11 2.5-7H5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="leading-none">KRONOS</span>
        </a>
        {links.length ? (
          <nav
            className="hidden items-center gap-8 text-[14px] font-medium text-[color:var(--color-mid-gray)] md:flex"
            aria-label="Primary"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[color:var(--color-void)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
        {showCta ? (
          <div className="hidden md:block">
            <TrackedButton
              href={ctaHref}
              variant="primary"
              size="md"
              eventName="cta_click"
              eventData={{ location: "navbar" }}
              className="px-6 py-2 text-[14px]"
            >
              {ctaLabel}
            </TrackedButton>
          </div>
        ) : null}
        {showMenu ? (
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-light)] bg-[color:var(--color-bone)] text-[color:var(--color-void)] transition hover:bg-[color:var(--color-light)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`block h-px w-5 bg-[color:var(--color-void)] transition ${
                  isMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[color:var(--color-void)] transition ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[color:var(--color-void)] transition ${
                  isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        ) : null}
      </div>
      {showMenu ? (
        <div
          className={`fixed inset-0 z-[90] md:hidden ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-[rgba(0,0,0,0.25)] transition-opacity ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[color:var(--color-bone)] px-6 pb-10 pt-20 shadow-[-24px_0_80px_rgba(0,0,0,0.12)] transition-transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-6 text-[15px] font-medium text-[color:var(--color-void)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-[color:var(--color-light)] pb-3"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {showCta ? (
              <TrackedButton
                href={ctaHref}
                variant="primary"
                size="md"
                eventName="cta_click"
                eventData={{ location: "navbar_mobile" }}
                className="mt-8 w-full justify-center px-6 py-2 text-[15px]"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaLabel}
              </TrackedButton>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}

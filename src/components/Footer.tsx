const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 3a9 9 0 0 0-2.8 17.6c.4.1.6-.2.6-.5v-1.9c-2.5.5-3-1.1-3-1.1-.4-1-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.5 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.6 1a8.8 8.8 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.2.2 2.2.1 2.4.6.7 1 1.6 1 2.6 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .3.2.6.6.5A9 9 0 0 0 12 3z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-charcoal)] py-20 text-[color:var(--color-white)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-8 border-b border-[rgba(255,255,255,0.08)] pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div
              className="flex items-center gap-3 text-lg font-semibold tracking-[-0.02em]"
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
              <span>KRONOS</span>
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-mid-gray)]">
              No coddling. No excuses.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[color:var(--color-mid-gray)]">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[color:var(--color-white)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 text-sm text-[color:var(--color-mid-gray)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 KRONOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[color:var(--color-white)]"
                aria-label={link.label}
              >
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

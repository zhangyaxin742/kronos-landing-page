"use client";

import * as React from "react";

const SHARE_URL = "https://heykronos.com";
const SHARE_TEXT = "I just joined the KRONOS waitlist.";

export default function SuccessShare() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-10">
      <p className="text-sm font-semibold text-[color:var(--color-black)]">
        Share with friends
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            SHARE_TEXT
          )}&url=${encodeURIComponent(SHARE_URL)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[color:var(--color-gray-200)] px-4 py-2 text-xs font-semibold text-[color:var(--color-gray-700)] transition hover:border-[color:var(--color-black)] hover:text-[color:var(--color-black)]"
        >
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            SHARE_URL
          )}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[color:var(--color-gray-200)] px-4 py-2 text-xs font-semibold text-[color:var(--color-gray-700)] transition hover:border-[color:var(--color-black)] hover:text-[color:var(--color-black)]"
        >
          Share on LinkedIn
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-[color:var(--color-gray-200)] px-4 py-2 text-xs font-semibold text-[color:var(--color-gray-700)] transition hover:border-[color:var(--color-black)] hover:text-[color:var(--color-black)]"
        >
          {copied ? "Link Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

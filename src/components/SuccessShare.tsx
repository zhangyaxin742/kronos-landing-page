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
    <div>
      <p className="text-sm font-semibold text-[color:var(--color-void)]">
        Tell a friend who needs this.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            SHARE_TEXT
          )}&url=${encodeURIComponent(SHARE_URL)}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary inline-flex min-h-[44px] items-center justify-center px-4 py-2 text-xs font-semibold"
        >
          Share on X
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary inline-flex min-h-[44px] items-center justify-center px-4 py-2 text-xs font-semibold"
        >
          {copied ? "Link Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

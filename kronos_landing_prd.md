# KRONOS — Master Product Requirements Document
### Landing Page · Pricing Page · Signup / Waitlist · Success Page
**v2.0 — Single Source of Truth**

> This document supersedes `KRONOS_Landing_Page_PRD.md` and `KRONOS_Pricing_Signup_PRD.md`. All color, typography, spacing, motion, and copy decisions are governed first by the **KRONOS Brand & Design Bible v1.0**, then by this document, then by implementation judgment. Any conflict between old PRD values and the Bible is resolved in favor of the Bible. No exceptions.

---

## Table of Contents

1. [Design System Authority](#1-design-system-authority)
2. [Technology Stack](#2-technology-stack)
3. [File Structure](#3-file-structure)
4. [Global Components](#4-global-components)
5. [Page 1 — Landing Page (`/`)](#5-page-1--landing-page-)
6. [Page 2 — Pricing (`/pricing`)](#6-page-2--pricing-pricing)
7. [Page 3 — Signup / Waitlist (`/signup`)](#7-page-3--signup--waitlist-signup)
8. [Page 4 — Success (`/success`)](#8-page-4--success-success)
9. [API Routes](#9-api-routes)
10. [Performance & SEO](#10-performance--seo)
11. [Accessibility](#11-accessibility)
12. [Analytics & Tracking](#12-analytics--tracking)
13. [Acceptance Criteria](#13-acceptance-criteria)
14. [Anti-Patterns & Kill List (Enforced)](#14-anti-patterns--kill-list-enforced)

---

## 1. Design System Authority

### 1.1 Design Tokens (CSS Custom Properties)

These are the only permitted color values across all pages. Any hex value not in this table is a violation.

```css
:root {
  /* ─── Colors ─────────────────────────────────── */
  --color-void:       #000000;   /* Wordmark, headlines on light */
  --color-charcoal:   #161A1D;   /* Dark section backgrounds */
  --color-mid-gray:   #6B6B6B;   /* Secondary text, metadata */
  --color-muted:      #848484;   /* Placeholders, captions */
  --color-light:      #E8E8E8;   /* Borders, dividers, card borders */
  --color-bone:       #F5F3F4;   /* PRIMARY page background — never pure white */
  --color-white:      #FFFFFF;   /* Card surfaces, text on dark */
  --color-alert:      #E5383B;   /* Validation errors only — extreme restraint */
  --color-crimson:    #C41230;   /* PRIMARY ACCENT — CTAs, active states */
  --color-deep-red:   #96031A;   /* Hover/pressed state of crimson */

  /* ─── Typography ──────────────────────────────── */
  --font-display:     'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif;
  --font-body:        'Inter', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;

  --text-h1:          clamp(56px, 6vw, 72px);
  --text-h2:          clamp(40px, 4.5vw, 48px);
  --text-h3:          clamp(28px, 3vw, 32px);
  --text-body-large:  clamp(20px, 2vw, 24px);
  --text-body:        clamp(16px, 1.5vw, 18px);
  --text-label:       14px;
  --text-caption:     12px;

  /* ─── Spacing (Rule of 8) ──────────────────────── */
  --space-1:   4px;    --space-2:   8px;    --space-3:   12px;
  --space-4:   16px;   --space-5:   20px;   --space-6:   24px;
  --space-8:   32px;   --space-10:  40px;   --space-12:  48px;
  --space-16:  64px;   --space-20:  80px;   --space-24:  96px;
  --space-30:  120px;

  /* ─── Border Radius ────────────────────────────── */
  --radius-sm:    6px;    --radius-md:    8px;
  --radius-lg:    12px;   --radius-xl:    16px;
  --radius-2xl:   24px;   --radius-full:  100px;

  /* ─── Transitions ──────────────────────────────── */
  --transition-fast:   0.15s ease;
  --transition-base:   0.25s ease;
  --transition-slow:   0.5s ease;
}
```

### 1.2 Typography Rules

| Role | Font Family | Weight | Size | Notes |
|---|---|---|---|---|
| Display headings (H1–H2) | Plus Jakarta Sans | 800 | `--text-h1` / `--text-h2` | Tight letter-spacing: -0.02em |
| Section headings (H3) | Plus Jakarta Sans | 700 | `--text-h3` | Letter-spacing: -0.01em |
| Body large | Inter | 400 | `--text-body-large` | Line-height: 1.6 |
| Body | Inter | 400 | `--text-body` | Line-height: 1.65 |
| Labels / metadata | Inter | 500–600 | `--text-label` | Uppercase + tracked for categories |
| Captions | Inter | 400 | `--text-caption` | `--color-muted` |

**Rule:** Plus Jakarta Sans for anything emotional or expressive. Inter for anything functional or readable. Below 20px: always Inter.

### 1.3 Button Specifications

```css
/* ── Primary CTA ───────────────────────────── */
.btn-primary {
  background:    var(--color-crimson);
  color:         var(--color-white);
  padding:       16px 40px;
  border-radius: var(--radius-md);
  font-family:   var(--font-body);
  font-size:     16px;
  font-weight:   600;
  border:        none;
  cursor:        pointer;
  transition:    background var(--transition-fast),
                 transform var(--transition-fast),
                 box-shadow var(--transition-fast);
}
.btn-primary:hover {
  background:  var(--color-deep-red);
  transform:   translateY(-2px);
  box-shadow:  0 8px 24px rgba(196, 18, 48, 0.25);
}
.btn-primary:active { transform: translateY(0); }

/* ── Secondary (outlined, dark bg contexts) ── */
.btn-secondary {
  background:    transparent;
  color:         var(--color-void);
  border:        1.5px solid var(--color-void);
  padding:       14px 38px;
  border-radius: var(--radius-md);
  font-size:     16px;
  font-weight:   600;
  transition:    background var(--transition-fast),
                 color var(--transition-fast);
}
.btn-secondary:hover {
  background: var(--color-void);
  color:      var(--color-white);
}

/* ── Ghost (white outline, on dark sections) ─ */
.btn-ghost {
  background:    transparent;
  color:         var(--color-white);
  border:        1.5px solid rgba(255,255,255,0.35);
  padding:       14px 38px;
  border-radius: var(--radius-md);
  font-size:     16px;
  font-weight:   600;
  transition:    border-color var(--transition-fast),
                 background var(--transition-fast);
}
.btn-ghost:hover {
  border-color: var(--color-white);
  background:   rgba(255,255,255,0.08);
}
```

> **⚠️ Design Bible Correction:** Previous PRDs specified black (`#000000`) as primary CTA background. Per the Brand Design Bible v1.0, `--color-crimson` (`#C41230`) is the primary CTA color. **The nav "Get Started" button and all primary page CTAs must use crimson.** The nav appears black in the v1 screenshot — this is a known deviation that must be corrected in v2.

### 1.4 Glassmorphism (Conditional — Bible Enforced)

Glass effects are **only permitted in two contexts:**
1. Cards or UI elements sitting on a `--color-charcoal` dark section background
2. The navigation bar **after scroll** (when a background is needed)

```css
/* On dark (#161A1D) backgrounds only */
.glass-card {
  background:        rgba(255, 255, 255, 0.04);
  backdrop-filter:   blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border:            1px solid rgba(255, 255, 255, 0.08);
  box-shadow:        0 8px 32px rgba(0, 0, 0, 0.3);
  border-radius:     var(--radius-xl);
}

/* Nav on scroll — light context */
.nav-scrolled {
  background:      rgba(245, 243, 244, 0.85);
  backdrop-filter: blur(12px);
  border-bottom:   1px solid var(--color-light);
}
```

### 1.5 Animation (Framer Motion — Bible Enforced)

```typescript
// Fade up — standard entrance
export const fadeUp = {
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
};

// Staggered children container
export const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

// Section reveal (Intersection Observer trigger)
export const sectionReveal = {
  initial:   { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};
```

**Motion rules from the Bible:**
- Ease curves: `cubic-bezier(0.25, 0.1, 0.25, 1)` — purposeful, not bouncy
- No looping animations. No bounce physics. No spring on web.
- Animate once on mount/scroll — not on repeat
- All motion must guide eye movement toward the CTA or key copy

---

## 2. Technology Stack

```
Framework:   Next.js 14+ (App Router)
Language:    TypeScript (strict mode)
Styling:     Tailwind CSS + CSS Custom Properties (design tokens above)
Animations:  Framer Motion
Fonts:       Google Fonts — Plus Jakarta Sans (800), Inter (400, 500, 600)
Forms:       Resend (primary) / Formspree (fallback)
Validation:  Zod + react-hook-form
Analytics:   Vercel Analytics + custom event tracking
Hosting:     Vercel
Images:      Next.js <Image> — WebP, responsive srcSet, lazy below fold
```

**Performance Budget:**
- Lighthouse Performance ≥ 95
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.5s
- JS bundle (gzipped) < 200KB

---

## 3. File Structure

```
/kronos-web
├── /app
│   ├── layout.tsx                   ← Root layout, font imports, metadata
│   ├── globals.css                  ← Design tokens, base resets
│   ├── page.tsx                     ← Landing page (/)
│   ├── /pricing
│   │   └── page.tsx                 ← Pricing page (/pricing)
│   ├── /signup
│   │   └── page.tsx                 ← Signup/waitlist page (/signup)
│   ├── /success
│   │   └── page.tsx                 ← Post-signup success (/success)
│   └── /api
│       └── /waitlist
│           ├── route.ts             ← POST — join waitlist
│           └── count/route.ts       ← GET — waitlist count
├── /components
│   ├── /layout
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── /landing
│   │   ├── Hero.tsx
│   │   ├── SocialProofStrip.tsx
│   │   ├── PainSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── FinalCTA.tsx
│   ├── /pricing
│   │   ├── PricingCard.tsx
│   │   ├── BillingToggle.tsx
│   │   └── FAQAccordion.tsx
│   ├── /signup
│   │   ├── SignupForm.tsx
│   │   └── PlanBadge.tsx
│   └── /ui
│       ├── Button.tsx
│       ├── StatusBadge.tsx          ← Replaces pastel pill tags
│       └── GlassCard.tsx
├── /lib
│   ├── resend.ts
│   ├── validation.ts
│   └── animations.ts
├── /emails
│   └── WaitlistWelcome.tsx
└── tailwind.config.ts
```

---

## 4. Global Components

### 4.1 Navigation Bar

**Position:** Fixed top | **z-index:** 100

```
Desktop height: 64px
Mobile height:  56px
```

**Default state (at top):** No background. Fully transparent.
**Scrolled state (>80px):** `glass-card` effect (bone + blur) with bottom border `--color-light`.

**Layout:**
```
[Logo mark + KRONOS wordmark]    [Features · Pricing · FAQ]    [Get Started →]
```

**Specs:**
- Logo: KRONOS wordmark in Plus Jakarta Sans 700, letter-spacing: -0.02em, `--color-void`
- Logo mark: the ❯ bolt icon to the left, `--color-crimson`
- Nav links: Inter 14px, weight 500, `--color-mid-gray`. Hover: `--color-void`. Transition: 0.15s
- Mobile: Links collapse to hamburger at < 768px. Menu slides in from right, full-height overlay, `--color-bone` background
- CTA button (`Get Started`): `btn-primary` (crimson). Padding: 10px 24px on nav (slightly tighter than page CTAs)

### 4.2 Footer

**Background:** `--color-charcoal` (`#161A1D`)
**Padding:** 80px vertical

```
[KRONOS wordmark + tagline]              [Privacy Policy · Terms · Contact]
[Tagline: "No coddling. No excuses."]   [© 2025 KRONOS. All rights reserved.]
```

- All text: `--color-white` for primary, `--color-mid-gray` for secondary links
- Top border: 1px solid `rgba(255,255,255,0.08)`
- Social links (optional): X/Twitter, GitHub — icon-only, `--color-mid-gray`, hover: `--color-white`

---

## 5. Page 1 — Landing Page (`/`)

### Emotional Arc
PAIN → AGITATE → SOLVE → BELIEVE → ACT

---

### Section 1: Hero

**Background:** `--color-bone` (`#F5F3F4`)
**Height:** 100vh minimum
**Vertical rhythm:** Content centered vertically, bottom 15% used for the app mockup preview card

**Copy (PRESERVED from existing hero — do not alter):**
```
EYEBROW:    YOU, BUT BETTER.
H1:         Unf*ck your life.
SUBHEAD:    Win the asymmetric outcome.
```

**Eyebrow:** Inter, 13px, weight 600, letter-spacing: 0.15em, uppercase, `--color-mid-gray`

**H1:** Plus Jakarta Sans, `clamp(64px, 8vw, 96px)`, weight 800, letter-spacing: -0.03em, `--color-void`. Line-height: 1.0. Maximum impact — this headline dominates the fold.

**Subhead:** Inter, `clamp(18px, 2vw, 22px)`, weight 400, `--color-mid-gray`, line-height: 1.5. Centered below H1 with 24px gap.

**CTAs:**
- Primary: `btn-primary` — "Get Started" → `/signup`
- Secondary: `btn-secondary` — "View Demo" (outlined, void border/text)
- Both buttons side-by-side. 16px gap. Centered.

> **⚠️ Kill List Correction — Feature Tags:** The existing hero displays colorful pastel pill tags ("Brutal Honesty", "Moonshot Goals", etc.) below the CTAs. Per the Brand Design Bible section 10.1, these are **permanently banned**: *"Pastel pill tags — Reads as Notion template. Colorful. Soft. Off-brand."*
>
> **Resolution:** Replace with a single line of clean, comma-separated feature labels in Inter 14px, `--color-muted`. No borders, no background fills, no color. Example:
> `Brutal Honesty · Moonshot Goals · Daily Check-ins · Smart Execution · AI Confrontation · Timeblocking`

**App Preview Card:**
- Positioned below the CTAs, partially visible at the bottom of the viewport — draws the user to scroll
- Shows a cropped, high-fidelity mockup of the KRONOS dashboard (AI chat panel + timeblock calendar)
- Card surface: `--color-white` with `border: 1px solid var(--color-light)` and `box-shadow: 0 20px 60px rgba(0,0,0,0.10)`
- Border-radius: `var(--radius-2xl)` (24px)
- Width: min(90%, 1100px). Horizontally centered.
- Do NOT apply glassmorphism here — this card sits on a light background

**Scroll indicator:** A thin downward chevron icon in `--color-light`, centered, animates with a subtle 2s loop fade. Small, unobtrusive. Stops animating after first scroll.

**Framer Motion:** Hero text stagger — eyebrow, H1, subhead, CTAs, tags animate in with `fadeUp` at 0.08s stagger intervals on page load. No scroll trigger — immediate on mount.

---

### Section 2: Social Proof Strip

**Background:** `--color-white`
**Padding:** 40px vertical
**Border-top/bottom:** 1px solid `--color-light`

**Content:**
- Left: Monospace-style stat in Plus Jakarta Sans 800: `"2,400+ on the waitlist"`
- Center: Grayscale logos of "as featured in" publications (if available) — 5 max, 32px height, `filter: grayscale(1)`, opacity 0.4. Hover: opacity 0.8.
- Right (alternative if no logos): Three inline stats in Plus Jakarta Sans 700 24px — `"10 Moonshot Goals" · "Daily Accountability" · "Zero Coddling"`

**Copy mandate:** No "Trusted by X users" phrasing. If featuring logos, the section label is: `"For those who've stopped pretending."` in Inter 13px, `--color-muted`, uppercase, centered above logos.

---

### Section 3: Pain Section

**Background:** `--color-bone`
**Padding:** 120px vertical
**Layout:** Two-column on desktop (60/40 split), stacked on mobile

**Left column — Copy:**

```
EYEBROW:  THE PROBLEM
H2:       You already know what 
          you're capable of.
BODY:     The plans are in your notes app. The goals are in 
          your head. The excuses change weekly, but the gap 
          between who you are and who you said you'd be — 
          that stays constant.

          You don't need more motivation. You need someone 
          to stop looking away.
```

- H2: Plus Jakarta Sans 800, `--text-h2`, `--color-void`
- Body: Inter 18px, `--color-mid-gray`, line-height: 1.65, max-width: 520px
- Eyebrow: Inter 12px, weight 600, letter-spacing: 0.12em, uppercase, `--color-crimson`

**Right column — Visual:**
- A single high-contrast UI panel showing an AI confrontation message from KRONOS
- Example message displayed in the panel (styled as an in-app chat bubble on dark bg):
  > *"You've rescheduled this goal 6 days in a row. Your screentime is 94hrs this week. What is going on?"*
- Panel background: `--color-charcoal`. Message bubble: `rgba(196,18,48,0.12)` with `--color-crimson` left border accent (3px)
- This is the first appearance of crimson on the page — it should land with weight

**Animation:** Left column `sectionReveal`, right column delays 0.15s

---

### Section 4: Features Section

**Background:** `--color-charcoal` (`#161A1D`)
**Padding:** 120px vertical

**Section header:**
```
EYEBROW:  HOW IT WORKS
H2:       Your sparring partner. Your execution engine.
SUBHEAD:  Set the goals. Get the confrontation. Ship the work.
```

**Layout:** 3-column grid desktop (1200px max-width), 2-col tablet, 1-col mobile

**Feature Cards (Glassmorphism permitted — dark background context):**

Each card: `glass-card` spec from Section 1.4. Padding: 48px. Border-radius: `--radius-xl`.

```
CARD 1 — BRUTAL HONESTY
Icon:    Data/brain SVG — --color-crimson, 32px
Title:   "AI Confrontation"   [Plus Jakarta Sans 700, 22px, white]
Body:    "You said this was your #1 goal. Your timeblocks
          say otherwise. KRONOS won't let that slide."
         [Inter 16px, --color-mid-gray]

CARD 2 — MOONSHOT PLANNING
Icon:    Target/crosshair SVG — --color-crimson, 32px
Title:   "Moonshot Goals"
Body:    "Set 10 unreasonable goals for 12 months. Get 
          execution plans built to the week. No vague 
          intentions — just milestones and deadlines."

CARD 3 — SMART EXECUTION  
Icon:    Calendar/grid SVG — --color-crimson, 32px
Title:   "Timeblock Engine"
Body:    "Drag. Drop. Track. Your calendar is your 
          commitment. KRONOS knows when you're slipping 
          before you do."
```

**Card hover state:**
```css
.glass-card:hover {
  background:   rgba(255, 255, 255, 0.07);
  border-color: rgba(196, 18, 48, 0.25);  /* crimson tint */
  transform:    translateY(-4px);
  transition:   all var(--transition-base);
}
```

**Icon style:** Custom SVG line icons — NOT Heroicons/Lucide generics. Stroke-only, 1.5px, `--color-crimson`. 32x32px.

**Animation:** Cards stagger in at 0.1s intervals on scroll trigger.

---

### Section 5: Product Showcase

**Background:** `--color-white`
**Padding:** 120px vertical

**Header:**
```
EYEBROW:  SEE IT IN ACTION
H2:       No fluff. Just your data, laid bare.
SUBHEAD:  The interface is quiet. The AI isn't.
```

**Visual:** Full-width (max 1200px) mockup showing the complete KRONOS dashboard:
- Left panel: Goal tracker (10 moonshot goals, progress indicators, "At Risk" badges in `--color-alert`)
- Right panel: Timeblock calendar for the week (color-coded blocks — approved UI accent colors only inside product UI mockup)
- Bottom strip: AI confrontation message thread

**Presentation:** The mockup sits in a shallow `--color-bone` container with a 1px `--color-light` border. Subtle `box-shadow: 0 24px 80px rgba(0,0,0,0.08)`. Border-radius: `--radius-2xl`.

**Caption below:** Inter 15px italic, `--color-muted`, centered: *"KRONOS tracks what you commit to, not what you feel like doing that morning."*

**Note:** Do not use video embeds in v1. Static mockup only. Annotated callouts (small labels pointing to UI elements) optional — use `--color-mid-gray` Inter 12px with a thin `--color-light` line connector.

---

### Section 6: Testimonials

**Background:** `--color-bone`
**Padding:** 120px vertical

**Section header:**
```
H2:  "What happens when you can't lie to yourself anymore."
```
*(This is the benefit-framed headline — not "What our customers say.")*

**Layout:** 3 testimonial cards in a row (desktop), horizontal scroll (mobile)

**Card spec:**
```css
.testimonial-card {
  background:    var(--color-white);
  border:        1px solid var(--color-light);
  border-radius: var(--radius-xl);
  padding:       40px;
  box-shadow:    0 4px 24px rgba(0,0,0,0.06);
}
```

**Card content structure:**
1. Pull quote in Plus Jakarta Sans 700 20px `--color-void` — the **result**, not the praise. Example:
   - *"Shipped the side project I'd been 'planning' for 2 years. In 6 weeks."*
   - *"My screentime confrontation was uncomfortable. That was the point."*
   - *"I stopped lying to myself about what I actually wanted."*
2. Name + role in Inter 14px `--color-mid-gray` — real name, real role, no stock photos
3. No star ratings. No "5/5". KRONOS doesn't gamify.

**Photo guidance:** Genuine headshots only. If unavailable, use initials in a `--color-charcoal` circle avatar with `--color-white` text. No Unsplash stock photos.

---

### Section 7: Final CTA Section

**Background:** `--color-charcoal`
**Padding:** 120px vertical
**Text:** `--color-white`

**Copy:**
```
H2:   Stop lying to yourself about your goals.
SUB:  You know what you're capable of. 
      KRONOS just won't let you forget it.
CTA:  [Get Started]   — btn-primary (crimson)
```

H2: Plus Jakarta Sans 800, `clamp(40px, 4.5vw, 56px)`, white, max-width: 700px, centered.

Sub: Inter 20px, `--color-mid-gray`, max-width: 500px, centered, margin-top: 24px.

CTA button: centered, `btn-primary`, padding: 20px 56px, font-size: 18px. Large, impossible to miss. 64px margin-top.

Below button: Inter 13px `--color-muted` — *"14-day free trial. No credit card required."*

---

## 6. Page 2 — Pricing (`/pricing`)

### Page Purpose
Convert confident visitors into plan selectors. Remove all friction, preempt every objection.

**Background:** `--color-bone`

---

### Section 1: Pricing Hero

**Padding:** 96px top, 64px bottom

```
EYEBROW:  PRICING
H1:       Simple. Honest. No gotchas.
SUBHEAD:  The AI doesn't cost more when it works harder. 
          Pick a plan. Start today.
```

H1: Plus Jakarta Sans 800, `--text-h1`, `--color-void`
Subhead: Inter, `--text-body-large`, `--color-mid-gray`

---

### Section 2: Billing Toggle

Centered below the hero, above cards. Margin-bottom: 64px.

```
[ Monthly ]  ●────────  [ Annual  ·  Save 20% ]
```

Toggle component:
- Custom toggle pill — **not** a browser checkbox input
- Active label: `--color-void`, weight 600
- Inactive label: `--color-muted`, weight 400
- Toggle track when Annual: `--color-void` fill
- "Save 20%" badge: inline, Inter 12px, weight 600, `--color-white` on `--color-crimson` background, border-radius `--radius-full`, padding: 3px 8px
- Default state: **Annual** (higher-value default)
- Price numbers animate with a smooth cross-fade on toggle (Framer Motion `AnimatePresence`)

```typescript
interface BillingPeriod { mode: 'monthly' | 'annual' }

const prices = {
  free:    { monthly: 0,   annual: 0   },
  pro:     { monthly: 15,  annual: 12  },  // $12/mo billed annually
  elite:   { monthly: 29,  annual: 23  },  // $23/mo billed annually
}
```

---

### Section 3: Pricing Cards

**Layout:** 3-column grid at 1280px max-width. Cards sit on `--color-bone` background (no dark section here — **no glassmorphism**).

**Card base styling:**
```css
.pricing-card {
  background:    var(--color-white);
  border:        1.5px solid var(--color-light);
  border-radius: var(--radius-xl);
  padding:       48px 40px;
  transition:    transform var(--transition-base),
                 box-shadow var(--transition-base);
}
.pricing-card:hover {
  transform:  translateY(-4px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.08);
}
.pricing-card.recommended {
  border-color: var(--color-void);
  border-width: 2px;
  position:     relative;
  transform:    scale(1.03);
}
.pricing-card.recommended:hover {
  transform: scale(1.03) translateY(-4px);
}
```

**Recommended badge:**
```css
.recommended-badge {
  position:         absolute;
  top:              -14px;
  left:             50%;
  transform:        translateX(-50%);
  background:       var(--color-void);
  color:            var(--color-white);
  padding:          5px 18px;
  border-radius:    var(--radius-full);
  font-family:      var(--font-body);
  font-size:        11px;
  font-weight:      700;
  letter-spacing:   0.08em;
  text-transform:   uppercase;
}
```

**Tier Definitions:**

```
TIER 1 — FREE
Name:    "Starter"
Price:   $0 / forever
CTA:     "Get Started"  → /signup?plan=free
Badge:   none
Features:
  ✓ Up to 3 moonshot goals
  ✓ Daily check-ins
  ✓ Basic timeblocking (7 days)
  ✓ AI coaching (5 messages/day)
  ✗ Unlimited goals
  ✗ AI confrontation mode
  ✗ Advanced analytics

TIER 2 — PRO  ← RECOMMENDED
Name:    "Pro"
Price:   $12/mo (annual) · $15/mo (monthly)
CTA:     "Start Free Trial"  → /signup?plan=pro
Badge:   "MOST CHOSEN"
Features:
  ✓ Unlimited moonshot goals
  ✓ Daily check-ins
  ✓ Full timeblocking suite
  ✓ Unlimited AI coaching
  ✓ AI confrontation mode
  ✓ Screentime integration
  ✓ Weekly progress reports
  ✓ 14-day free trial

TIER 3 — ELITE
Name:    "Elite"
Price:   $23/mo (annual) · $29/mo (monthly)
CTA:     "Go Elite"  → /signup?plan=elite
Badge:   none
Features:
  ✓ Everything in Pro
  ✓ Priority AI response time
  ✓ Custom goal frameworks
  ✓ Monthly 1:1 AI deep review
  ✓ Early access to new features
  ✓ Export all data (CSV, PDF)
  ✓ Dedicated support
```

**Price display:**
```
$12
/month, billed annually
```
- Price amount: Plus Jakarta Sans 800, 64px, `--color-void`, letter-spacing: -0.03em
- Period label: Inter 16px, `--color-mid-gray`
- "14-day free trial" sub-label (Pro only): Inter 13px, `--color-crimson`, italic

**Feature list items:**
```css
.feature-item {
  display:       flex;
  align-items:   center;
  gap:           12px;
  padding:       10px 0;
  font-size:     15px;
  color:         var(--color-void);
  border-bottom: 1px solid var(--color-light);
}
.feature-item:last-child { border-bottom: none; }

/* Included checkmark: --color-crimson, SVG check icon */
/* Excluded dash: --color-light, shorter minus icon */
.feature-item.excluded { color: var(--color-muted); }
```

---

### Section 4: FAQ

**Background:** `--color-white`
**Padding:** 96px vertical
**Max-width:** 720px, centered

**Header:**
```
H2:  "Every question you're about to Google."
```

**Accordion behavior:**
- Click to expand. One open at a time (auto-close others).
- Expand animation: 300ms ease, height transition, content fades in
- Icon: `+` (collapsed) → `×` (expanded) — `--color-crimson`, 20px

```css
.faq-item {
  border-bottom: 1px solid var(--color-light);
  padding: 24px 0;
}
.faq-question {
  font-family: var(--font-body);
  font-size:   18px;
  font-weight: 600;
  color:       var(--color-void);
  cursor:      pointer;
  display:     flex;
  justify-content: space-between;
  align-items: center;
}
.faq-answer {
  font-size:   16px;
  color:       var(--color-mid-gray);
  line-height: 1.65;
  margin-top:  16px;
  padding-right: 32px;
}
```

**FAQ Content (Brand voice — direct, data-backed):**

| # | Question | Answer |
|---|---|---|
| 1 | How does the AI coach actually work? | You set moonshot goals. KRONOS tracks your execution — timeblocks completed, todos done, screentime. When there's a gap between what you said and what you did, it tells you. Directly. |
| 2 | Is there a free trial? | 14 days on Pro, no credit card required. If it doesn't change how you work in two weeks, cancel without a conversation. |
| 3 | Will the AI actually confront me? | Yes. That's the whole point. If your goal says "ship the product" but your calendar says "2hrs of actual work this week," KRONOS will ask what happened. |
| 4 | Can I change plans later? | Yes. Upgrade or downgrade anytime. Changes take effect at next billing cycle. Downgrades don't lose your data. |
| 5 | What payment methods are accepted? | All major credit cards via Stripe. Annual plans can be invoiced upon request. |
| 6 | Is my data private? | Your goals, timeblocks, and AI conversations are yours. We do not sell data. We do not train on your personal content without consent. |
| 7 | What if I want to cancel? | Cancel anytime from your account settings. No email required, no retention flow, no dark patterns. |

---

### Section 5: Pricing Page CTA

**Background:** `--color-charcoal`
**Padding:** 96px vertical

```
H2:   Still deciding?
SUB:  Start free. Upgrade when you're convinced.
CTA:  [Start Free — No Credit Card]  → /signup?plan=free
```

Button: `btn-primary` (crimson). Below: Inter 13px `--color-muted` — *"Or compare plans above."*

---

## 7. Page 3 — Signup / Waitlist (`/signup`)

### Page Purpose
Capture the user with minimal friction. The hard work was done on the landing page. This page just needs to not get in the way.

**Background:** `--color-bone`
**Layout:** Full-height centered column. No nav links (nav simplified to logo only). Footer removed.

---

### URL Parameters

| Param | Values | Effect |
|---|---|---|
| `?plan=free` | free / pro / elite | Pre-selects plan, shows PlanBadge |
| `?plan=pro` | — | Shows "14-day trial" note in badge |

---

### Signup Form Card

**Card container:**
```css
.signup-card {
  background:    var(--color-white);
  border:        1px solid var(--color-light);
  border-radius: var(--radius-xl);
  padding:       56px 48px;
  width:         100%;
  max-width:     480px;
  margin:        0 auto;
  box-shadow:    0 8px 40px rgba(0,0,0,0.07);
}
```

No glassmorphism — the card is on a light background.

**Page-level copy (above card, not inside it):**
```
EYEBROW:  JOIN KRONOS
H1:       Ready to stop making excuses?
SUB:      The wait is over. Pick a plan. 
          Start being accountable.
```

H1: Plus Jakarta Sans 800, 40px, `--color-void`
Sub: Inter 18px, `--color-mid-gray`

**Plan Badge (renders only when `?plan` param exists):**
```css
.plan-badge {
  background:    var(--color-bone);
  border:        1px solid var(--color-light);
  border-radius: var(--radius-md);
  padding:       12px 16px;
  font-size:     14px;
  color:         var(--color-void);
  margin-bottom: 32px;
  text-align:    center;
}
.plan-badge strong { color: var(--color-crimson); }
```

Content: `Signing up for: KRONOS Pro · $12/month`

**Form Fields:**

```
1. EMAIL (required)
   Label: "Email" — Inter 14px, weight 600, --color-void
   Input placeholder: "you@example.com"
   
2. NAME (required)  
   Label: "Name"
   Input placeholder: "Your name"
   
3. PASSWORD (required for account creation)
   Label: "Password"  
   Input: type="password"
   Hint below: "Min 8 characters, 1 uppercase, 1 number" — 12px --color-muted
```

**Input styling:**
```css
.form-input {
  width:         100%;
  padding:       14px 16px;
  border:        1.5px solid var(--color-light);
  border-radius: var(--radius-md);
  font-family:   var(--font-body);
  font-size:     16px;
  color:         var(--color-void);
  background:    var(--color-white);
  transition:    border-color var(--transition-fast),
                 box-shadow var(--transition-fast);
  outline:       none;
}
.form-input::placeholder { color: var(--color-muted); }

/* Focus: crimson-tinted — NOT blue */
.form-input:focus {
  border-color: var(--color-crimson);
  box-shadow:   0 0 0 3px rgba(196, 18, 48, 0.10);
}

/* Valid state: subtle green-ish confirmation */
.form-input.valid {
  border-color: #2D7A4F;
}

/* Error state */
.form-input.error {
  border-color: var(--color-alert);
  box-shadow:   0 0 0 3px rgba(229, 56, 59, 0.10);
}
```

**Validation behavior:**
- Validate on `blur` (not on every keystroke)
- Show error text below the field on blur if invalid
- Show `✓` checkmark icon inside the input (right-aligned) for valid fields
- Error text: Inter 13px, `--color-alert`
- Submit button disabled until all required fields pass validation
- Prevent double-submission (disable during loading)

```typescript
const validateEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validateName     = (v: string) => v.trim().length >= 2;
const validatePassword = (v: string) => v.length >= 8 && /[A-Z]/.test(v) && /\d/.test(v);
```

**Submit Button:**

Idle: `btn-primary` — "Join Waitlist" (or "Start Free Trial" if plan=pro/elite)

Loading:
```jsx
<button disabled className="btn-primary btn-loading">
  <Spinner size={16} /> Joining...
</button>
```

Error state (below button):
```jsx
<div className="submit-error">Something went wrong. Please try again.</div>
```

```css
.submit-error {
  background:    rgba(229, 56, 59, 0.08);
  border:        1px solid rgba(229, 56, 59, 0.2);
  border-radius: var(--radius-md);
  color:         var(--color-alert);
  font-size:     14px;
  padding:       12px 16px;
  margin-top:    16px;
  text-align:    center;
}
```

**Privacy notice (below submit button):**
Inter 13px, `--color-muted`, centered. No emoji.
*"We don't sell your data. We don't spam. Unsubscribe anytime."*

**Waitlist count (if waitlist mode):**
Inter 14px, `--color-mid-gray`, centered, 24px below form.
*"Join 2,400+ others who stopped settling."*

> **⚠️ Copy Correction:** Previous PRD used `"🔒 We respect your privacy"` — emoji in body copy is off-brand per the Bible. Remove the lock emoji. Plain text only.

**Already have an account?** — Inter 14px `--color-mid-gray` below count. Link: `--color-void`, underline on hover.

---

### Form API Integration

```typescript
// /app/api/waitlist/route.ts
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name:  z.string().min(2),
  plan:  z.enum(['free', 'pro', 'elite']).default('free'),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  
  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { email, name, plan } = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from:    'KRONOS <hello@kronos.app>',
      to:      email,
      subject: `You're in. KRONOS is ready when you are.`,
      react:   WaitlistWelcome({ name, plan }),
    });
    
    // Notify team
    await resend.emails.send({
      from:    'KRONOS <hello@kronos.app>',
      to:      'team@kronos.app',
      subject: `New signup: ${email} (${plan})`,
      text:    `${name} signed up for ${plan}.`,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
```

**Environment variables:**
```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@kronos.app
RESEND_TEAM_EMAIL=team@kronos.app
```

---

## 8. Page 4 — Success (`/success`)

**Background:** `--color-bone`
**Layout:** Centered, single card, full viewport height

**Post-submission redirect:** On API success → `router.push('/success')`

**Copy:**
```
ICON:     Large check — custom SVG, --color-crimson, 64px
H1:       You're in.
BODY:     Check your email — we sent confirmation to [email].
          KRONOS launches [soon / date]. You'll be first.
CTA:      [Back to Home]   → /
```

H1: Plus Jakarta Sans 800, 56px, `--color-void`
Body: Inter 18px, `--color-mid-gray`

**Checkmark animation:** Draws in via SVG `stroke-dashoffset` animation — 0.6s ease. Satisfying, not celebratory. No confetti. No sparkles.

**Optional — Share section (below divider):**
```
LABEL:  "Tell a friend who needs this."
LINKS:  [Share on X]   [Copy Link]
```

Share button: `btn-secondary` (outlined void). No color pills, no emoji.

**SEO:** `<meta name="robots" content="noindex, follow" />` — success page should not index.

---

## 9. API Routes

### `POST /api/waitlist`

| Field | Type | Validation |
|---|---|---|
| `email` | string | valid email format |
| `name` | string | min 2 chars |
| `plan` | `'free' \| 'pro' \| 'elite'` | enum, defaults to `'free'` |

**Responses:**
- `200` `{ success: true }`
- `400` `{ error: 'Invalid input' }`
- `500` `{ error: 'Failed' }`

**Rate limiting:** Max 5 requests per IP per hour (use Vercel Edge Middleware or Upstash Redis).

---

### `GET /api/waitlist/count`

Returns the current waitlist count for display on the signup page.

```typescript
export async function GET() {
  // Replace with real DB query
  return Response.json({ count: 2400 });
}
```

---

## 10. Performance & SEO

### Meta Tags

**Landing page (`/`):**
```html
<title>KRONOS — AI Life Coach for the Unreasonably Ambitious</title>
<meta name="description" content="The AI coach that won't let you settle. Set moonshot goals. Get confronted when you fall short. No coddling." />
<meta property="og:title" content="KRONOS — Unf*ck your life." />
<meta property="og:description" content="AI accountability for the unreasonably ambitious." />
<meta property="og:image" content="/og/kronos-hero.png" />
<meta name="twitter:card" content="summary_large_image" />
```

**Pricing (`/pricing`):**
```html
<title>Pricing — KRONOS | Start Free, Upgrade When Ready</title>
<meta name="description" content="Simple, honest pricing for KRONOS. Free tier, Pro at $12/mo, Elite at $23/mo. 14-day free trial on Pro." />
```

**Signup (`/signup`):**
```html
<title>Join KRONOS — Stop Making Excuses</title>
<meta name="robots" content="noindex, follow" />
```

### Font Loading

```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight:  ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight:  ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
```

### Image Optimization

- All mockup images: Next.js `<Image>` component, WebP format, `sizes` prop for responsive
- OG image: 1200×630px, static PNG at `/public/og/kronos-hero.png`
- Logo: SVG inline (no network request)
- Lazy load all below-fold images: `loading="lazy"` (default with `<Image>`)

---

## 11. Accessibility

- WCAG 2.1 AA compliance across all pages
- All form inputs: `<label>` associated via `htmlFor` / `id`
- Error messages: `role="alert"` for screen reader announcement
- Focus visible: All interactive elements have `:focus-visible` style using `outline: 2px solid var(--color-crimson); outline-offset: 3px`
- Keyboard navigation: Full `Tab` flow through nav → hero → sections → CTA
- Touch targets: Minimum 44×44px on mobile
- Color contrast: All text/background pairs ≥ 4.5:1 (verify with axe)
- `alt` text on all images; decorative images: `alt=""`
- Reduced motion: Wrap all Framer Motion animations in `useReducedMotion()` check

---

## 12. Analytics & Tracking

```typescript
// Vercel Analytics + custom events
import { track } from '@vercel/analytics';

// CTA clicks
track('cta_click', { location: 'hero', plan: 'none' });
track('cta_click', { location: 'pricing', plan: 'pro' });

// Form events
track('signup_form_start');
track('signup_form_submit', { plan: selectedPlan });
track('signup_form_success', { plan: selectedPlan });
track('signup_form_error', { reason: errorType });

// Pricing interactions
track('billing_toggle', { mode: 'annual' | 'monthly' });
track('faq_open', { question: questionIndex });
```

**Scroll depth tracking:** Milestone events at 25%, 50%, 75%, 100% of page.

---

## 13. Acceptance Criteria

### Visual

- [ ] All colors match the 10-token Design Bible palette exactly — no deviations
- [ ] Primary CTAs are crimson (`#C41230`), hover is `#96031A`
- [ ] Page backgrounds use `--color-bone` (`#F5F3F4`), not `#F5F5F5` or `#FFFFFF`
- [ ] Fonts: Plus Jakarta Sans for display, Inter for body — nothing else
- [ ] Glassmorphism appears only on cards within dark (`--color-charcoal`) sections
- [ ] No pastel pill tags anywhere on any page
- [ ] No stock photography anywhere on any page
- [ ] Spacing follows Rule of 8 throughout
- [ ] No element below 12px font size

### Behavior

- [ ] Nav CTA scrolls to top of page or navigates to `/signup` correctly
- [ ] Billing toggle animates price change without layout shift
- [ ] All FAQ items expand/collapse with smooth 300ms animation
- [ ] Form validates on blur, not on keypress
- [ ] Focus state uses crimson outline, not blue
- [ ] Submit button disables during loading, re-enables on error
- [ ] URL param `?plan=pro` pre-selects Pro and shows badge on signup page
- [ ] Redirect to `/success` on form success
- [ ] Rate limiting prevents form spam

### Responsive

- [ ] Fully functional from 320px to 2560px+
- [ ] Mobile nav (hamburger) at < 768px
- [ ] Pricing cards stack vertically on mobile
- [ ] Feature cards stack to single column on mobile
- [ ] Touch targets ≥ 44×44px

### Performance

- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse SEO = 100
- [ ] LCP < 2.5s on 3G Fast (mobile)
- [ ] CLS < 0.1
- [ ] No render-blocking resources

---

## 14. Anti-Patterns & Kill List (Enforced)

These items from the Design Bible are re-stated here as hard build-time rules. If any of these appear in a PR, reject without review.

| ❌ Banned Element | ✅ Replacement |
|---|---|
| Pastel pill tags with colored backgrounds | Plain text feature labels in `--color-muted` |
| Blue focus ring (`rgba(59,130,246,...)`) | Crimson focus ring (`rgba(196,18,48,0.10)`) |
| `#F5F5F5` or `#FFFFFF` as page background | `--color-bone` (`#F5F3F4`) |
| Inter / Geist / SF Pro as display font | Plus Jakarta Sans for all display headings |
| Black (`#000000`) as primary CTA color | `--color-crimson` (`#C41230`) |
| Glassmorphism on light backgrounds | Glass only on `--color-charcoal` sections |
| "Trusted by X users" with stock headshots | Waitlist count in plain type, real testimonials only |
| Rocket emoji, celebration emoji, any emoji in UI | No emoji in buttons, labels, or body copy |
| Purple/blue gradients | None. Solid bone, white, charcoal backgrounds only |
| Generic SVG icon libraries (Heroicons etc.) as final icons | Custom stroke SVGs per feature |
| "You're amazing!" success states | "You're in." — terse, factual |
| Star ratings on testimonials | No ratings. Benefit-first quote only. |
| Multiple CTAs with equal visual weight | One primary, one secondary max per section |
| `<form>` default browser styling | Fully custom — zero default agent styles |
| `"Submit"` button text | "Join Waitlist" / "Get Started" / "Start Free Trial" |

---

*KRONOS Master PRD — v2.0*
*Governed by KRONOS Brand & Design Bible v1.0*
*Replaces: `KRONOS_Landing_Page_PRD.md`, `KRONOS_Pricing_Signup_PRD.md`*
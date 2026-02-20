# KRONOS Landing Page

Premium marketing site for the KRONOS timeblocking application.

## Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- Vercel Analytics

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Navbar.tsx
    Hero.tsx
    Features.tsx
    ProductShowcase.tsx
    CTASection.tsx
    Footer.tsx
    AnalyticsTracker.tsx
    Motion.tsx
    ui/
      Button.tsx
      TrackedButton.tsx
      GlassCard.tsx
  lib/
    constants.ts
public/
  logo.png
  mockup-dashboard.svg
  mockup-showcase.svg
  og-image.svg
```

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Ensure the project root is set to the repository root.
4. Deploy. (No environment variables required.)

## Notes
- CTA target is configured in `src/lib/constants.ts`.
- Structured data, Open Graph, and Twitter metadata are in `src/app/layout.tsx`.
- Sitemap and robots routes are in `src/app/sitemap.ts` and `src/app/robots.ts`.

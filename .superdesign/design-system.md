# Wafia Design System

## Product Context
Wafia is a hybrid agency for Influence, Talent Management, Creative Studio, and Strategy. The site presents brand and talent offerings, showcases services/cases, and provides tailored pathways for brands, agencies, and talents.

## Key Pages & Flows
- Home: Space-minimal landing with three entry routes (brand, talent, studio).
- For Brands: Long-form marketing page.
- For Talents: Long-form marketing page with OS, dashboards, and platform tables.
- For Agencies: Partnership/offer overview.
- Studio: Creative studio positioning.
- Cases: Case studies.
- Contact: Lead capture forms.

## Visual Direction
- Clean, premium, tech-luxe aesthetic with soft gradients, glassmorphism, and atmospheric backgrounds.
- Light mode is primary, with optional dark mode accents.
- Use brand gradients (orange → red, with pink/purple accents), subtle glow effects, and layered depth.

## Color Tokens (from CSS variables)
- Core: `--background #ffffff`, `--foreground #0a0a0a`
- Brand: `--brand-primary #f97316`, `--brand-secondary #ef4444`, `--brand-tertiary #ec4899`
- Accents: `--accent-blue #3b82f6`, `--accent-purple #a855f7`, `--accent-green #22c55e`, `--accent-yellow #eab308`
- Neutrals: `--neutral-50 #f8fafc`, `--neutral-100 #f1f5f9`, `--neutral-200 #e2e8f0`, `--neutral-800 #1e293b`, `--neutral-900 #0f172a`

## Typography
- Body: Plus Jakarta Sans (`--font-plus-jakarta`)
- Heading: Outfit (`--font-outfit`)
- Display: Syne (`--font-syne`) for bold headlines
- Defaults are wired in `src/app/layout.tsx` and `globals.css`.

## Spacing & Layout
- Container width: `max-w-7xl` with responsive padding.
- Section spacing: `.section-spacing` = 10rem vertical, 6rem on mobile.
- Rounded shapes: typically `rounded-2xl` to `rounded-3xl`.
- Shadows: soft, layered; brand glow uses orange/pink overlays.

## Components & Styling Patterns
- Buttons: rounded-full, gradient brand for primary CTAs; subtle scale on hover.
- Cards: white backgrounds, soft borders, glass variants (`.card-glass`).
- Pills/Badges: uppercase, tight tracking, border + soft background tint.
- Tables: grid-based layout, sticky headers, subtle separators, responsive collapse.

## Motion & Interaction
- Framer Motion used for reveal, hover, and page transitions.
- Easing: custom apple-like ease in `src/lib/easing` (used in buttons & transitions).
- Avoid excessive motion; respect reduced motion preference.

## Backgrounds
- Brand/Talent pages use animated gradient backdrops (aurora + glow layers).
- Home uses a space/nebula aesthetic with subtle grain overlays.

## Implementation Notes
- TailwindCSS v4 via `@theme inline` in `globals.css`.
- Global design tokens live in CSS variables.
- Dark mode is supported via `.dark` class but light mode is primary.

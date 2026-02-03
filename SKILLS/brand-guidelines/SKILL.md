---
name: brand-guidelines
description: Official Wafia Brand Identity & Design System. Use this for all UI/UX tasks to ensure the "Social Cut" aesthetic.
---

# Wafia Brand Guidelines

## 1. Core Identity: "The Social Cut"

Wafia is not just an agency; it's a **Creative Studio & Talent Powerhouse**.
Our aesthetic is **"Social Cut"**: A blend of high-end editorial design and the dynamic energy of social media.

**Keywords**:
- **Premium**: Sleek, polished, expensive-looking.
- **Human**: Direct, authentic tone. No corporate jargon.
- **Dynamic**: Alive, moving, interactive.
- **Bold**: High contrast, massive typography, confident use of negative space.
- **Anti-Minimalist**: We are NOT "Apple Style". We are not sterile, white, or neutral. We are loud, colorful (within the palette), and textured.

---

## 2. Typography

We use a dual-font system to create hierarchy and character.

### Primary / Headings: **Outfit**
*Used for all Headings (H1-H6), Big Numbers, and CTAs.*
- **Character**: Geometric, modern, friendly but bold.
- **Weights**:
    - **Bold (700)** or **ExtraBold (800)** for main titles.
    - **Medium (500)** for subheadings.
- **Usage**: Letter-spacing tends to be tight (`tracking-tight`) for a compact, punchy look.

### Secondary / Body: **Plus Jakarta Sans**
*Used for paragraphs, UI labels, navigation.*
- **Character**: Humanist sans-serif, highly readable, modern.
- **Weights**:
    - **Regular (400)** for body text.
    - **Medium (500)** for UI elements/buttons.
- **Usage**: Clean, open, optimized for reading.

---

## 3. Color Palette

### The "Heat" Gradient (Primary Brand)
Our signature gradient represents energy, influence, and creativity.
- **Start**: Orange-500 (`#f97316`)
- **End**: Red-500 (`#ef4444`) / Rose-500 (`#ec4899`)
- **Usage**: Buttons, text gradients, active states, accent borders.

### Neutral System (Backgrounds)
We operate primarily in **Dark Mode** for a premium "cinema" feel, but Light Mode must remain clean and editorial.

**Dark Mode (Primary)**
- **Background**: Deep Black (`#0a0a0a`) - *Not strictly #000, but very close.*
- **Surface**: Zinc-900 / Neutral-900 (`#18181b`)
- **Border**: White/10 (`rgba(255,255,255,0.1)`)

**Light Mode (Secondary)**
- **Background**: White (`#ffffff`)
- **Surface**: Gray-50 (`#f9fafb`)
- **Border**: Gray-200 (`#e5e7eb`)

### Accents
Used sparsely for functional feedback or specific section highlights.
- **Blue**: `#3b82f6` (Trust, data)
- **Purple**: `#a855f7` (Creative, studio)
- **Green**: `#22c55e` (Success, positive metrics)

---

## 4. UI Patterns & Effects

### Glassmorphism
Used for cards, navigation, and floating elements to create depth.
- **Background**: `bg-white/5` (Dark) or `bg-white/80` (Light)
- **Blur**: `backdrop-blur-xl` or `backdrop-blur-2xl`
- **Border**: Thin, subtle borders `border-white/10` to define edges without heaviness.

### Shadows & Glows
- **Colored Glows**: We use colored shadows to reflect the brand gradient.
    - *Example*: `shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]`
- **Soft Shadows**: Large, diffuse shadows for elevation (`shadow-2xl`).

### Rounded Corners
- **Cards**: `rounded-2xl` or `rounded-3xl` (Friendly, modern).
- **Buttons**: Full pill shape `rounded-full`.

### Animations
- **Micro-interactions**: Everything should feel reactive. `hover:scale-105`, `active:scale-95`.
- **Entrance**: Smooth fade-ins with slight upward movement (`opacity-0 translate-y-4` -> `opacity-100 translate-y-0`).

---

## 5. Writing Style & Content ("Social Cut")

Your copy must punch through the noise.

### Rules of Engagement
1.  **Be Direct**: Start with the value. "Maximize your reach" -> "Reach Millions."
2.  **Short & Punchy**: Paragraphs should not exceed 2-3 lines.
3.  **Highlight Key Terms**: Use **bold** or <span class="text-gradient">gradient text</span> for the most important words. Skimmers should get the message.
4.  **No Fluff**: Eliminate "buzzwords" that don't mean anything. Use concrete verbs.

### Formatting
- **Headings**: Capitalize Sentence Case (mostly) or Title Case for major displays.
- **Numbers**: Use digits (e.g., "10M+ Views" not "Over ten million views").

---

## 6. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| **Do** use the Orange->Red gradient for primary CTAs. | **Don't** use flat neon colors that clash with the palette. |
| **Do** use generous whitespace (padding/margin). | **Don't** clutter the interface; let the content breathe. |
| **Do** use Outfit for headings. | **Don't** use Inter or Arial (Too neutral/Apple-like). |
| **Do** make cards look like "glass" on dark backgrounds. | **Don't** use solid opaque gray blocks (Apple default). |
| **Do** write like a human talking to a human. | **Don't** write like a corporate robot. |
| **Do** embrace "Noise", "Grain", and "Heat". | **Don't** make it sterile, white, and perfectly clean (Apple Style). |

# Design System — Pain & Wellness Solutions

## Color Strategy: Committed

Scene: A 52-year-old woman in rural Ontario sits at her farmhouse kitchen table on a grey October morning, phone in hand, searching for someone who can help her chronic back pain. The light is warm and indirect. She has horses. She's practical, not precious. She needs to trust the person on the other end of the screen.

This scene forces: warmth, texture, nature, authenticity. It actively rejects clinical teal, spa purple, luxury gold, anything that reads "template."

## Colors (OKLCH)

```
--deep-forest:    oklch(22% 0.055 158)   /* near-black rich green — primary dark surfaces */
--forest:         oklch(35% 0.075 155)   /* primary brand green */
--sage:           oklch(55% 0.085 150)   /* muted natural green — accents, links */
--warm-cream:     oklch(96% 0.012 82)    /* parchment background — never pure white */
--warm-stone:     oklch(91% 0.015 75)    /* secondary background panels */
--warm-mid:       oklch(78% 0.018 75)    /* borders, dividers */
--earth-text:     oklch(28% 0.025 60)    /* primary body text — warm dark brown, never black */
--earth-soft:     oklch(52% 0.022 65)    /* secondary text */
--amber:          oklch(68% 0.13 68)     /* CTA only — warm amber, not gold */
--amber-hover:    oklch(62% 0.14 68)
```

## Typography

- **Display / Headlines**: Cormorant Garamond (Google Font) — serif, warmth, authority, editorial feel. Rural Ontario working professionals respond to something that feels crafted, not tech-corporate.
- **Body / UI**: Inter (Google Font) — clean, readable, 400/500 weight for body, 600 for UI labels

```
--font-display: 'Cormorant Garamond', Georgia, serif
--font-body: 'Inter', system-ui, sans-serif
```

## Elevation & Surfaces

- Page background: `--warm-cream`
- Section alternates: `--warm-stone` (subtle, not jarring)
- Cards: white with `--warm-mid` border, very slight shadow (0 2px 8px oklch(28% 0.025 60 / 0.06))
- Dark sections (hero, CTA): `--deep-forest` with cream text

## Key Design Decisions

- **No gradient text.** Single solid color only.
- **No side-stripe borders on cards.** Full borders or nothing.
- **No glassmorphism.** Clean surfaces only.
- **No identical card grids.** Services use an asymmetric layout.
- **Hero:** Full-bleed photography. Kathy with horse. Overlay is dark forest, not a gradient band.
- **Booking button:** Persistent in nav + repeated at strategic points. Warm amber.
- **Photography-first:** Kathy's real photos are the design. Never stock.

## Spacing

- Section padding: `clamp(5rem, 10vw, 9rem) 0`
- Content max-width: 1200px
- Narrow content max-width: 740px
- Column gap standard: `clamp(2rem, 4vw, 4rem)`

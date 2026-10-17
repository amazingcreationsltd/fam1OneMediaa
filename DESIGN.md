# Fam1Media Design System — Swiss Architectural Editorial

## 1. Tokens & Color Architecture

Built strictly around high-contrast semantic tokens (§7.1):

| Token | Light Value | Dark Value | Purpose |
|---|---|---|---|
| `paper` | `#F4F3EF` | `#0A0A0A` | Ground page surface |
| `surface` | `#EAE8E1` | `#121212` | Inset bands, spec cells, KPI bar |
| `ink` | `#0D0D0D` | `#F4F3EF` | Primary editorial text (high contrast) |
| `ink-muted` | `#5A5754` | `#A8A49C` | Supporting labels, indices, metadata |
| `rule` | `rgba(13,13,13,0.15)` | `rgba(244,243,239,0.15)` | 1px hairline dividers |
| `accent` | `#FACC15` | `#FACC15` | High-visibility interactive CTA fills & focus |
| `accent-ink` | `#0D0D0D` | `#0D0D0D` | Text on yellow accent (12.6:1 contrast) |
| `success` | `#047857` | `#34D399` | Positive state indicators |
| `danger` | `#B3261E` | `#F87171` | Form validation and error states |

## 2. Core Architectural Rules

1. **Strict 0-Radius Geometry**:
   - Zero rounded corners. Every card, button, tag, and modal uses orthogonal rectangular geometry.
   - Zero drop shadows, glassmorphism, or blurred backdrops.

2. **Contrast & Accessibility (WCAG AA)**:
   - Contrast ratio exceeds 4.5:1 for all normal text and 3:1 for large text.
   - Visible, accessible focus rings enabled globally via `:focus-visible` with high-visibility accent rings.
   - Full keyboard accessibility with skip link, drawer focus traps, and screen-reader `role="status"` announcements.

3. **Curated Typography Matrix**:
   - **Display Headings**: `Space Grotesk` (Weight 700/800/900). Controlled editorial hierarchy, clamp-sized to guarantee $\le 2$ lines on desktop and $\le 3$ lines on mobile.
   - **Body Copy**: High-legibility sans-serif with comfortable leading and max line width of 68ch.
   - **Technical Meta**: Monospaced uppercase tags for phase indices, categories, and coordinates.

4. **Motion Discipline**:
   - Respects `prefers-reduced-motion` at every trigger.
   - Refined word reveals and sticky architectural panels with graceful fallbacks.

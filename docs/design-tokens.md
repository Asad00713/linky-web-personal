# Linky Design Tokens

All tokens are defined in `app/globals.css` under `@theme inline` and are available as Tailwind utility classes.

---

## Colors

| Token | Utility Class | Hex | Usage |
|-------|--------------|-----|-------|
| `--color-primary` | `bg-primary` / `text-primary` | `#0052D4` | Primary CTA, buttons, links |
| `--color-primary-mid` | `bg-primary-mid` / `text-primary-mid` | `#65C7F7` | Gradient mid stop |
| `--color-primary-light` | `bg-primary-light` / `text-primary-light` | `#9CECFB` | Gradient start, highlights |
| `--color-primary-hover` | `bg-primary-hover` / `text-primary-hover` | `#0041AA` | Button hover state |
| `--color-body` | `text-body` | `#1F2323` | Default body text |
| `--color-lead` | `text-lead` | `#484F56` | Hero paragraph text |
| `--color-card-para` | `text-card-para` | `#454545` | Card paragraph text |
| `--color-eyebrow` | `text-eyebrow` | `#16B8C3` | Section label / eyebrow text |
| `--color-accent-blue` | `text-accent-blue` | `#5EA8E7` | Hero accent text, secondary highlights |

### Primary Gradient

```css
background: var(--color-primary-gradient);
/* linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) */
```

Or inline with Tailwind:
```tsx
<div style={{ background: "var(--color-primary-gradient)" }} />
```

---

## Typography

### Font

| Token | Value |
|-------|-------|
| `--font-sans` | Poppins (via `--font-poppins`) |
| `--font-mono` | Poppins (via `--font-poppins`) |

Applied globally to `<html>` via `font-sans`.

---

### Scale

#### H1 — Hero Heading

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 600 | `font-semibold` |
| Size | 77.1px | `text-h1` |
| Line height | 92.57px | `leading-h1` |
| Letter spacing | -2.3px | `tracking-h1` |

```tsx
<h1 className="text-h1 leading-h1 tracking-h1 font-semibold">
  The Future of Business Connections
</h1>
```

---

#### H2 — Section Heading

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 600 | `font-semibold` |
| Size | 32px | `text-h2` |
| Line height | 40px | `leading-h2` |
| Letter spacing | -0.64px | `tracking-h2` |
| Color | #1F2323 | `text-body` |

```tsx
<h2 className="text-h2 leading-h2 tracking-h2 font-semibold text-body">
  Everything a Member Needs
</h2>
```

---

#### Lead — Hero Paragraph

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 400 | `font-normal` |
| Size | 22px | `text-lead` |
| Line height | 32px | `leading-lead` |
| Letter spacing | -0.16px | `tracking-lead` |
| Color | #484F56 | `text-lead` |

```tsx
<p className="text-lead leading-lead tracking-lead font-normal text-lead">
  Create, share and exchange Digital Business Cards...
</p>
```

---

#### Para — Section Paragraph

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 300 | `font-light` |
| Size | 16px | `text-para` |
| Line height | 24px | `leading-para` |
| Letter spacing | 0.16px | `tracking-para` |

```tsx
<p className="text-para leading-para tracking-para font-light">
  The Path to Digital Networking...
</p>
```

---

#### Card Para — Card Body Text

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 400 | `font-normal` |
| Size | 16px | `text-card-para` |
| Line height | 20px | `leading-card-para` |
| Letter spacing | -0.16px | `tracking-card-para` |
| Color | #454545 | `text-card-para` |

```tsx
<p className="text-card-para leading-card-para tracking-card-para font-normal text-card-para">
  Use Card Swop to exchange digital cards...
</p>
```

---

#### Eyebrow — Section Label

| Property | Value | Token |
|----------|-------|-------|
| Font | Poppins | `font-sans` |
| Weight | 600 | `font-semibold` |
| Size | 16px | `text-eyebrow` |
| Line height | 24px | `leading-eyebrow` |
| Letter spacing | -0.32px | `tracking-eyebrow` |
| Color | #16B8C3 | `text-eyebrow` |

```tsx
<span className="text-eyebrow leading-eyebrow tracking-eyebrow font-semibold text-eyebrow">
  Member Benefits
</span>
```

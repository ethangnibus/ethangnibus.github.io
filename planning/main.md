# Code Review Plan

---

## 1. Inline Colors — Extract to `APP_PALETTE` / CSS vars

**Rule:** No raw color literals in component files. All colors live in `theme.ts` (`APP_PALETTE`) and are exposed as CSS vars via `CSS_VAR_MAP`. Opacity variants are fine as `rgba(var(--token-rgb), a)`.

### 1a. `ProjectCarousel.tsx` — `ARROW_STYLE` hardcodes warm-dark and accent values

```ts
// current
background: "linear-gradient(to bottom, rgba(26,18,10,0.45) 0%, rgba(26,18,10,0.7) 100%)",
border: "1px solid rgba(200,120,90,0.3)",
boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(200,120,90,0.12)",
```

- `26,18,10` is a warm near-black close to `textBodyWarm` (`#2A2014` = `42,32,20`). Add `textBodyWarmRgb: "42, 32, 20"` to `APP_PALETTE` and a `--app-text-body-warm-rgb` CSS var.
- `200,120,90` is close to `portalCosmoLight` (`#C8785A` = `200,120,90`). Add `portalCosmoLightRgb: "200, 120, 90"` to `APP_PALETTE` and a `--app-portal-cosmo-light-rgb` CSS var.
- Rewrite `ARROW_STYLE` to use `rgba(var(--app-text-body-warm-rgb), ...)` and `rgba(var(--app-portal-cosmo-light-rgb), ...)`.

### 1b. `index.css` — `.sidebar-close-btn-bark` hardcodes colors

```css
color: #1a1a1a;                              /* should be var(--app-text-default) */
border: 1px solid rgba(0,0,0,0.1);          /* introduce --app-border-subtle */
border-color: rgba(0, 0, 0, 0.1);           /* same */
inset 0 0 0 999px rgba(42, 34, 24, 0.05);  /* rgba(var(--app-text-body-warm-rgb), 0.05) */
```

- Replace `#1a1a1a` with `var(--app-text-default)`.
- Add `--app-border-subtle: rgba(0,0,0,0.1)` as a CSS var in `CSS_VAR_MAP` (allows palette transitions to tint it per-section if ever needed).
- Replace the `rgba(42, 34, 24, ...)` with `rgba(var(--app-text-body-warm-rgb), 0.05)` once the RGB token is added (see 1a).

### 1c. `BlogOutlineExplorer.tsx` — module-level color constants

```ts
const ROW_HAIRLINE     = "rgba(0,0,0,0.06)";
const ROW_HAIRLINE_OFF = "rgba(0,0,0,0)";
```

Move to `APP_PALETTE` / CSS vars: add `--app-row-hairline: rgba(0,0,0,0.06)` so it participates in future palette transitions.

---

## 2. Mobile Hover Animations

**Rule:** Transforms, letterbox bars, and scale effects driven by `:hover` / `group-hover:` must not fire on touch-only devices. Subtle background-color and text-color transitions (`hover:bg-black/[0.05]`, `hover:text-app-body`) are fine to keep on all devices.

**Fix strategy:** Add a Tailwind custom variant `can-hover` that maps to `@media (hover: hover) and (pointer: fine)` in `tailwind.config.ts`:

```ts
plugins: [
  ({ addVariant }) => {
    addVariant('can-hover', '@media (hover: hover) and (pointer: fine)');
  },
],
```

Then replace the following patterns across all affected files:

| Current class | Replacement |
|---|---|
| `group-hover:scale-[1.04]` | `can-hover:group-hover:scale-[1.04]` |
| `group-hover:scale-[1.015]` | `can-hover:group-hover:scale-[1.015]` |
| `group-hover:scale-[1.01]` | `can-hover:group-hover:scale-[1.01]` |
| `group-hover:scale-125` | `can-hover:group-hover:scale-125` |
| `group-hover:h-[8%]` (letterbox) | `can-hover:group-hover:h-[8%]` |
| `group-hover:translate-y-0` (letterbox) | `can-hover:group-hover:translate-y-0` |
| `group-hover:translate-x-0.5` | `can-hover:group-hover:translate-x-0.5` |
| `group-hover:opacity-100` (CTA bar) | `can-hover:group-hover:opacity-100` |
| `group-hover:opacity-75` | `can-hover:group-hover:opacity-75` |
| `hover:opacity-100` | `can-hover:hover:opacity-100` |
| `hover:scale-[1.03]` (in `ProjectCarousel`) | `can-hover:hover:scale-[1.03]` |

### Affected files
- `HeroProjectsCarousel.tsx` — image card hover (scale, letterbox bars, CTA opacity)
- `HeroProjectsCarousel.tsx` — strip thumbnail scale + letterbox bars
- `BlogProjectsViewer.tsx` — `LetterboxBars` `group-hover:h-[8%]`, card `hover:scale-[1.01]`
- `ProjectOverviewContent.tsx` — chapter card `hover:scale-[1.015]`
- `ChapterNavCards.tsx` — image inner div `group-hover:scale-[1.04]`
- `ChapterSideCards.tsx` — thumbnail `group-hover:scale-[1.04]`, letterbox `group-hover:translate-y-0`
- `ChapterTriptych.tsx` — `ActiveSlot` letterbox `group-hover:h-[8%]`, `LinkSlot` image scale + letterbox + arrow `group-hover:scale-125`
- `BlogOutlineExplorer.tsx` — sidebar thumbnail letterbox `group-hover:h-[8%]`
- `ProjectCarousel.tsx` — inner image `group-hover:scale-[1.03]`
- `Navbar.tsx` — brand span `group-hover:scale-[1.02]` (subtle — can stay, but apply same rule for consistency)

---

## 3. Accessibility

### 3a. `ProjectCarousel.tsx` — auto-advancing carousel must be pausable (WCAG 2.2.2)

The carousel auto-advances every 5 s with no way to pause, stop, or hide it. Required fix:
- Add a pause/resume button (e.g., a play/pause icon in the dot row) that stops the `setTimeout` loop.
- Or honor `prefers-reduced-motion`: when the media query matches, skip auto-advance entirely.
- At minimum, stop auto-advancing when the element is not visible (use `IntersectionObserver` or `document.hidden`).

### 3b. `ProjectCarousel.tsx` — no ARIA live region for slide changes

Screen readers won't announce that the slide changed. Add `aria-live="polite"` and `aria-atomic="true"` to a visually-hidden element that renders the current slide title, or use `aria-roledescription="carousel"` + `aria-label` on the container.

Reference pattern:
```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {slides[index].title} — slide {index + 1} of {slides.length}
</div>
```

### 3c. `HeroProjectsCarousel.tsx` — image-card buttons have no accessible label

Both the "about" and "project" variants of the image card button have no `aria-label`:
```tsx
<button type="button" className="block group w-full ...">
  {imageCard}
</button>
```

Fix: add `aria-label` that describes the action — e.g., `"Visit Ethan Gnibus on LinkedIn (opens in new tab)"` for the about card and `"Start reading ${project.title}"` for project cards.

### 3d. `ChapterReadingBar.tsx` — chapter number links are bare integers

```tsx
<Link key={ch.slug} to={...} title={ch.title} ...>
  {i + 1}
</Link>
```

`title` is not reliably announced. Replace with an `aria-label`:
```tsx
aria-label={`Chapter ${i + 1}: ${ch.title}`}
```

Also, the Browse/menu button is missing `type="button"` and `aria-label` for when the text is hidden on mobile:
```tsx
<button onClick={toggleBlogSidebar} ...>
  <Menu className="w-3.5 h-3.5" />
  <span className="hidden sm:inline">Browse</span>
</button>
```

Fix: add `type="button"` and `aria-label="Browse blog posts"`.

### 3e. `BlogGutterNav.tsx` — gutter buttons rely on `title` for their accessible name

```tsx
<Link to={getPagePath(previous)} title={getPageTitle(previous)}>
  <div className={`${btnBase} border opacity-50 hover:opacity-100`} ...>
    <ChevronLeft ... />
    <span style={{ fontSize: "9px" }}>PREV</span>
  </div>
</Link>
```

`title` is not reliably exposed to screen readers. Replace with `aria-label` on the `<Link>`:
```tsx
<Link to={...} aria-label={`Previous: ${getPageTitle(previous)}`}>
```

The disabled state `<div>` has no `role` and `pointer-events-none` — add `aria-hidden="true"` since it conveys no navigable action.

### 3f. `ChapterTriptych.tsx` — `LinkSlot` arrow characters read as literal text

```tsx
<span className="absolute inset-0 z-10 ... pointer-events-none">
  {direction === "prev" ? "←" : "→"}
</span>
```

The arrow is decorative (the link's label already comes from `info.label`). Mark it `aria-hidden="true"`. The same applies to `←`/`→` prefix characters in `ChapterNavCards.tsx` direction labels.

### 3g. `Sidebar.tsx` — missing `aria-controls` on the nav toggle

The Navbar's hamburger button has `aria-expanded={sidebarOpen}` but no `aria-controls`. Add `aria-controls="site-sidebar"` on the Navbar button and `id="site-sidebar"` on the `<aside>` elements in `Sidebar.tsx`.

### 3h. `ChapterNavCards.tsx` — empty placeholder divs provide no screen reader context

```tsx
<div className="p-4 md:p-5 opacity-25 select-none ...">
  <p className="app-eyebrow text-app-body mb-4">← Previous</p>
  <div className="aspect-[3/2] rounded-[3px] bg-app-body/10" />
</div>
```

Add `aria-hidden="true"` to the entire empty-state div so screen readers skip it, and use `aria-disabled="true"` or a visually-hidden "No previous chapter" message instead.

---

## 4. SOLID / DRY

### 4a. `getPageColor` is duplicated across two files

`BlogGutterNav.tsx:35` and `BlogPageNavigation.tsx:25` contain identical `getPageColor(page)` functions. Extract to a shared utility in `src/data/projects.ts` (or a new `src/utils/pageColor.ts`) and import in both places.

### 4b. `LetterboxBars` component is re-implemented in every file

Letterbox-bar markup (top + bottom `div`s that animate height or translate on hover) is copy-pasted in:
- `HeroProjectsCarousel.tsx` (image card + strip thumbnails — two different animation strategies: `translate-y-full` vs `h-0 → h-[8%]`)
- `BlogProjectsViewer.tsx` (has a local `LetterboxBars` component — good, but not reused)
- `ChapterSideCards.tsx` (uses translate strategy)
- `ChapterTriptych.tsx` (`ActiveSlot` + `LinkSlot` use height strategy)
- `BlogOutlineExplorer.tsx` (uses height strategy)

Consolidate into a single exported `LetterboxBars` component in `src/components/blog/LetterboxBars.tsx`. Accept a `strategy` prop (`"height" | "translate"`) and a `barBg` prop (color string or CSS var). All six callsites import from this one file.

### 4c. `getCardMeta` is duplicated in `ChapterNavCards` and `ChapterSideCards`

Both components define a `getCardMeta(page, fallbackProject)` function with the same branching logic (`chapter` / `project` / `projectEnd` / `end`) but slightly different output shapes. Extract the common parts (image, eyebrow, title, color, href) into a shared helper in `src/data/projects.ts` (e.g., `getPageCardMeta`) and have each component pick the fields it needs.

### 4d. `patternStyle` and `woodPatternStyle` in `PatternBackground.tsx` are identical

```ts
export function patternStyle(variant, opts?) { ... }
export function woodPatternStyle(variant, opts?) { ... } // exact same body
```

Remove `patternStyle` (or mark it `@deprecated`) and migrate all callsites to `woodPatternStyle`. This removes a redundant export that could cause confusion about which to use.

### 4e. `usePaletteTransition` does not respect `prefers-reduced-motion`

```ts
const DURATION = 700;
// ...
rafRef.current = requestAnimationFrame(tick);
```

When `prefers-reduced-motion: reduce` is set, the 700 ms interpolation loop still runs and writes intermediate CSS var values. Fix: check the media query before starting the loop and snap directly to target vars if motion should be reduced:

```ts
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  for (const [name, val] of Object.entries(targetVars)) root.style.setProperty(name, val);
  return;
}
// ... start RAF loop
```

---

## 5. Minor / Polish

### 5a. `ChapterSideCards.tsx` — inline `fontSize` as raw numbers

```tsx
style={{ fontSize: 9 }}    // eyebrow on image
style={{ fontSize: 13 }}   // title below image
```

Use `rem`-based values or CSS vars instead: `fontSize: "0.5625rem"` (9px) and `fontSize: "0.8125rem"` (13px), or better yet, add these as `--type-*` tokens in `index.css` and reference via `var(--type-micro)`.

### 5b. `ProjectCarousel.tsx` — `setLocked` pattern can deadlock on reduced motion

If `AnimatePresence`'s `onExitComplete` never fires (e.g., Framer Motion internally skipping animations for `prefers-reduced-motion`), the carousel permanently locks. Move `setLocked(false)` to also fire in a `useEffect` on `index` change as a safety fallback.

### 5c. `BlogPost.tsx` — Rules of Hooks violation risk

`BlogPost` calls `useParams`, `useLocation`, then conditionally `useLayoutEffect` — but between the hooks and the layout effect there are early returns (`if (!projectSlug || !chapterSlug)`). React's Rules of Hooks require that hooks are called unconditionally. The layout effect is called after all the early-returns, which is technically fine as-is, but the intermediate `const` declarations after conditional returns rely on the component not being a top-level hook boundary. Consider extracting `NotFound` as a sibling route and splitting `BlogPost` into a pure data-fetching shell + a content component to make the hook call order unambiguous.

# DESIGN.md — Motion & Art Direction Spec

> Drop this in the repo root. Then add this line to your `CLAUDE.md`:
>
> ```
> Before writing or editing ANY UI, animation, or CSS, read DESIGN.md in full and follow it exactly.
> Motion values are non-negotiable — import them from src/lib/motion.ts, never hardcode a duration or easing.
> ```

---

## 0. Why the current build feels "okay" and not "insane"

Three failure modes, in order of impact:

1. **Default timing.** Generic output uses ~0.3s and `ease-in-out` everywhere. Award-level motion uses 0.9–1.4s with hard-decelerating curves. This single change accounts for more of the "expensive" feeling than any library.
2. **No orchestration.** Elements animate *independently* when they enter the viewport. Reference sites animate in *sequences* — a section's headline, rule, label, and image are one timeline with staggered offsets, not four separate observers.
3. **No asset layer.** Custom video, custom SVG shapes, real renders, real footage. Code cannot substitute for this. See §2.

---

## 1. Non-negotiable principles

- **Nothing enters at full opacity from nowhere.** Every reveal has a direction, a mask, and a delay relative to its siblings.
- **Motion must be interruptible.** If a user scrolls past mid-animation, it resolves — it never blocks or replays.
- **One signature moment per page.** Pick one interaction that people screenshot. Everything else supports it quietly.
- **Scroll is the primary input.** Hover is secondary and must have a touch fallback.
- **If it doesn't run at 60fps on a mid-range Android, it ships disabled on mobile.** Not degraded — disabled, with a static equivalent.

---

## 2. Art direction slots — FILL THESE BEFORE ANY CODE

Claude Code cannot invent art direction. Leave these blank and you get generic output regardless of how good the motion spec is.

```yaml
subject:            # what this site is actually for, in one sentence
audience:           # who lands on it, and what they're deciding
single_job:         # the ONE action the page exists to produce

palette:            # 4-6 named hex values, one of them dominant by a wide margin
  base:             # e.g. #0A0A0B — the field everything sits on
  raised:           # surfaces one step up
  ink:              # primary text
  muted:            # secondary text (must pass 4.5:1 on base)
  accent:           # used on <5% of pixels
  signal:           # optional second accent, used once per page maximum

type:
  display:          # characterful. Licensed? Check the EULA for web use.
  body:             # complementary, boring on purpose
  mono:             # captions, counters, labels, indices

signature_element:  # the one thing this site is remembered by
grid:               # e.g. 12-col, 24px gutter, 1440 max, 5vw side padding
```

**Typography warning:** the fonts on high-end reference sites are usually €300–2000 foundry licenses. Self-hosting a font you found in someone's network tab is the one form of copying that will actually get you a letter. Buy the license or use a genuinely characterful open face — look at Fontshare, Pangram Pangram's free tier, or Klim's trial terms.

---

## 3. Motion system — the actual numbers

Create `src/lib/motion.ts`. Every animation imports from here. No exceptions.

```ts
export const EASE = {
  // Primary reveal — hard deceleration. This is the "expensive" curve.
  out:      [0.16, 1, 0.3, 1],        // ≈ gsap power4.out
  // Exits, collapses, things leaving the screen
  in:       [0.7, 0, 0.84, 0],        // ≈ gsap expo.in
  // Symmetric — page transitions, overlays, curtain wipes
  inOut:    [0.87, 0, 0.13, 1],       // ≈ gsap expo.inOut
  // UI feedback — buttons, cursor, small state changes
  ui:       [0.33, 1, 0.68, 1],       // ≈ gsap cubic.out
  // Signature curve — snappy start, long tail. Use sparingly, it's loud.
  hop:      [0.9, 0, 0.1, 1],
} as const

export const DUR = {
  micro:    0.35,   // hover states, cursor, toggles
  base:     0.9,    // standard element reveal
  slow:     1.25,   // section headlines, hero elements
  epic:     1.8,    // page transitions, preloader exit, curtain
} as const

export const STAGGER = {
  char:     0.025,
  word:     0.05,
  line:     0.09,
  card:     0.11,
} as const

export const LENIS = {
  lerp: 0.1,
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
} as const
```

**Rules:**
- `DUR.micro` for anything the cursor triggers. `DUR.base` or `DUR.slow` for anything scroll triggers.
- Delay between a section's first and last revealed element should land between **0.4s and 0.8s total**. Longer feels sluggish, shorter feels simultaneous.
- Never `stagger: 0.1` on 40 items — cap total stagger at ~0.9s using GSAP's `{ amount: 0.9 }` instead of a per-item value.

---

## 4. Technique library

Implement these individually, in a `/lab` route, before touching real pages.

### 4.1 Masked line reveal
Every headline. Split into lines, wrap each in `overflow: hidden`, translate the inner from `110%` to `0`.

```ts
const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
gsap.from(split.lines, {
  yPercent: 110,
  duration: DUR.slow,
  ease: 'power4.out',
  stagger: STAGGER.line,
})
```
SplitText's built-in `mask` option handles the wrapper — don't hand-roll it.

### 4.2 Duplicated-label hover roll
The reference site does this on **every single link**. The DOM literally contains `MenuMenu`, `CloseClose`, `Show moreShow more` — two copies of the label stacked in a clipped container. On hover, both translate up `100%` in one motion.

```html
<a class="roll"><span><em>Contact</em><em aria-hidden="true">Contact</em></span></a>
```
```css
.roll { overflow: hidden; display: inline-block; }
.roll span { display: block; transition: transform .4s cubic-bezier(.33,1,.68,1); }
.roll:hover span { transform: translateY(-50%); }
```
Cheap to build, enormous perceived-quality return. Do this before anything WebGL.

### 4.3 Custom SVG section transitions
Not a straight edge between sections — a shape. The reference ships `transition-dark-02.svg`, `transition-dark-03.svg`, `transition-dark-t-04.svg`, `transition-dark-b-07.svg`: hand-drawn arch/curve masks in the *next* section's colour, absolutely positioned over the boundary.

This is a **design asset, not code.** Draw 4–6 of them in Figma or Illustrator, tied to your brand's visual language. Then optionally morph them on scroll with MorphSVG.

### 4.4 Real preloader
Not a fake timer. Count actual loaded assets.

- Preload hero images + first video's `canplaythrough`, resolve a `Promise.all`
- Counter renders `Math.floor(loaded / total * 100)`
- **Minimum display 1.4s** so fast connections don't get a flash
- Exit is a curtain wipe (`DUR.epic`, `EASE.inOut`), and the hero timeline starts on its `onComplete` — never before
- Show it **once per session** (`sessionStorage`), not on every route change

The reference plays a short looping video inside the preloader. That's the move — it buys you 2 seconds of attention before the site even starts.

### 4.5 Scroll-velocity skew
Ties the whole page together. Map Lenis scroll velocity onto a subtle skew or scale on images.

```ts
lenis.on('scroll', ({ velocity }) => {
  const skew = gsap.utils.clamp(-7, 7, velocity * 0.35)
  gsap.to('.skewable', { skewY: skew, duration: 0.6, ease: 'power3.out', overwrite: true })
})
```
Clamp hard. Above ~8deg it reads as a bug.

### 4.6 Magnetic elements + custom cursor
Cursor position lerped at `0.13` per frame. Magnetic targets pull the cursor within a ~110px radius at ~0.35 strength, and translate themselves ~0.2 toward the pointer. Cursor scales and changes label on hover (`View`, `Drag`, `Play`).

Must be `@media (hover: hover) and (pointer: fine)` only.

### 4.7 Draggable inertia galleries
The reference labels these explicitly: *"hold and move"*, *"drag to scroll"*. Draggable + InertiaPlugin (both free now), with an `01 / 08` counter in mono type. The counter is what makes it feel considered.

### 4.8 Marquee
The reference repeats one headline five times in the DOM — a seamless marquee. Direction reverses on scroll direction change. One per page maximum.

### 4.9 Animated counters
Stats count up on enter with `snap: { textContent: 1 }`, `DUR.slow`, `power2.out`. The reference duplicates each stat block for a flip-on-hover state.

### 4.10 Film grain
SVG `feTurbulence` overlay, `opacity: 0.04`, `mix-blend-mode: overlay`, `pointer-events: none`, fixed full-viewport. Animate the `seed` at ~8fps for real film flicker. Unifies mismatched photography instantly.

### 4.11 Page transitions
App Router: an overlay in the root layout that plays out → route change → plays in. `next-view-transitions` is the low-effort path; a persistent overlay component you drive manually gives more control. Scroll position resets *under* the covering overlay, never in view.

### 4.12 WebGL layer — last, not first
Only after 4.1–4.11 are solid. `@react-three/fiber` + `drei`, or OGL if you want ~10kb instead of ~600kb.

Worth it: displacement-map image transitions, curl-noise particle fields, fluid cursor trails, RGB-shift driven by scroll velocity.

Not worth it: a rotating 3D blob. That reads as 2019.

---

## 5. Stack

```
next 15 (app router) + typescript
gsap 3.13+          — core, ScrollTrigger, SplitText, Draggable, InertiaPlugin, CustomEase, Flip
@gsap/react         — useGSAP() hook, handles cleanup
lenis               — smooth scroll (NOT ScrollSmoother if using Lenis; pick one)
tailwind            — layout only, never for motion
@react-three/fiber  — only if §4.12 applies
```

GSAP including every former Club plugin is free for commercial use since April 2025 (Webflow acquisition). No token, no watermark. Install the plain `gsap` package.

**Lenis ↔ ScrollTrigger sync — get this exactly right or scroll animations will jitter:**

```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 6. Performance contract

- Animate **only** `transform`, `opacity`, `filter`, `clip-path`. Never `top`, `left`, `width`, `height`, `margin`.
- `will-change` applied on animation start, removed on complete. Never left in CSS permanently.
- Hero LCP is a **poster image**, not a video. Video fades in after `canplaythrough`.
- Images: AVIF with WebP fallback, `next/image`, explicit `sizes`, `priority` on hero only.
- Video: `muted playsinline preload="none"` below the fold. Compress hard — 1080p at ~2.5Mbps.
- Every `ScrollTrigger` and `gsap.context` cleaned up in `useGSAP`'s scope.
- Budget: LCP < 2.5s, CLS < 0.05, INP < 200ms. Run Lighthouse mobile after every section.

---

## 7. Accessibility floor

```ts
gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
  // elements appear at final state instantly — visible, not hidden
})
```

- Reduced motion means **no movement**, not **no content**.
- Visible keyboard focus rings. Custom cursor never removes them.
- Smooth scroll disabled under reduced motion.
- Preloader never traps focus; content is in the DOM behind it.
- Decorative SVG and duplicated hover labels get `aria-hidden="true"`.

---

## 8. Working protocol for Claude Code

**The single biggest change: stop asking for outcomes, start asking for mechanisms.**

❌ "make the hero more stunning"
✅ "Hero headline: SplitText lines with mask. yPercent 110 → 0, duration 1.25, power4.out, stagger 0.09. Eyebrow label fades and slides x:-20 starting at -0.6 relative. Hero image scales 1.15 → 1 over 1.8s, same start. Whole timeline waits on preloader onComplete."

**Session rules:**

1. **One component per session.** Never "build the site."
2. **Build in `/lab` first.** A route that renders each technique in isolation. Approve it there, then integrate.
3. **`motion.ts` and the token file are read-only** to Claude Code. If it wants a new value, it asks.
4. **Demand a critique pass.** After each component: *"Review this against DESIGN.md §3 and §6. List every hardcoded duration, every non-transform property being animated, and every uncleaned ScrollTrigger."*
5. **Screenshots beat descriptions.** Feed it a screenshot of what it built and one of what you want.
6. **Keep a `NOTES.md`** of what's been tried and rejected, so you don't loop.

**Prompt template:**

```
Component: [name]
Section: DESIGN.md §[x.y]
Trigger: [scroll enter at 80% / hover / page load]
Timeline:
  0.00  [element] [property from → to] [DUR.x] [EASE.y]
  0.15  [element] ...
Stagger: STAGGER.[type]
Mobile: [disabled / simplified to X]
Reduced motion: [final state, no movement]
Cleanup: useGSAP scope
```

---

## 9. Reference library

| Source | Use for |
|---|---|
| tympanus.net/codrops | The best source that exists. Full tutorials + source for exactly these techniques. |
| osmo.supply | Free copy-paste components from a working award-site studio. |
| gsap.com/showcase + docs | Plugin docs, especially SplitText, Draggable, Flip. |
| awwwards.com / godly.website | Reference hunting. Save 20 sites, then extract the *pattern* each one uses. |
| Codegrid (YouTube) | Step-by-step builds of the exact devices in §4. |
| easings.net + cubic-bezier.com | Tuning curves by feel. |
| shadertoy.com | Shader source for §4.12. |

**How to reference-hunt properly:** don't save a site because it looks good. Open devtools, find the *one device* doing the heavy lifting, write it down as a mechanism, and add it to §4. A library of 30 mechanisms beats a mood board of 30 screenshots.

---

## 10. Definition of done

A section ships when:

- [ ] It reads correctly with JavaScript disabled
- [ ] It reads correctly under `prefers-reduced-motion`
- [ ] Nothing animates on a non-GPU property
- [ ] All ScrollTriggers are cleaned up on unmount
- [ ] It holds 60fps in Chrome Performance with 4x CPU throttle
- [ ] Total stagger for the section is between 0.4s and 0.8s
- [ ] Zero hardcoded durations or easings — everything from `motion.ts`
- [ ] Keyboard focus is visible and the tab order is correct
- [ ] Tested on a real mid-range Android, not just a simulator

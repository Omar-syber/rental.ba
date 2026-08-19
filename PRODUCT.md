# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, JavaScript, no TypeScript), React 19. No CSS framework: hand-written global CSS with custom properties. GSAP + ScrollTrigger and Lenis for scroll-driven animation and smooth scroll. next/font for type loading. Chosen by the user over a plain static HTML/CSS/JS build when offered the choice, for a more idiomatic component codebase to keep extending.

## Users

Two audiences, in two different contexts:

- **The real audience: boutique/luxury real estate agencies**, evaluated by the site's owner as sales-pitch prospects. They see this demo during a pitch meeting or as a shared link, judging it as evidence of the design quality they'd receive if they hired the owner to build their real agency site.
- **The in-fiction audience: home buyers and sellers** browsing "Thornfield Estates," a fictional agency. The demo has to hold up as a real, working consumer-facing real-estate site (listings, agents, contact flow), not just look good in screenshots, because the prospects are judging it as a working product.

## Product Purpose

A white-label real-estate agency template used as sales-pitch proof. Its job is to demonstrate, concretely, the visual and interaction quality a prospective real-estate client can expect from the owner's design work, using a fictional agency ("Thornfield Estates") as the running example. Success is a prospective agency looking at it and believing the same craft will show up in their own site.

## Positioning

Not a generic real-estate template: it borrows the interaction language of a specific award-caliber reference (Son Daven, sondaven.com) - a custom canvas "bar-field" rendering engine used for the loader, hero wordmark, and decorative art; a pinned zoom-parallax hero; scroll-lit editorial text; a full-screen stagger menu; ambient background motion; and parallax/tilt on every image - and applies that level of craft to an ordinary agency-website brief. The claim to prospects: "this is the ceiling of what I build, applied to your category."

## Operating Context

Shown live in a browser during or ahead of a sales conversation (screen share, in-person laptop, or a shared local/deployed link), not as static screenshots or a PDF. Needs to survive a prospect actually scrolling, clicking listings, opening the mobile menu, and submitting the contact form. No backend: the contact form is a client-side demo only (no real submission), and all listings, agents, testimonials, and stats are fabricated placeholder content, not a real agency's data.

## Capabilities and Constraints

- Single marketing page: hero, prologue statement, stats, listings grid, differentiators, process, neighborhood gallery, team, testimonials, contact form, footer.
- Must stay easy to re-skin per prospect: brand name, copy, palette, listings, team, and testimonials should stay swappable (content lives in `lib/data.js`; brand tokens in CSS custom properties) rather than hard-coded inline through the templates, so a future pitch can fork it for a specific agency without a rebuild from scratch.
- No CMS or database; content is static, edited in source.
- No real backend integration (forms, listings, auth) - decorative/demo only unless a specific pitch requires wiring one up.
- Undecided: no deploy target chosen yet; runs locally via `npm run dev`.

## Brand Commitments

Fictional demo brand: "Thornfield Estates," tagline "Real estate, considered." Boutique-agency register (not a national chain, not budget/discount). Wordmark rendered both as normal type and as the custom bar-field texture. These are the current placeholder identity, expected to be swapped for a real prospect's name and voice when the template is forked for an actual pitch.

## Evidence on Hand

No real customer, listing, or agency data. All photography is stock (Unsplash, hotlinked); all listings, agent names/photos, testimonials, and stats (years in business, homes closed, etc.) are fabricated for demo purposes and must not be treated as real facts to preserve - they're placeholders, swappable per pitch.

## Product Principles

- Craft is the pitch. Every interaction (loader, scroll, hover, form) has to read as intentional and polished, since sloppiness here directly undercuts the sales claim.
- Built to be forked, not framed. Content and brand tokens stay separable from layout/motion code so a specific prospect's name, palette, and listings can replace Thornfield's without touching the animation system.
- Premium without cosplay. The boutique/luxury register (editorial type, cinematic motion, restrained palette) is a deliberate ceiling demo for high-end agencies, not a claim that every future fork needs to look identical.
- Real interaction over static comps. It has to work as a real, scrollable, clickable site - a prospect judges the felt experience, not a screenshot.

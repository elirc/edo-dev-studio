# edo-dev — the new website

This folder documents the redesigned edo-dev site: what it is, how it is built, what was changed in the September 2026 review, and everything a web developer needs to own and maintain it.

> **Status note (2026-10-06):** This guide was re-checked against `main` @ `80683a4`. Section 2 is the dated record of the 4 September design review and was left as written. After that review, an improvement pass did three things: it switched the fonts to local files, added the Playwright suite in `qa/tests/`, and added a Content Security Policy. Section 3 has been corrected to match that code. Sections 5-7 are new: two traced walkthroughs, review notes, and exercises. The root [README](../README.md) remains the short run/check reference.

Contents

1. [The new website](#1-the-new-website)
2. [What changed in this review](#2-what-changed-in-this-review)
3. [Codebase guide for the maintaining developer](#3-codebase-guide-for-the-maintaining-developer)
4. [Before going live](#4-before-going-live)
5. [Walkthroughs](#5-walkthroughs)
6. [Review notes](#6-review-notes)
7. [Exercises](#7-exercises)

---

## 1. The new website

### Purpose

edo-dev is the one-person web studio of Edoardo Triveri, who designs and builds websites for independent restaurants in Italy. The site has one job: make a restaurant owner trust Edoardo enough to book a free 15-minute call or send an email.

The previous edo-dev.com was a dark, gold-accented, sales-driven page (hero: "Il tuo ristorante è pieno il sabato. Ma gli altri giorni?", KPI counters, city-landing pages, a cookie banner). The redesign is the opposite in tone: a calm editorial site that shows craft instead of claiming results. It borrows the register of high-end restaurant sites (serif display type, photography, generous whitespace) so that the studio itself looks like the kind of website it sells.

### Audience and language

Italian only. Written for restaurateurs, not developers: no jargon, short sentences, honest framing. The site deliberately avoids unverifiable claims (no testimonials, no client logos, no "90+ pages ranked" counters). The two case studies are declared as fictional concepts on every page where they appear.

### Design language

| Element           | Choice                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Palette           | Warm paper `#f5f2eb`, deep green ink `#29352b`, olive `#29392d` for dark bands, brick red `#b04d33` accent, peach `#e5ad8a` on dark |
| Display type      | Cormorant Garamond (serif), weight 400, tight tracking, italic `<em>` in red for the second line of every heading                   |
| Body type         | Manrope (sans), 16px base                                                                                                           |
| Layout            | 1320px container, single-column editorial rhythm, dark olive bands for "Cosa faccio", pricing and the closing call to action        |
| Signature details | Asterisk glyph, "e." monogram, hairline rules, rectangular buttons (no radius), tilted mock-browser previews of the concept sites   |
| Motion            | Small hover translations only; everything is disabled under `prefers-reduced-motion`                                                |

### Pages

| Route                                                          | What it does                                                                                                                                                                                                                               |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                                            | Hero, three-value strip, the two concepts, four service rows (dark band), four-step process, founder note, four FAQs, three guide teasers, closing CTA                                                                                     |
| `/lavori`                                                      | Both concepts with a transparency note stating they are fictional                                                                                                                                                                          |
| `/lavori/[slug]`                                               | Case page per concept: large mock-browser preview, direction, three design decisions, link to the live demo                                                                                                                                |
| `/concept/[slug]`                                              | A complete standalone fake restaurant website (Casa Lino or Onda) with hero, story, tabbed menu, and a booking section that explains it cannot book. `noindex`. The studio header and footer are hidden here; a thin notice bar links back |
| `/servizi`                                                     | The four parts of a project, optional extras, how pricing works (quote after a first call), process, all five FAQs                                                                                                                         |
| `/chi-sono`                                                    | Edoardo's approach in three principles                                                                                                                                                                                                     |
| `/guide` and `/guide/[slug]`                                   | Three short practical guides (mobile menus, direct bookings, Google Business Profile). Each has Article structured data                                                                                                                    |
| `/contatti`                                                    | Two options (Calendly call or email) and a form that composes an email in the visitor's own mail app. No data is sent to any server                                                                                                        |
| `/privacy`                                                     | Draft notice, clearly marked as incomplete. `noindex`                                                                                                                                                                                      |
| `/opengraph-image`, `/icon.svg`, `/sitemap.xml`, `/robots.txt` | Generated by Next.js from code                                                                                                                                                                                                             |

### How leads are captured

There is no backend. The contact form builds a `mailto:` link with subject and body pre-filled and shows a preview the visitor can edit or copy before opening their mail app. Calendly is linked, not embedded, so there are no third-party scripts and no cookie banner is needed.

### SEO and migration from the old site

- Every page sets title, description, canonical URL and social metadata via `pageMeta()`; the root layout adds linked `Organization`, `Person`, and `Service` structured data.
- `next.config.ts` holds permanent redirects from the old site's URLs (blog posts, city landing pages, cookie/privacy policy) to the closest new page, so existing rankings and backlinks are not lost.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, and a `Content-Security-Policy` with `form-action 'none'` and `frame-ancestors 'none'`) are set for all routes (`next.config.ts:5-16`, `:96-112`). `qa/tests/routes.spec.ts` checks them.

---

## 2. What changed in this review

The review was done on 4 September 2026 against a local production build (`next build` + `next start`), with full-page screenshots at 1440px and 390px for every route and an axe-core accessibility audit (WCAG 2.1 AA + best practices).

### Design and readability

- **Type size floor raised across the site.** The original stylesheet set much essential text at 7 to 13px on desktop and 6 to 12px on mobile (navigation 12px, buttons 12px, footer 8px, labels 8 to 10px, FAQ questions 13px). A systematic pass raised 216 declarations: 6→8, 7→9, 8→10, 9→11, 10→11, 11→12, 12→13, 13→14px, and body text 15→16px (14→15px on mobile). Headings and layout were untouched, so the composition is the same, just legible. Decorative text inside the mock-browser previews was intentionally left as-is.
- **Interaction states completed.** Hover colour on the header CTA, text links, FAQ questions, contact options, menu tabs and demo booking button; arrow icons nudge on hover; inputs darken their border on hover and focus. Headings use `text-wrap: balance`.
- **Heading order fixed on `/lavori`.** The page jumped from `h1` to `h3`. `ProjectCard` now accepts `headingLevel` and the work page passes `h2`. axe now reports zero violations on every route at both widths.

### Code quality

- **Concept content moved into data.** `ProjectPreview` and `RestaurantDemo` used to branch on `project.name === "Onda"` with copy hardcoded in JSX, and dishes lived in the component. All of it now sits under `projects[n].demo` in `lib/site.ts` with a typed `Project` shape. Adding a third concept is a data change plus two CSS colour classes.
- **`/concept/[slug]` derives its params and metadata from `projects`** instead of a hardcoded slug list. Helper functions `findProject()` and `findGuide()` replace repeated `.find()` calls.
- **Prettier added** (`npm run format`, `npm run format:check`) with default settings, matching the formatting already applied to the pages.
- **QA scripts added** in `qa/` (screenshots and axe audit, see below).

### Verified

As recorded on 4 September 2026. The route count and the axe audit come from that build. The maintained checks are now `npm test` and `npm run test:visual` (see section 3).

| Check                             | Result                                    |
| --------------------------------- | ----------------------------------------- |
| `npm run typecheck`               | passes                                    |
| `npm run lint`                    | passes                                    |
| `npm run build`                   | 20 routes, all static                     |
| axe-core, 11 routes × 2 viewports | 0 violations                              |
| Horizontal overflow at 390px      | none                                      |
| Console errors                    | none (only the intentional 404 test page) |

---

## 3. Codebase guide for the maintaining developer

### Stack

- **Next.js 16.3** (App Router, React Server Components, Turbopack build) with **React 19** and **TypeScript 5.9**, strict mode.
- **No CSS framework, no UI library, no state library.** There is one hand-written stylesheet using plain CSS custom properties. Two font families (Manrope and Cormorant Garamond) are loaded from `assets/fonts/` through `next/font/local` (`app/layout.tsx:8-31`), so builds never download fonts.
- **Zero runtime dependencies beyond Next and React** (`next` 16.3.4, `react`/`react-dom` ^19.2). Dev dependencies: ESLint with `eslint-config-next`, Prettier, TypeScript, `@playwright/test`, `@axe-core/playwright`, and `@types/*`.
- `package.json` has no `engines` field. `@types/node` is ^24, which matches the Node 24 the project was built with.

Read `node_modules/next/dist/docs/` before relying on memory of older Next.js versions. `AGENTS.md` in the root is regenerated by `next dev` and says the same thing.

### Commands

```powershell
npm ci
npm run dev          # next dev --webpack, on port 3000 (bound to 0.0.0.0)
npm run build        # production build into .next/
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # next typegen, then tsc --noEmit
npm run format       # prettier --write .
npm run format:check
npm test             # Playwright suite in qa/tests/, minus the screenshot comparisons
npm run test:visual  # qa/tests/appearance.spec.ts only (Windows/Edge baselines)
npm run test:a11y    # only the "accessibility: <route>" tests
npm run screenshots  # ad-hoc screenshots of an already running server
```

Build before running `npm test`. `playwright.config.ts` starts `next start` on `127.0.0.1:3210` itself, with one worker, unless `TEST_BASE_URL` is set. On Windows it uses the installed Edge browser (`channel: "msedge"`).

### Folder map

```
app/                    Routes (App Router). One folder per URL segment.
  layout.tsx            Root layout: local fonts, metadata defaults, JSON-LD
  globals.css           The entire stylesheet (~4,100 lines, see "Styling")
  (studio)/layout.tsx   Shared studio Header / main / Footer
  (studio)/page.tsx     Home (the route group does not change URLs)
  (studio)/chi-sono/  contatti/  guide/  lavori/  privacy/  servizi/
  concept/layout.tsx   Separate main landmark for restaurant demos
  concept/[slug]/      Standalone fictional restaurant sites
  not-found.tsx         404
  icon.svg              Favicon (served at /icon.svg)
  opengraph-image.tsx   Social share image, rendered with next/og
  robots.ts  sitemap.ts
components/
  header.tsx            Client component: sticky header, mobile menu, active link
  footer.tsx            Server component, used only by the studio layout
  ui.tsx                Server components: Eyebrow, ContactBand, Faq, PageIntro,
                        ProjectPreview (mock browser), ProjectCard, Process
  contact-form.tsx      Client component: form -> mailto preview
  restaurant-demo.tsx   Server component: static restaurant content
  restaurant-interactions.tsx  Client menu tabs and booking disclosure
  icons.tsx             Arrow and Asterisk SVGs
lib/
  config.ts             Verified public contact details
  metadata.ts           Shared canonical and social metadata builder
  site.ts               Content and types: faqs, projects (+demo), guides
assets/fonts/           Original font files with their licenses (no build-time download)
public/images/          Two generated WebP photos (1536×1024)
qa/                     Maintained browser, accessibility and screenshot tests
claude docs/            This documentation
next.config.ts          Redirects from the old site, security headers
```

### Where the content lives

Almost every string a client might ask you to change is either in `lib/site.ts` or in the page file for that route.

`lib/site.ts` exports the following. `site` is defined in `lib/config.ts` and `pageMeta` in `lib/metadata.ts`; `lib/site.ts:1-2` re-exports both, so pages can import everything from one place.

| Export                                           | Used by                                                       | Notes                                                           |
| ------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------- |
| `site`                                           | layout, footer, contact, privacy                              | Name, URL, email, founder, Calendly link, Instagram             |
| `pageMeta(title, description, path, type?)`      | every page                                                    | Builds the `Metadata` object; keeps canonical and OG consistent |
| `faqs`                                           | `Faq` component                                               | Home shows the first four, `/servizi` shows all                 |
| `projects` (`Project[]`)                         | home, `/lavori`, `/lavori/[slug]`, `/concept/[slug]`, sitemap | See below                                                       |
| `guides` (`Guide[]`)                             | `/guide`, `/guide/[slug]`, home teasers, sitemap              | `source` is optional                                            |
| `menuCategories`, `findProject()`, `findGuide()` | demo, dynamic routes                                          |                                                                 |

A `Project` has the public fields (`slug`, `name`, `category`, `tagline`, `description`, `focus`, `image`, `color`) and a `demo` object with everything the fake restaurant site needs: `wordmark`, `descriptor`, `kicker`, `headline` (two lines, second is italic), `lead`, `motto`, `mockNote`, `heroImageAlt`, `story`, and `dishes` keyed by menu category.

**To add a concept:** append a `Project` to `projects`, add its photo to `public/images/`, and add CSS for its colour: `.project-visual.<color>`, `.<color> .mock-*` overrides and `.demo-<color>` variables, modelled on the `.onda` rules. `color` is typed as `"lino" | "onda"`, so widen that union. Everything else in the app (routes, sitemap, metadata, the "other concept" link) follows automatically. **The QA suite does not.** `qa/routes.mjs` is a hard-coded list, and the sitemap test compares `/sitemap.xml` against it (`qa/tests/routes.spec.ts:105-122`). Add `/lavori/<slug>` and `/concept/<slug>` there, or `npm test` fails.

**To add a guide:** append to `guides`. The `number` field is the display number shown in the index. Add `/guide/<slug>` to `qa/routes.mjs` for the same reason as above.

**To change the process steps, service rows or the four service blocks on `/servizi`:** those are inline arrays in `components/ui.tsx` (`Process`), `app/(studio)/page.tsx` and `app/(studio)/servizi/page.tsx`. They were left inline because they belong to one page only.

### Rendering model

- Pages are **static**. Every route is prerendered at build time (`○` and `●` in the build output). There is no server code at request time apart from redirects and headers, so hosting can be Vercel, any Node host running `next start`, or a container.
- Dynamic routes (`[slug]`) implement `generateStaticParams` from the data arrays and call `notFound()` for unknown slugs.
- Client components are limited to interactive controls (header, contact form, restaurant menu/booking) and error boundaries. The footer and the rest of each restaurant demo now render on the server.
- `params` is a Promise in Next 16: always `const { slug } = await params`.

### Styling

Everything is in `app/globals.css`, organised in commented sections:

1. Tokens (`:root`), reset, base typography, shared primitives (`.container`, `.section`, `.button`, `.text-link`, `.eyebrow`, `.micro`, `.circle-link`, `.check-list`)
2. Navigation
3. First impression (hero, intro strip)
4. Work (project grid, mock browser, case pages)
5. Service, process and people (dark band, process grid, founder note, FAQ, guides, contact band)
6. Footer
7. Interior pages (page intro, services, about, guides, article, legal, 404)
8. Contact
9. Standalone restaurant demonstrations (`.restaurant-demo`, `.demo-*`)
10. Media queries, starting at the "Tablet and compact desktop" comment (line 2101): `min-width: 1500px`, then `max-width: 1200px`, `1000px`, `700px` (the "Mobile: its own composition" block, from line 2703), and `370px`
11. Refinements: interaction states added in the review (line 4023), then `prefers-reduced-motion` (line 4099). These come after the media queries, so a refinement rule wins over a breakpoint rule of equal specificity.

Conventions worth knowing:

- Sizes are in **px** on purpose; the design was tuned per breakpoint rather than with fluid `clamp()` values. When you change a size, check the same selector in each media query below it.
- Colour comes from the tokens at the top. Dark bands use `--olive`; text on dark uses hard-coded light greens (`#c3ccbb` family) because they were tuned for contrast on that exact green.
- The mock browser (`.mock-*`, `.browser-bar`) is a miniature website rendered with real HTML and scaled with small font sizes. Its text is decorative; the readable version of that content is the `/concept` page.
- `.demo-lino` / `.demo-onda` set `--demo-ink` and `--demo-paper` so the concept site can be recoloured with two variables.
- Headings use `<br />` for deliberate line breaks and `<em>` for the italic red second line. `h1` and `h2` have `text-wrap: balance`.
- Studio pages live under `app/(studio)/`, which adds the shared header and footer. `app/concept/` has a separate nested layout, so it needs no pathname checks to hide studio elements. Public URLs are unchanged.

### Images

Two WebP photos, both AI-generated and declared as such in the copy. They are used with `next/image` `fill`, so every parent has `position: relative` and a fixed height or aspect ratio. If you add real photography, keep width around 1600px, export WebP at quality 75 to 80, and update the `alt` texts (they currently say "Immagine generata").

### Metadata and SEO

- Defaults and the title template live in `app/layout.tsx`. Per-page values go through `pageMeta()`.
- `/concept/*` and `/privacy` are `noindex, follow` and excluded from the sitemap.
- The Open Graph image is code (`app/opengraph-image.tsx`); it uses a slightly different cream/green palette than the CSS tokens. Align them if you change the brand colours.
- Old-site redirects are in `next.config.ts`. Keep them at least a year after launch.

### Accessibility notes

- Skip link, `aria-current` on active nav links, labelled navigation landmarks, `aria-expanded` on toggles, real `<details>` for FAQs.
- The menu tabs in the demo implement the ARIA tabs pattern with roving `tabIndex` and arrow-key navigation.
- The contact form moves focus to the preview heading after "Prepara il messaggio" and back to the first field on "Torna al modulo".
- All animation and smooth scrolling are disabled under `prefers-reduced-motion`.

### QA scripts

The maintained suite is under `qa/tests/`:

- `routes.spec.ts` runs, for every route in `qa/routes.mjs` (14 routes), a page/metadata/layout test and an axe "accessibility" test. It also checks real 404s, the sitemap, the security headers, and every legacy redirect (each one must return 308).
- `interactions.spec.ts` (6 tests) covers the contact composer, the clipboard-failure path, JavaScript-disabled behavior, the mobile menu, and client navigation between the studio and demo layouts.
- `appearance.spec.ts` compares screenshots against the PNG baselines committed next to it. These are 8 Windows/Edge images (4 routes at 1440px and 390px).

The standalone scripts `qa/screenshots.mjs` and `qa/axe.mjs` run against an already running server (`BASE`, default `http://localhost:3000`). `qa/axe.mjs` exits 1 on any violation. `qa/screenshots/` is git-ignored.

### Gotchas

- `npm run dev` uses `--webpack`; the production build uses Turbopack. If dev and build ever disagree, trust the build.
- `next dev` rewrites `AGENTS.md`; commit it rather than fighting it.
- `CLAUDE.md` only imports `AGENTS.md`.
- `npm run typecheck` generates current route types before checking TypeScript. `.next/dev` is excluded so stale development types cannot corrupt production checks.
- The stylesheet is large but flat. Search by class name; there is no nesting or preprocessor.

---

## 4. Before going live

- [ ] Replace or complement the two fictional concepts with commissioned work, and remove the transparency notes only for real projects.
- [ ] Add a real founder portrait to `/chi-sono` (the current page uses a typographic block instead).
- [ ] Finish `/privacy` with the actual hosting provider, retention periods and legal basis, then remove `noindex` if desired.
- [ ] Decide whether the contact form should submit server-side (Resend, Formspree, or a route handler). Today it only prepares an email.
- [ ] Set up the domain, verify Search Console, and submit `/sitemap.xml`.
- [ ] Run `qa/axe.mjs` and `qa/screenshots.mjs` after any visual change.

---

## 5. Walkthroughs

### From data to page: `/guide/menu-digitale-ristorante`

1. **Data.** The guide is one object in `guides` (`lib/site.ts:193`), typed by `Guide` (`lib/site.ts:182-191`).
2. **Static params.** `generateStaticParams` maps every guide to a slug (`app/(studio)/guide/[slug]/page.tsx:7-9`), so `next build` prerenders one HTML page per guide.
3. **Metadata.** `generateMetadata` awaits `params` (a Promise in Next 16), looks the guide up with `findGuide` (`lib/site.ts:281`), and returns `pageMeta(..., "article")` (`page.tsx:10-19`). `pageMeta` (`lib/metadata.ts:11-40`) builds the canonical URL from `site.url` and adds Open Graph article authors for `type === "article"`.
4. **Body and schema.** The page renders the sections and an `Article` JSON-LD object that points at the `#edoardo` and `#studio` ids defined in the root layout (`page.tsx:28-43`).
5. **Layout.** The route sits under `app/(studio)/`, so `StudioLayout` wraps it in `SiteFrame`: header, `<main id="main-content">`, footer (`app/(studio)/layout.tsx:8`, `components/site-frame.tsx:4-13`). `/concept/*` uses its own `ConceptLayout`, which renders only a `<main>` (`app/concept/layout.tsx:6-10`). That is how the demos hide the studio chrome without checking the pathname.
6. **Discovery.** `app/sitemap.ts` lists the static pages plus every project and guide slug. `/concept/*` and `/privacy` are left out because they are `noindex`.

### The contact composer (`components/contact-form.tsx`)

1. **Hydration gate.** `useSyncExternalStore` with a server snapshot of `false` (`:13-17`) keeps the submit button disabled and labelled "Caricamento del modulo…" until React hydrates (`:260-261`). Without JavaScript, the form has `method="post"` (`:162`), but the CSP's `form-action 'none'` blocks a native submit, so no data can leave the page.
2. **Validate.** `prepare` (`:67-98`) trims every field. It rejects whitespace-only name/restaurant values and messages shorter than 10 characters with `setCustomValidity` + `reportValidity` (`:73-86`).
3. **Preserve edits.** The serialized form values are compared with `preparedValues` (`:88-94`). If you go back to the form and return without changing anything, any edits you made in the preview textarea survive.
4. **Hand off.** The preview builds a `mailto:` link with `encodeURIComponent` for subject and body (`:124`). The copy button (`copy`, `:52-66`) uses a counter, `copyOperation`, so a slow clipboard promise cannot overwrite a newer state. On failure it selects the text and explains how to copy it manually.
5. **Focus.** A `useEffect` moves focus to the preview heading on prepare, and back to the name input on "Torna al modulo" (`:37-42`).

---

## 6. Review notes

These were verified against `80683a4` on 2026-10-06.

1. **The QA route list is a second source of truth.** `qa/routes.mjs` hard-codes 14 routes. The app derives its routes, and the sitemap, from `projects` and `guides`. The sitemap test (`qa/tests/routes.spec.ts:105-122`) therefore fails as soon as content is added and the QA list is not updated. Deriving `routes.mjs` from `lib/site.ts` is awkward because it is plain `.mjs` importing TypeScript. Documenting the step (section 3) is the cheap fix.
2. **FAQ numbering assumes fewer than ten items.** `Faq` renders `0{index + 1}` (`components/ui.tsx:63`), so a tenth FAQ would show `010`. There are five today.
3. **The CSP keeps `'unsafe-inline'` for scripts** (`next.config.ts:7`). That is needed for Next's inline bootstrap on a fully static site without nonces, and the code comment says so. Treat it as a deliberate trade-off. Adding any third-party script means revisiting it.
4. **Redirect order matters.** The catch-all `/blog/:slug` (`next.config.ts`) is listed after the specific `/blog/...` mappings. If you move it up, those mappings stop matching. The "legacy URLs" test in `routes.spec.ts` would catch this.
5. **The Open Graph palette is separate from the CSS tokens** (`app/opengraph-image.tsx` vs `:root` in `app/globals.css`). Section 3 already flags this. No test compares the two.

---

## 7. Exercises

Run `npm ci` once. Each **Check** uses only the repo's own scripts. Run `npm run build` before `npm test`.

### 7.1 Add a sixth FAQ (easy)

**Goal:** Add one more question and answer.
**Hints:** Append to `faqs` in `lib/site.ts`. `Faq` shows the first four on the home page and all of them on `/servizi` (`components/ui.tsx:57-60`).
**Check:** After `npm run build && npm run start`, `/servizi` shows six `<details>` elements in `.faq-list` and `/` still shows four. `npm test` stays green.

### 7.2 Add a fourth guide, including QA (easy-medium)

**Goal:** Publish a new guide at `/guide/<your-slug>`.
**Hints:** Fill every required `Guide` field (`lib/site.ts:182-191`). Then add the route to `qa/routes.mjs`. Run the tests _before_ updating `qa/routes.mjs` once, to see the sitemap test fail.
**Check:** `npm run build` lists `/guide/<your-slug>` among the prerendered routes. `npm test` passes, including `page, metadata and responsive layout: /guide/<your-slug>` and the sitemap test.

### 7.3 Redirect another old URL (medium)

**Goal:** Permanently redirect a hypothetical old page `/siti-web-bar` to `/servizi`.
**Hints:** Add it to `redirects()` in `next.config.ts`, above any rule that could match it first, and add the pair to the `mappings` array in the "legacy URLs retain their permanent redirects" test.
**Check:** `npm run build && npm test`. The legacy-URL test asserts a `308` and the new `location` header for your path.

### 7.4 Pin the FAQ numbering (medium)

**Goal:** Fix review note 2 so numbering stays two digits for any count.
**Hints:** `String(index + 1).padStart(2, "0")`. Do not change the visual output for the existing five items.
**Check:** `npm run test:visual` still passes on Windows/Edge (the first four FAQ numbers on `/` are unchanged), and `npm run lint && npm run typecheck` pass.

### 7.5 Add a third concept restaurant (hard)

**Goal:** Add a third fictional concept end to end.
**Hints:**

- Widen `color` in `Project` (`lib/site.ts:46`).
- Add the `.project-visual.<color>`, `.<color> .mock-*` and `.demo-<color>` CSS, modelled on `.onda`.
- Add a WebP image under `public/images/`.
- Add both `/lavori/<slug>` and `/concept/<slug>` to `qa/routes.mjs`.
- Mark the concept as fictional, as the other two are.

**Check:** `npm run typecheck` passes. `npm run build` prerenders both new routes. `npm test` passes, including the axe "accessibility" test for both new routes and the sitemap test. The sitemap must include `/lavori/<slug>` but not `/concept/<slug>`.

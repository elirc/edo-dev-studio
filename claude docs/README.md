# edo-dev — the new website

This folder documents the redesigned edo-dev site: what it is, how it is built, what was changed in the September 2026 review, and everything a web developer needs to own and maintain it.

Contents

1. [The new website](#1-the-new-website)
2. [What changed in this review](#2-what-changed-in-this-review)
3. [Codebase guide for the maintaining developer](#3-codebase-guide-for-the-maintaining-developer)
4. [Before going live](#4-before-going-live)

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
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`) are set for all routes.

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
- **No CSS framework, no UI library, no state library.** One hand-written stylesheet, plain CSS custom properties, two Google fonts loaded through `next/font`.
- **Zero runtime dependencies beyond Next and React.** Dev dependencies: ESLint (Next config), Prettier, TypeScript.
- Node 24 is what the project was built with; Node 20+ should work.

Read `node_modules/next/dist/docs/` before relying on memory of older Next.js versions. `AGENTS.md` in the root is regenerated by `next dev` and says the same thing.

### Commands

```powershell
npm install
npm run dev          # http://localhost:3000, webpack dev server
npm run build        # production build into .next/
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # next typegen, then tsc --noEmit
npm run format       # prettier --write .
npm run format:check
```

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

`lib/site.ts` exports:

| Export                                           | Used by                                                       | Notes                                                           |
| ------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------- |
| `site`                                           | layout, footer, contact, privacy                              | Name, URL, email, founder, Calendly link, Instagram             |
| `pageMeta(title, description, path)`             | every page                                                    | Builds the `Metadata` object; keeps canonical and OG consistent |
| `faqs`                                           | `Faq` component                                               | Home shows the first four, `/servizi` shows all                 |
| `projects` (`Project[]`)                         | home, `/lavori`, `/lavori/[slug]`, `/concept/[slug]`, sitemap | See below                                                       |
| `guides` (`Guide[]`)                             | `/guide`, `/guide/[slug]`, home teasers, sitemap              | `source` is optional                                            |
| `menuCategories`, `findProject()`, `findGuide()` | demo, dynamic routes                                          |                                                                 |

A `Project` has the public fields (`slug`, `name`, `category`, `tagline`, `description`, `focus`, `image`, `color`) and a `demo` object with everything the fake restaurant site needs: `wordmark`, `descriptor`, `kicker`, `headline` (two lines, second is italic), `lead`, `motto`, `mockNote`, `heroImageAlt`, `story`, and `dishes` keyed by menu category.

**To add a concept:** append a `Project` to `projects`, add its photo to `public/images/`, and add CSS for its colour: `.project-visual.<color>`, `.<color> .mock-*` overrides and `.demo-<color>` variables, modelled on the `.onda` rules. `color` is typed as `"lino" | "onda"`, so widen that union. Everything else (routes, sitemap, metadata, the "other concept" link) follows automatically.

**To add a guide:** append to `guides`. The `number` field is the display number shown in the index.

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
10. Refinements (interaction states added in the review)
11. Media queries: `min-width: 1500px`, then `max-width: 1200px`, `1000px`, `700px` (mobile has its own composition), `370px`, and `prefers-reduced-motion`

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

`qa/screenshots.mjs` takes full-page screenshots at 1440px and 390px and fails on horizontal overflow, bad HTTP responses, or console errors. `qa/axe.mjs` runs accessibility checks on every route. Their dependencies are included in `npm ci`; both use installed Edge on Windows or Playwright Chromium elsewhere. `npm test` starts its own production test server and runs the maintained suite under `qa/tests/`. See the root README for setup and screenshot comparisons. `qa/screenshots/` is git-ignored.

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

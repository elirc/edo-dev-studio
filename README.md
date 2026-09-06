# edo-dev

Conversion-focused website for Edoardo Triveri's independent restaurant web-design studio. Built with Next.js 16, React 19, and TypeScript.

## Run locally

```powershell
npm.cmd ci
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production-equivalent preview:

```powershell
npm.cmd run build
npm.cmd run start
```

## Check a production build

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run format:check
npm.cmd run build
npm.cmd test
npm.cmd run test:visual
```

The browser tests start and stop their own production server on port 3210, with one worker. Build first. Windows uses the installed Edge browser; on Linux/macOS run `npx playwright install --with-deps chromium` once. Set `PLAYWRIGHT_CHANNEL` to select a different installed browser, or `TEST_BASE_URL` to test an existing server. Test URLs must point to a local/test environment.

`npm test` checks all pages, metadata, permanent redirects, four viewport widths, accessibility, keyboard navigation, the contact composer, clipboard failures, and JavaScript-disabled behavior. `npm run test:visual` compares eight desktop/mobile screenshots against the saved pre-improvement Windows/Edge baseline. Other browser/OS combinations need their own reviewed baseline. Failures and traces are saved in the ignored `test-results/` directory.

For ad-hoc screenshots of an already running site, use `npm run screenshots`. Set `BASE` to override its default `http://localhost:3000` URL. To inspect emitted script sizes without starting a server, use `node qa/performance.mjs --build`.

## Structure and behavior

- `app/(studio)/` contains the public studio pages. The route group does not change their URLs. Its layout renders the shared header and server-rendered footer.
- `app/concept/` has a separate layout for the fictional restaurant demos. Static demo content renders on the server; only menu tabs and booking details need client JavaScript.
- `lib/config.ts` contains verified public contact details. `lib/site.ts` contains projects, menus, FAQs, and guides. `lib/metadata.ts` builds consistent canonical, Open Graph, and Twitter metadata.
- `assets/fonts/` contains the same licensed font files used by the original design. Builds no longer fetch Google Fonts; the site still serves all fonts locally.
- `components/contact-form.tsx` keeps data in memory. It validates meaningful text, preserves edited drafts when returning to unchanged fields, and explains manual copying if the clipboard is unavailable. It never submits to a server.
- `next.config.ts` defines permanent redirects and a Content Security Policy suitable for this statically rendered site. The policy allows Next's inline bootstrap and same-origin assets, but blocks native form submissions, third-party scripts, framing, and plugins. Update it deliberately if adding an external service.
- Missing content returns a 404 with no misleading homepage canonical. Unexpected page errors have a retry action and a direct email fallback.

The improvement pass preserves the existing stylesheet, page content, imagery, typography, and layout. The earlier design review is retained in [claude docs/README.md](claude%20docs/README.md).

## Before publishing

- Replace the two clearly labelled fictional concept projects with commissioned work as it becomes available.
- Add a real founder portrait when one is available.
- Finalize the privacy notice with the actual hosting, analytics, and contact-form providers.
- Connect the contact experience to an email service only if server-side delivery is wanted. The current version safely prepares a draft in the visitor's own email app.

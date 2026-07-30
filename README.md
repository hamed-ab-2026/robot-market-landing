# روبات مارکت — Robot Market Landing

A cinematic, RTL, Persian-language landing page for **Robot Market**, a
smart refrigerated vending-machine brand. Built with Next.js (App Router),
Tailwind CSS, Ant Design, Redux Toolkit, Axios and GSAP + ScrollTrigger.

The centerpiece of the page is a scroll-driven hero animation: scattered
SVG pieces fly together into a fully assembled vending machine as the user
scrolls, followed by a three-act "scroll story" introducing each of the
three product models.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Tech stack

| Concern            | Library                         |
| ------------------- | -------------------------------- |
| Framework            | Next.js 14 (App Router, JS only) |
| Styling              | Tailwind CSS                     |
| Component library    | Ant Design (RTL-configured)      |
| State management     | Redux Toolkit                    |
| HTTP client          | Axios                            |
| Animation            | GSAP + ScrollTrigger + @gsap/react |
| Icons                | react-icons                      |
| Font                 | Vazirmatn (next/font/google)     |

## Project structure

```
src/
  app/                  Routes (App Router): layout, page, dashboard,
                         robots.js, sitemap.js, manifest.js, loading, 404
  components/
    common/              Container, Section, GlassCard, MagneticButton
    layout/              Navbar, Footer, About, ContactCta
    hero/                Hero, HeroBackground, MachineAssembly, FloatingProducts
    products/            ProductsShowcase, ProductSection, MachineVisual
    animations/          ScrollReveal (shared scroll-in wrapper)
    ui/                  AntThemeProvider (Ant Design RTL + token bridge)
  redux/
    store.js             Store factory (per-request, App-Router-safe)
    provider.jsx          Client <StoreProvider>
    slices/               auth, products, ui
  services/
    axios.js              Shared Axios instance + interceptors
    auth.service.js        // TODO: Connect Login API
    product.service.js     // TODO: Connect Product API
    dashboard.service.js   // TODO: Connect Dashboard API
  hooks/                  useReducedMotion, useIsomorphicLayoutEffect
  utils/                  cn, formatPrice, gsapConfig, breakpoints
  constants/              theme tokens, nav links
  data/                   products.json, floatingProducts.json (mock data)
public/
  svg/machines/machine35|48|60/   Assembly pieces: base, body, door, panel, screen, shelves
  svg/floating/                    chip, cola, drink, cookie, snack, juice
  icons/                           Brand icon + OG image placeholders (SVG)
```

## Replacing placeholder assets

Every visual asset in `public/svg` is a deliberately simple placeholder —
swap the files in place (same filenames) and nothing else needs to change:

- `public/svg/machines/<model>/*.svg` — the 6 pieces GSAP assembles/positions.
  Keep the same `viewBox="0 0 400 700"` coordinate space so pieces still
  line up when assembled, or update the piece list in `src/data/products.json`.
- `public/svg/floating/*.svg` — the floating product icons around the hero.
- `public/icons/*.svg` — brand icon and Open Graph placeholder. Replace the
  OG placeholder with a real 1200×630 raster (`.png`/`.jpg`) before launch
  and update the reference in `src/app/layout.js`.

## Connecting the real API

Nothing here talks to a real backend yet. Each service method already has
the exact call commented out — uncomment and remove the mock `Promise.resolve`:

```js
// src/services/product.service.js
async getAll() {
  // TODO: Connect Product API
  return apiClient.get("/products").then((res) => res.data);
}
```

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (see `.env.example`).

## Motion & accessibility notes

- **Scroll-locked product story.** Each `ProductSection` reports its DOM
  nodes up to `ProductsShowcase`, which builds and pins all three
  machines' `ScrollTrigger` timelines together in one place (fixing a bug
  where wide/desktop viewports could fail to reveal machines after the
  first one — see the comment at the top of `ProductsShowcase.jsx`), then
  calls `ScrollTrigger.refresh()` once every measurement has settled.
  Scrolling literally cannot advance past a pinned section until its
  reveal finishes — only then does the next machine begin.
- **Vivid, temperature-coded background per machine.** Each product
  carries its own `bgColor` in `src/data/products.json`, and
  `ProductsShowcase` cross-fades a single fixed color layer to that color
  over the *exact same* scroll range the section uses to pin — so the
  backdrop finishes changing exactly as the machine settles into place.
  The three models deliberately alternate cool → warm → cool: a vivid icy
  cyan-blue (`#12C4E0`) for the entry model, a warm coral-orange
  (`#FF7A45`) for the mid-tier, and a cool emerald-teal (`#12D6A8`) for
  the flagship — all bright, cheerful tones rather than muted brand
  neutrals, chosen specifically for this section.
- **Floating drinks/snacks per section.** `SectionFloatingItems.jsx`
  places a small set of product icons (soda, mineral water, juice,
  snacks) drifting gently around each machine — which items appear is
  configurable per product via `floatingItemIds` in `products.json`.
- All GSAP animations check `prefers-reduced-motion` and degrade to simple
  opacity fades (or skip entirely) when it's set.
- `gsap.matchMedia()` is used in both `MachineAssembly` (hero) and
  `ProductSection` to give desktop/tablet/mobile different scroll
  distances/intensity.
- Focus states, semantic landmarks (`<header>`, `<main>`, `<footer>`,
  `<nav>`), and ARIA labels are included throughout.

## SEO / PWA

- Metadata API with OpenGraph, Twitter cards, and canonical URL in
  `src/app/layout.js`.
- JSON-LD `Organization` schema inlined in the root layout.
- `robots.js`, `sitemap.js`, and `manifest.js` are implemented as Next.js
  route handlers (App Router convention) rather than static files.

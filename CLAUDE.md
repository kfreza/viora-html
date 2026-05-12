# Viora — Project Conventions

Static HTML/SCSS/jQuery marketing site. AI-tech template, originally forked from "KnowMax" by Laralink — every CSS class still uses the **`cs_`** prefix. Match it.

## Build / Run
- **No bundler, no `package.json`.** Sass is compiled manually (output in `assets/css/style.css`). Don't introduce npm/webpack/vite.
- Just open `index.html` in a browser to preview.
- After editing any `assets/sass/**/*.scss`, recompile to `assets/css/style.css`.

## File layout
- Pages live at the repo root: `index.html`, `about.html`, `services.html`, `service-details.html`, `contact.html`. Add new pages as siblings.
- `assets/sass/` — `default/` (fonts, variable, typography), `common/` (layout-level), `shortcode/` (per-component partials). All wired through `assets/sass/style.scss`.
- `assets/js/main.js` — single IIFE `(function ($) { ... })(jQuery)` containing every behavior.
- `assets/img/` — flat folder, descriptive snake_case names (`hero_image.jpg`, `service_image_1.svg`, `logoipsum_1.svg`).

## HTML patterns
- Wrap each page section with comments: `<!-- Start of X Section -->` … `<!-- End of X Section -->`.
- Section root: `<section class="cs_<name>_section_1">`. The `_1` is a style-variant slot — increment for alternates.
- Vertical rhythm uses spacer divs, **not** margin: `<div class="cs_height_80 cs_height_lg_60"></div>` (desktop / mobile). Ranges 1–150px exist.
- Bootstrap grid (`container`, `row`, `col-lg-*`) + custom gap classes (`cs_gap_y_24`, `cs_gap_y_40`).
- Typography utilities: `cs_fs_{size}`, weights `cs_medium`/`cs_semibold`/`cs_bold`, margin `cs_mb_{n}` / `cs_mb_lg_{n}`.
- Backgrounds via `data-src="path/to.jpg"` on `.cs_bg_filed` (JS sets `background-image`). Don't inline `style="background-image:..."`.
- Every `<a>` gets an `aria-label` (e.g. `aria-label="Menu link"`, `"Footer link"`, `"Social link"`).
- Animations via WOW.js classes: `wow fadeInLeft`, `wow fadeInUp`, etc.
- Component variants: `cs_<thing>_style_1`, `cs_<thing>_style_2` (e.g. `cs_heading_style_2`, `cs_iconbox_style_1`).

## SCSS patterns
- New component → new partial in `assets/sass/shortcode/_<name>.scss` and `@import` it from `style.scss`.
- New layout primitive → `assets/sass/common/_<name>.scss`.
- Use the CSS custom properties from `_variable.scss` (`--black`, `--white`, `--text-grey`, `--bg-grey`, `--radial-gradient`, `--heading-font`). Don't hardcode brand colors.
- Font: **Manrope** for both heading and body.
- Brand gradient: `radial-gradient(98.81% 98.81% at 0.35% 47.8%, #ef4bcb 0%, #34897b 100%)` — use `var(--radial-gradient)`.

## JS patterns ([assets/js/main.js](assets/js/main.js))
- Add new behaviors as a numbered, comment-banner-separated function inside the IIFE, then call it from the `$(function () { ... })` block.
- Guard DOM lookups with `$.exists(selector)` (defined at top).
- Use jQuery idioms — match existing style (it's jQuery 3.7.1 + Slick + WOW + LightGallery + Odometer + Isotope).
- Don't introduce ES modules, bundlers, or framework code.

## Branding gotchas
- The `<meta description>` and `main.js` header still say "KnowMax" / LMS — those are stale from the fork. New `<title>` and content say "Viora — AI Technology". Don't propagate "KnowMax" copy into new pages.
- Author meta is "Laralink".
- Footer copyright is `© 2026`.

## Style of work
- **No emojis** in markup or code.
- Don't refactor unrelated code while adding a feature.
- Preserve existing commented-out blocks in `index.html` (top-header, dropdown menus) — they're intentional, not dead code to clean.

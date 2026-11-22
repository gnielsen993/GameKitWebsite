# AGENTS.md

Project conventions for the GameDrawer marketing site (`gamedrawer.lauterstar.com`). Mirrored in [`CLAUDE.md`](CLAUDE.md). Read this before making changes.

## Project Snapshot

Public marketing site for **GameDrawer**, a local-first iOS and iPadOS drawer of eleven classic logic, card, word and arcade games. Static HTML + CSS + minimal vanilla JS. No build step, no framework, no bundler. Served by Plesk at `gamedrawer.lauterstar.com` from a directory made by `scripts/prepare-public.py`.

Primary pages: `index.html`, `about.html`, `updates.html`, `press.html`, `support.html`, `accessibility.html`, `privacy.html`, `terms.html`, `404.html`.

Read [`DESIGN.md`](DESIGN.md) for the visual system, [`STYLE.md`](STYLE.md) for copy and [`README.md`](README.md) for checks and deployment.

Part of the Lauterstar app ecosystem alongside DesignKit, HabitTracker, Stack, and PantryPlanner. The site shares its design system with the Stack website.

## General Rules

1. **Write code immediately when asked to implement.** Do not draft another plan file when one already exists.
2. **Check the codebase before suggesting anything.** Use Grep / Read to verify what exists before recommending changes.
3. **No frameworks.** No React, Vue, Tailwind, npm, or build steps. Plain HTML / CSS / JS only.
4. **All styling in `assets/styles.css`.** No inline `<style>` blocks, inline `style=""` attributes, inline scripts or third-party files. The Content Security Policy allows same-origin files only.
5. **Site-wide config in `assets/config.js`.** App Store URL, support email, app name, version. Never hardcode in pages.
6. **Commit in atomic units.** Each change set lands as its own commit. Small related fixes may be grouped, but never mix unrelated work.
7. **No em-dashes anywhere.** Do not use the em-dash character (Unicode U+2014) or any HTML entity that renders as one (`&mdash;`, `&#8212;`, `&#x2014;`) in any file the site ships - HTML, Markdown, JSON-LD, robots.txt, llms.txt, CSS comments, JS comments, anything. Em-dashes are an LLM tell and we want the prose to read like a person typed it. Substitutes, in order of preference: hyphen with surrounding spaces ` - `, a comma, a colon, a period, or a rephrase. En-dashes (Unicode U+2013) are also banned in user-visible copy. This rule file and `CLAUDE.md` are the documented exception - they cite the forbidden tokens inside code spans so the rule is teachable. Everywhere else in the repo must be clean. Verify before commit by running ``LC_ALL=C grep -rE "$(printf '\xe2\x80\x94')|&mdash;|&#8212;|&#x2014;" . --exclude-dir=.git --exclude-dir=originals --exclude=AGENTS.md --exclude=CLAUDE.md``; the result must be empty.
8. **Follow [`STYLE.md`](STYLE.md).** Before writing or editing any user-visible copy, check the banned word, phrase, and punctuation list in `STYLE.md`. Run the pre-commit grep block in that file before every commit; both checks must return empty. Plain words. Short sentences. Say it once.

## Image Assets

- iOS screenshots are captured on the iPhone 17 Pro Max simulator (1320x2868, the ASC 6.9" slot). Files in `assets/images/screenshots/` use JPEG (q80, ~720px wide) when above ~500KB. Originals (uncompressed PNG) live in `assets/images/originals/` and are gitignored.
- Target: every image under 500KB. Below-the-fold uses `loading="lazy"`.

## Design System

[`DESIGN.md`](DESIGN.md) is the source of truth. Deep black, warm white and stone, with real app screenshots as the only color. Colors and spacing are CSS custom properties on `:root`. Light and dark follow `prefers-color-scheme`, and dark is pure black. Teal marks keyboard focus and the current page only. Screenshots are cropped and scaled, never tinted or redrawn. Download actions use Apple's App Store badge.

## Site Practices

- Bump the `?v=YYYYMMDD.N` asset version on every page when `styles.css` or a script changes.
- Run `git config core.hooksPath .githooks` once per checkout so the sitemap dates stay current. `python3 scripts/sitemap.py` must pass.
- Interactive pieces must read without JavaScript and stop moving under reduced motion.
- `main` is the live site. Do visible redesign work on a `feat/<slug>` branch.

## Release Log

Visible content changes go in `CHANGELOG.md` (create when first user-visible change ships). Skip typos, minor CSS tweaks, and asset reorganizations with no user-visible effect.

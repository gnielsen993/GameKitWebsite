# CLAUDE.md

Guidance for Claude Code working in the GameDrawer marketing site repo. Conventions mirrored in [`AGENTS.md`](AGENTS.md).

## Project Overview

Public marketing site for **GameDrawer**, a local-first iOS and iPadOS drawer of eleven classic logic, card, word and arcade games. No ads, no required account. Part of the Lauterstar app ecosystem (DesignKit + HabitTracker + Stack + PantryPlanner + GameDrawer).

This repo hosts the static landing page, legal pages, and release log. Intentionally lightweight - no build step, no framework, no bundler.

**Stack:** Static HTML + CSS + minimal vanilla JS.
**Hosting:** Plesk at `gamedrawer.lauterstar.com`. Deploy a directory made by `scripts/prepare-public.py`; see [`README.md`](README.md).
**Style guide:** [`DESIGN.md`](DESIGN.md) for the visual system, [`STYLE.md`](STYLE.md) for copy. The site shares its system with the Stack website (`FitnessTrackerWebsite`); keep the two in step.

## Project Structure

```
/
|-- index.html           # Marketing landing page with the Video Mode preview
|-- about.html           # Long-form product page
|-- updates.html         # Release notes / public changelog
|-- press.html           # Press kit
|-- support.html         # Help / contact
|-- accessibility.html   # Keyboard and display guidance
|-- privacy.html         # Privacy Policy
|-- terms.html           # Terms of Service
|-- 404.html             # Custom not-found page (root-relative links)
|-- favicon.ico, robots.txt, sitemap.xml, llms.txt, CNAME
|-- DESIGN.md            # Visual style guide
|-- STYLE.md             # Copy rules
|-- README.md            # Running, checks, deployment
|-- scripts/             # sitemap.py, prepare-public.py
|-- deploy/              # gamedrawer.htaccess (security headers, caching)
|-- .githooks/           # pre-commit sitemap dates
|-- .github/workflows/   # sitemap check
`-- assets/
    |-- styles.css       # Single global stylesheet
    |-- config.js        # Site config (app name, version, support email)
    |-- app.js           # Theme preview and screenshot viewer
    |-- video-mode.js    # Playable Video Mode preview
    `-- images/
        |-- icon-1024.png, brand-icon-96.png, app-store-badge.svg
        |-- screenshots/ # In-app screenshots (.png / .jpg)
        `-- originals/   # Uncompressed PNG backups (gitignored)
```

## General Rules

1. **Write code immediately when asked to implement.** Do not produce another plan file if one already exists.
2. **Check the codebase before suggesting anything.** Use Grep / Read to verify what exists before recommending features, fixes, or restructures.
3. **No frameworks.** Do not introduce React, Vue, Tailwind, Bootstrap, npm, or any build step. The site is intentionally framework-free. Plain HTML / CSS / JS only.
4. **All styling in `assets/styles.css`.** No inline `<style>` blocks, no inline `style=""` attributes, no inline scripts and no third-party files. The deployed Content Security Policy allows same-origin files only, so any of these breaks the page.
5. **Site-wide config in `assets/config.js`.** App Store URL, support email, app name, version. Cross-page edits should be one-edit, not N-edit.
6. **Commit in atomic units.** Each change set lands as its own commit. Small related fixes may be grouped, but never mix unrelated work. Granular history is how regressions are bisected.
7. **No em-dashes anywhere.** Do not use the em-dash character (Unicode U+2014) or any HTML entity that renders as one (`&mdash;`, `&#8212;`, `&#x2014;`) in any file the site ships. That includes HTML body copy, page titles, meta descriptions, OG / Twitter tags, JSON-LD descriptions, robots.txt and llms.txt comments, CSS comments, JS comments, README, CHANGELOG, and these guidance files. Em-dashes are a strong LLM tell - human-written copy almost never reaches for them, and their presence makes prose feel synthetic. Substitutes, in order of preference: hyphen with surrounding spaces ` - `, a comma, a colon, a period, or a full rephrase. En-dashes (Unicode U+2013) are also out for user-visible copy. This file and `AGENTS.md` are the documented exception - they cite the forbidden tokens inside code spans so the rule is teachable. Everywhere else in the repo must be clean. Verify before commit by running ``LC_ALL=C grep -rE "$(printf '\xe2\x80\x94')|&mdash;|&#8212;|&#x2014;" . --exclude-dir=.git --exclude-dir=originals --exclude=AGENTS.md --exclude=CLAUDE.md``; the result must be empty.
8. **Follow [`STYLE.md`](STYLE.md).** Before writing or editing any user-visible copy (HTML body, meta tags, JSON-LD, README, CHANGELOG, llms.txt, commit messages), check the banned word, phrase, and punctuation list in `STYLE.md`. Run the pre-commit grep block in that file before every commit; both checks must return empty. Plain words. Short sentences. Say it once.

## Design System

[`DESIGN.md`](DESIGN.md) is the source of truth. Read it before any visual change. In short: deep black, warm white and stone, with real app screenshots as the only color. The homepage masthead and the panels are black in both appearances, and dark mode is pure black.

### Rules

- **No hardcoded colors in markup or component CSS.** Always reference CSS custom properties on `:root`.
- **Light/dark via `prefers-color-scheme`.** No manual switch.
- **Teal is for keyboard focus and the current page.** It is not a decoration color.
- **App colors stay inside the app.** The `--app-*` tokens are for the Video Mode preview only. Screenshots are never tinted or redrawn.
- **Typography:** one system font stack. No mono eyebrows or numbered section labels.
- **Spacing scale:** `xs, s, m, l, xl, xxl, section` as CSS variables. No magic-number margins.
- **Download actions use Apple's App Store badge**, unchanged.
- **Interactive pieces are progressive.** The page reads fully without JavaScript, and motion stops under reduced motion.

## Site Practices

- **Asset versions:** stylesheet and script links carry `?v=YYYYMMDD.N`. Bump it on every page when either changes.
- **Sitemap:** run `git config core.hooksPath .githooks` once per checkout. The hook dates changed pages; CI runs `python3 scripts/sitemap.py`.
- **New page checklist:** canonical link, description, OG and Twitter tags, icons, versioned assets, shared header and footer, a line in `llms.txt`, and an entry in `PUBLIC_FILES` in `scripts/prepare-public.py`.
- **Branches:** `main` is the live site. Do visible redesign work on a `feat/<slug>` branch and merge when it is ready to publish.

## Image Assets

iOS screenshots are captured on the iPhone 17 Pro Max simulator (1320x2868, the App Store Connect 6.9" slot) so one capture serves both ASC and the site. They ship under 500KB. Anything over that target gets resized and converted: `sips --resampleWidth 720 -s format jpeg -s formatOptions 80 INPUT.png --out OUTPUT.jpg`. Originals stay in `assets/images/originals/` (gitignored). Carousel and below-the-fold use `loading="lazy"`.

## Release Log

Visible content changes go in `CHANGELOG.md` at the repo root (create when first user-visible change ships). Cross-reference iOS app release notes when a website change is tied to a specific app version.

### What to log
- Visible content changes (new sections, copy rewrites, new screenshots)
- Legal page edits
- Structural changes (new pages, removed pages)
- Cross-version changes coordinated with the iOS app

### What NOT to log
- Typo fixes
- Minor CSS tweaks
- Asset reorganizations with no user-visible effect

## Definition of Done

- HTML validates (no unclosed tags, alt text on content images)
- CSS variables used, no hardcoded colors slipped in
- Page renders correctly in light + dark mode
- Mobile layout verified at narrow viewport (<=375px)
- Links work (no 404s)
- `CHANGELOG.md` updated if change is user-visible
- Em-dash verify command returns empty
- `python3 scripts/sitemap.py` passes after the commit
- Asset version bumped if `styles.css` or a script changed

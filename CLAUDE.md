# CLAUDE.md

Guidance for Claude Code working in the GameDrawer marketing site repo. Conventions mirrored in [`AGENTS.md`](AGENTS.md).

## Project Overview

Public marketing site for **GameDrawer**, a local-first iOS drawer of classic logic games. Minesweeper at v1.0, more games on the way. No ads, no accounts, no tracking. Part of the Lauterstar app ecosystem (DesignKit + HabitTracker + Stack + PantryPlanner + GameDrawer).

This repo hosts the static landing page, legal pages, and release log. Intentionally lightweight - no build step, no framework, no bundler.

**Stack:** Static HTML + CSS + minimal vanilla JS.
**Hosting:** GitHub Pages with CNAME `gamedrawer.lauterstar.com`.

## Project Structure

```
/
|-- index.html           # Marketing landing page
|-- about.html           # Long-form product page
|-- updates.html         # Release notes / public changelog
|-- press.html           # Press kit
|-- support.html         # Help / contact
|-- privacy.html         # Privacy Policy
|-- terms.html           # Terms of Service
|-- 404.html             # Custom not-found page
|-- robots.txt
|-- sitemap.xml
|-- llms.txt
|-- CNAME
`-- assets/
    |-- styles.css       # Single global stylesheet
    |-- config.js        # Site config (app name, version, support email)
    |-- app.js           # Minimal interactions
    `-- images/
        |-- icon-1024.png, app-store-badge.svg, promo-stack.png
        |-- screenshots/ # In-app screenshots (.png / .jpg)
        `-- originals/   # Uncompressed PNG backups (gitignored)
```

## General Rules

1. **Write code immediately when asked to implement.** Do not produce another plan file if one already exists.
2. **Check the codebase before suggesting anything.** Use Grep / Read to verify what exists before recommending features, fixes, or restructures.
3. **No frameworks.** Do not introduce React, Vue, Tailwind, Bootstrap, npm, or any build step. The site is intentionally framework-free. Plain HTML / CSS / JS only.
4. **All styling in `assets/styles.css`.** No inline `<style>` blocks except clearly-justified critical CSS. No inline `style=""` attributes.
5. **Site-wide config in `assets/config.js`.** App Store URL, support email, app name, version. Cross-page edits should be one-edit, not N-edit.
6. **Commit in atomic units.** Each change set lands as its own commit. Small related fixes may be grouped, but never mix unrelated work. Granular history is how regressions are bisected.
7. **No em-dashes anywhere.** Do not use the em-dash character (Unicode U+2014) or any HTML entity that renders as one (`&mdash;`, `&#8212;`, `&#x2014;`) in any file the site ships. That includes HTML body copy, page titles, meta descriptions, OG / Twitter tags, JSON-LD descriptions, robots.txt and llms.txt comments, CSS comments, JS comments, README, CHANGELOG, and these guidance files. Em-dashes are a strong LLM tell - human-written copy almost never reaches for them, and their presence makes prose feel synthetic. Substitutes, in order of preference: hyphen with surrounding spaces ` - `, a comma, a colon, a period, or a full rephrase. En-dashes (Unicode U+2013) are also out for user-visible copy. This file and `AGENTS.md` are the documented exception - they cite the forbidden tokens inside code spans so the rule is teachable. Everywhere else in the repo must be clean. Verify before commit by running ``LC_ALL=C grep -rE "$(printf '\xe2\x80\x94')|&mdash;|&#8212;|&#x2014;" . --exclude-dir=.git --exclude-dir=originals --exclude=AGENTS.md --exclude=CLAUDE.md``; the result must be empty.

## Design System

GameDrawer's visual identity echoes the shared Lauterstar DesignKit: warm cream (light) / charcoal (dark) backgrounds, themeable accents across six families (Classic, Sweet, Bright, Soft, Moody, Loud). Default web identity is "Chrome Diner" (cream, teal, diner red, brushed gunmetal).

### Rules

- **No hardcoded colors in markup or component CSS.** Always reference CSS custom properties on `:root`.
- **Light/dark via `prefers-color-scheme`** - match the app's behavior.
- **Typography:** system font stack by default. The app uses SF Pro; web fallback to system fonts gives the same feel on Apple devices.
- **Spacing scale:** mirror the DesignKit scale (`xs, s, m, l, xl, xxl`) as CSS variables. No magic-number margins.

## Image Assets

iOS screenshots ship under 500KB. Anything over that target gets resized and converted: `sips --resampleWidth 720 -s format jpeg -s formatOptions 80 INPUT.png --out OUTPUT.jpg`. Originals stay in `assets/images/originals/` (gitignored). Carousel and below-the-fold use `loading="lazy"`.

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

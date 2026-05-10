# AGENTS.md

Project conventions for the GameDrawer marketing site (`gamedrawer.lauterstar.com`). Mirrored in [`CLAUDE.md`](CLAUDE.md). Read this before making changes.

## Project Snapshot

Public marketing site for **GameDrawer**, a local-first iOS drawer of classic logic games (Minesweeper at v1.0, more on the way). Static HTML + CSS + minimal vanilla JS. No build step, no framework, no bundler. Hosted on GitHub Pages with CNAME `gamedrawer.lauterstar.com`.

Primary pages: `index.html`, `about.html`, `updates.html`, `press.html`, `support.html`, `privacy.html`, `terms.html`, `404.html`.

Part of the Lauterstar app ecosystem alongside DesignKit, HabitTracker, Stack, and PantryPlanner.

## General Rules

1. **Write code immediately when asked to implement.** Do not draft another plan file when one already exists.
2. **Check the codebase before suggesting anything.** Use Grep / Read to verify what exists before recommending changes.
3. **No frameworks.** No React, Vue, Tailwind, npm, or build steps. Plain HTML / CSS / JS only.
4. **All styling in `assets/styles.css`.** No inline `<style>` blocks except clearly-justified critical CSS. No inline `style=""` attributes.
5. **Site-wide config in `assets/config.js`.** App Store URL, support email, app name, version. Never hardcode in pages.
6. **Commit in atomic units.** Each change set lands as its own commit. Small related fixes may be grouped, but never mix unrelated work.
7. **No em-dashes anywhere.** Do not use the em-dash character (Unicode U+2014) or any HTML entity that renders as one (`&mdash;`, `&#8212;`, `&#x2014;`) in any file the site ships - HTML, Markdown, JSON-LD, robots.txt, llms.txt, CSS comments, JS comments, anything. Em-dashes are an LLM tell and we want the prose to read like a person typed it. Substitutes, in order of preference: hyphen with surrounding spaces ` - `, a comma, a colon, a period, or a rephrase. En-dashes (Unicode U+2013) are also banned in user-visible copy. This rule file and `CLAUDE.md` are the documented exception - they cite the forbidden tokens inside code spans so the rule is teachable. Everywhere else in the repo must be clean. Verify before commit by running ``LC_ALL=C grep -rE "$(printf '\xe2\x80\x94')|&mdash;|&#8212;|&#x2014;" . --exclude-dir=.git --exclude-dir=originals --exclude=AGENTS.md --exclude=CLAUDE.md``; the result must be empty.
8. **Follow [`STYLE.md`](STYLE.md).** Before writing or editing any user-visible copy, check the banned word, phrase, and punctuation list in `STYLE.md`. Run the pre-commit grep block in that file before every commit; both checks must return empty. Plain words. Short sentences. Say it once.

## Image Assets

- iOS screenshots in `assets/images/screenshots/` use JPEG (q80, ~720px wide) when above ~500KB. Originals (uncompressed PNG) live in `assets/images/originals/` and are gitignored.
- Target: every image under 500KB. Below-the-fold uses `loading="lazy"`.

## Design System

GameDrawer mirrors the Stack iOS app's themeable DesignKit pattern: warm cream (light) / charcoal (dark) backgrounds with a 34-preset theme catalog across six families. Translate app tokens into CSS custom properties on `:root`. Use `prefers-color-scheme` for light / dark.

## Release Log

Visible content changes go in `CHANGELOG.md` (create when first user-visible change ships). Skip typos, minor CSS tweaks, and asset reorganizations with no user-visible effect.

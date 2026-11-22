# GameDrawer website

Static marketing website for GameDrawer, built with HTML, CSS and small vanilla JavaScript files. No build step or runtime dependencies. Live at https://gamedrawer.lauterstar.com/.

Read `DESIGN.md` for the visual system and `STYLE.md` for copy rules before changing a page.

## Run locally

```sh
python3 -m http.server 8123 --bind 127.0.0.1
```

Open http://127.0.0.1:8123/.

## Content

- index.html: product story, the playable Video Mode preview and common questions.
- about.html: the long product page, with every game and feature.
- updates.html: release notes for each app version.
- press.html, support.html, accessibility.html: assets, help and keyboard guidance.
- privacy.html and terms.html: legal pages.
- 404.html: the missing-page screen. It uses root-relative links so it works from any path.

## Shared values

`assets/config.js` holds the app name, version, App Store link and support email, and fills `data-cfg` elements at runtime. Each page also carries the full link and readable text for visitors without JavaScript and for crawlers. Keep those fallbacks in step when config changes.

All styling lives in `assets/styles.css`. Colors and repeated sizes are CSS variables.

`assets/app.js` runs the theme preview and the screenshot viewer. `assets/video-mode.js` runs the Video Mode preview on the home page.

## Checks before a commit

1. Open each changed page in light and dark, at 375px and at desktop width.
2. Try the Video Mode preview in all six positions, play a board to a win or loss, and use it with the keyboard.
3. Open and close a screenshot, switch themes and open a question.
4. Run the em dash check from `CLAUDE.md` and the two checks in `STYLE.md`. All must print nothing.
5. Keep page descriptions, visible copy, JSON-LD, `llms.txt` and `updates.html` consistent.
6. Add a `CHANGELOG.md` entry for any visible change.

## Sitemap

Turn on the hook once in each checkout:

```sh
git config core.hooksPath .githooks
```

The hook reads staged HTML and sets today's date on changed pages in `sitemap.xml`. CI checks every indexed page against its last commit. Run `python3 scripts/sitemap.py` for the same check.

## Asset versions

HTML, CSS and JavaScript revalidate before reuse. Stylesheet and script links carry `?v=YYYYMMDD.N`. When a script or the stylesheet changes, bump that value on every page that links it.

## Public deployment directory

The site is served by Plesk at gamedrawer.lauterstar.com.

```sh
python3 scripts/prepare-public.py /path/to/new-release/web
```

Run it in a clean checkout. The destination must be new. The command copies the public pages, icons, assets and `deploy/gamedrawer.htaccess` as `.htaccess`. Repository notes, hooks and scripts stay in the source checkout.

In Plesk, back up the current deployment, then serve the prepared directory and enable HTTPS redirection. Apache needs mod_headers and permission to read the `.htaccess`. If nginx serves static files directly, set the same headers there. After deploying, check the home page, the icons, the Video Mode preview, a missing nested URL and the response headers. Keep the previous release for rollback.

The Content Security Policy allows same-origin scripts, styles and images only. A page with an inline style, an inline script or a third-party file will break under it.

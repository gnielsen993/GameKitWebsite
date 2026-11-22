# Black redesign and Video Mode preview - 2026-11-21

- Rebuilt the site in deep black, warm white and stone, matching the Stack website. The home page opens on a black masthead with the Drawer screen, and dark mode is now pure black.
- Added a playable Video Mode preview to the home page: pick one of six video positions and play a small Minesweeper board while the controls move out of the way. Without JavaScript the real app screenshot shows instead.
- Replaced the feature card grid and carousel with real screenshot details, a screenshot strip, a full-screen viewer, a theme preview and common questions.
- Added an Accessibility page. New shared header and footer on every page, with teal current-page underlines and keyboard focus rings. Download buttons now use the App Store badge.
- Added favicon.ico, versioned asset links, a Git-dated sitemap with a CI check, and a public deployment script with security headers and a Content Security Policy. The 404 page lost its inline styles and now works from nested paths.
- Corrected the About page: GameDrawer runs on iPhone and iPad. Removed the claim that the site uses the Chrome Diner palette.
- Shortened the home page tab to GameDrawer. The longer search title stays in the social tags and site structured data.
- Added DESIGN.md and README.md, and updated CLAUDE.md and AGENTS.md. Layouts in the preview follow GameKit DESIGN.md section 7.

# Branding refresh - 2026-09-10

- Replaced the old stacked-box icon with the approved Video drawer artwork from the iOS app across navigation, browser icons, social previews and the press download.
- Added small browser and navigation assets, refreshed image URLs for cached previews, and added the current icon to app search metadata.
- Removed the retired promo render and added current name and artwork guidance to the press kit.
- Source: GameKit assets/icon/AI_PROVENANCE.md, Revision 4 (9A.2 Video drawer).

# Version 1.6 release labels - 2026-09-10

- Marked 1.6 as the latest update across pages, site config, search and social metadata, structured data and llms.txt for the coordinated release.
- Updated the roster to eleven games and replaced the home screenshot with the 1.6 capture. Earlier release entries stay in the history.

# Website refresh - 2026-09-10

- Added a clearly labeled 1.6 preview: Math Crossword, hints, Practice, saved undo and Video Mode fixes. App Store version stays 1.5 until release. Source: GameKit Docs/releases/v1.6.md and Marketing/AppStore-1.6/metadata.
- Updated page titles, search descriptions, social metadata, sitemap and llms.txt. Removed unsupported exclusivity and reinstall claims.
- Added a Math Crossword preview screenshot and working press downloads. Improved narrow-screen navigation, theme contrast, keyboard gallery access and Reduce Motion.

# Changelog

Website changes. Ordered newest first. iOS app release notes are in [updates.html](updates.html).

---

## 2026-05-29

**New screenshots, Video Mode section, and Theme Triptych on the homepage.**

- Replaced all placeholder and stale carousel screenshots with real v1.3 shots: home grid, Minesweeper, Merge, Nonogram, Sudoku, Solitaire, FreeCell, Stats.
- Hero phone now shows the v1.3 home screen (6-game grid, Classic preset).
- Added a Video Mode visual section below the features grid. Shows a phone with the PiP black box overlay above the Minesweeper board so the layout reflow is immediately clear.
- Added a Theme Triptych section. Three phones side by side, same FreeCell game in Classic (green felt), Moody (dark navy), and Sweet (pink) presets. Illustrates the theming system without text.
- Removed the self-referential internal pull quote from the homepage.
- All new screenshots compressed to JPEG at 720px wide; originals kept in `assets/images/originals/` (gitignored).

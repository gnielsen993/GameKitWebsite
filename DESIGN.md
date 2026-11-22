---
name: GameDrawer website
description: Deep black, warm white and real app screens for a calm drawer of classic games.
colors:
  accent: "#191919"
  accent-hover: "#545454"
  bg: "#faf9f6"
  surface: "#efeeeb"
  text: "#171717"
  muted: "#595854"
  line: "#d5d4d0"
  panel: "#000000"
  panel-text: "#faf9f6"
  panel-muted: "#bcbab6"
  panel-raised: "#181818"
  panel-line: "#2b2b2b"
  panel-edge: "#424242"
  on-accent: "#ffffff"
  focus: "#0f766e"
  dark-bg: "#000000"
  dark-surface: "#181818"
  dark-text: "#faf9f6"
  dark-muted: "#afaeaa"
  dark-accent: "#f5f4f1"
  dark-accent-hover: "#c8c7c4"
  dark-line: "#363636"
  dark-focus: "#14b8a6"
rounded:
  radius: "16px"
  radius-phone: "32px"
spacing:
  xs: "4px"
  s: "8px"
  m: "16px"
  l: "24px"
  xl: "40px"
  xxl: "72px"
  section: "112px"
---

# Design System: GameDrawer website

This is the style guide for gamedrawer.lauterstar.com. It shares its system with the Stack website (FitnessTrackerWebsite). When one site changes a shared rule, change the other and both DESIGN.md files in the same week.

## Overview

Black, stone and warm white. System type. Unchanged native app screenshots. The site leads with what the player gets, then shows the app as proof. The app's own colors appear only inside screenshots and the Video Mode preview, so the cream and felt screens stand out against the black.

The site is static HTML, one stylesheet and three small scripts. No framework, no build step, no downloaded fonts.

## Colors

The frontmatter lists the semantic palette from `assets/styles.css`. Every color in component CSS comes from a custom property on `:root`. No hex values in markup or rules.

- The homepage header and hero form a black masthead in both appearances. It runs to both edges of the viewport.
- Light appearance uses warm white for reading. Dark appearance uses pure black, not charcoal.
- Black panels (`.preview-console`, `.plain-play`) stay black in both appearances and carry their own text colors.
- Teal marks keyboard focus and the current page, nothing else on the site chrome. Use the deep teal on light surfaces and the bright teal on black. The one other use is the selected video location in the preview.
- The `--app-*` tokens hold the app's Classic look. Use them only inside `.vm-phone`.

The site follows `prefers-color-scheme`. There is no manual switch.

## Typography

One stack for everything: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`. The mono stack is for `code` in document pages only.

Headings use weight 600, tight tracking, balanced wrapping and a 1.08 line height. Display size is `clamp(2.7rem, 5.6vw, 5.2rem)`. Section headings use `clamp(2rem, 4vw, 3.6rem)`. Body text is 17px at 1.6, and 16px on phones. Buttons use weight 650. Captions and notes use the muted role.

Homepage headings are two short lines with a manual break. No uppercase mono eyebrows, no numbered section labels.

## Layout

A centered container caps at 1160px with 24px side padding. The homepage order is: masthead, Video Mode preview, games, screenshot strip, stats, the black panel, themes, questions, closing panel. Sections alternate which side holds the proof so the page does not read as a grid of cards.

Document pages (`.doc`) use a 790px reading width.

Breakpoints: 920px wraps the header. 740px stacks the hero and the preview. 600px makes every story one column, with copy before its proof, and tightens section spacing to 64px.

## Shapes and depth

Buttons and grouped surfaces share the 16px radius. Phone screenshots use the 32px phone radius, 28px on phones. Depth comes from tone, thin lines and whitespace. No shadows on cards, no glass, no gradients on text.

The one texture is the board grid behind the hero phone and the preview phone: two 1px line gradients on black, faded with a radial gradient.

## Components

- **App Store badge:** every download action uses Apple's black badge, unchanged. Standard buttons are for internal pages only.
- **Buttons:** `.button.primary` pairs accent and on-accent. `.button.secondary` has a line border. 48px minimum height. On a black panel the button uses panel-text on panel.
- **Navigation:** four text links and the badge. The current page gets a 2px teal underline. Mobile links wrap into a row below the brand.
- **Focus:** a 3px outline in the focus token, offset 5px. The skip link appears on focus.
- **Screenshot details:** `.detail-window` crops a real screenshot with `aspect-ratio` and `translateY` only. Each links to the full image and opens it in the viewer.
- **Screenshot viewer:** a native `dialog` with a sticky Close control. Escape closes it and focus returns to the link that opened it. Links work as plain image links without JavaScript.
- **Theme preview:** buttons swap between real FreeCell screenshots and update `aria-pressed`, the alt text and the description. They never restyle the website.
- **Questions:** native `details` and `summary`.
- **Motion:** smooth anchor scrolling, the video progress bar and the preview layout transition. All three stop under reduced motion.

## Video Mode preview

`assets/video-mode.js` runs a playable 9 by 9 Minesweeper board inside a phone drawn with the app's Classic colors. Six buttons set `data-position` on `.vm-phone`. Each position has one `grid-template-areas` rule in the stylesheet that puts the controls opposite the video, following the app's Video Mode rules (GameKit `DESIGN.md` section 7).

Rules for this component:

- It is a preview, and the caption says so. Link to the real app screenshot beside it.
- The section is hidden until the script runs. Without JavaScript the real screenshot shows in its place.
- Keep it honest to the app: six positions with the app's names, first reveal is safe, Reveal and Flag match the app's pill.
- The board is a `role="grid"` with one tab stop. Arrow keys move, Space or Enter acts, F flags. Results go to a `role="status"` line.
- The layout change uses the View Transitions API when available. It is skipped under reduced motion.
- If the app's Video Mode layouts change, update the grid rules here in the same release.

## Do and do not

- **Do** use real, unchanged app screenshots as proof. Crop and scale only.
- **Do** keep copy short and factual. Follow `STYLE.md`.
- **Do** keep focus rings, alt text, 375px layouts and reduced motion working.
- **Do** keep the home page `<title>` to the app name alone. The descriptive title lives in `og:title`, `twitter:title` and the WebSite `alternateName`.
- **Do** bump the `?v=` asset version on every page when a script or the stylesheet changes.
- **Do not** tint, recolor or redraw screenshots.
- **Do not** invent ratings, testimonials, prices or promises about future features.
- **Do not** add inline styles, inline scripts or third-party resources. The Content Security Policy allows same-origin files only.
- **Do not** add a framework, a build step or a downloaded font.
- **Do not** bring back mono eyebrows, numbered feature cards or icon tiles.

## Image assets

Screenshots come from the iPhone 17 Pro Max simulator at 1320x2868 and ship under 500KB, as JPEG at 720px wide when the PNG is larger. Originals stay in `assets/images/originals/`, which Git ignores. Give every image `width`, `height` and alt text. Images below the first screen use `loading="lazy"` and `decoding="async"`.

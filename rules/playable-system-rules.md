# Playable System Rules

## Purpose

The Playables section is one of the most important parts of the portfolio.

It lets visitors test playable ads directly inside the website through an embedded frame.

## Layout

The Playables page should have two main areas:

1. Playable library.
2. Playable test panel.

Expected structure:

```text
Library                         Test Panel
-----------------------------------------------------------
Game A                          Device frame
  Playable 1                    iframe
  Playable 2                    ratio controls
Game B                          rotate button
  Playable 1                    fullscreen button
```

## Library Behavior

Games are shown as grouped items.

Game row should show:

- Icon.
- Game title.
- Number of playables.

When a game is clicked:

- It expands its playable list.
- Playables appear below it as foldout items.
- Only one game foldout should be open at a time.
- Clicking the already-open game may collapse it.

Playable item should show:

- Playable title.
- Optional small game icon or numeric indicator.
- Expanded playable items may be shown as small selectable boxes/cards in a centered grid.

When a playable is clicked:

- It becomes selected.
- It loads in the right-side test frame.
- The iframe may reload because the playable changed.

## Iframe Behavior

Playable ads run inside an iframe.

Important rule:

Changing aspect ratio or orientation must not reload the currently selected playable.

This means:

- Keep the same iframe mounted.
- Change only the wrapper/frame size.
- Do not change iframe `key`, `src`, or component identity when changing ratio/orientation.

Reload is acceptable only when:

- A different playable is selected.
- A different playable variant is selected.
- The browser is refreshed.
- The fullscreen modal opens with a separate iframe.

## Playable Variants

A playable may define either a direct `url` or a `variants` array.

Direct URL example:

```js
{
  id: "playable-1",
  title: "Playable 1",
  url: "https://example.com/playable-1/index.html"
}
```

Variant example:

```js
{
  id: "playable-1",
  title: "Playable 1",
  variants: [
    { id: "v1", label: "1", url: "https://example.com/playable-1-v1/index.html" },
    { id: "v2", label: "2", url: "https://example.com/playable-1-v2/index.html" }
  ]
}
```

Rules:

- Existing playables with only `url` must continue to work.
- If a playable has variants and no direct URL, default to the first variant.
- If a playable has both URL and variants, prefer the selected variant, otherwise the first variant, otherwise the direct URL.
- Variant changes may reload the iframe.
- Ratio/orientation changes must not reload the selected variant iframe.

## Supported Ratios

There are three base ratios:

```text
9:20
16:9
4:3
```

Each ratio can be shown in either orientation:

- Portrait
- Landscape

Orientation is controlled by a rotate button.

Example logic:

- Base ratio `9:20` in Portrait means width:height = 9:20.
- Base ratio `9:20` in Landscape means width:height = 20:9.
- Base ratio `16:9` in Landscape means width:height = 16:9.
- Base ratio `16:9` in Portrait means width:height = 9:16.
- Base ratio `4:3` in Landscape means width:height = 4:3.
- Base ratio `4:3` in Portrait means width:height = 3:4.

## Controls

The test panel should include:

- Ratio selector:
  - 9:20
  - 16:9
  - 4:3
- Rotate button:
  - toggles Portrait / Landscape
- Fullscreen button:
  - opens a large in-page modal

Default ratio/orientation can be set by data or component state. If no specific default is provided, use:

```text
16:9 Portrait
```

This matches the current visual reference better.

## Device Frame

The playable frame should be a rounded rectangle.

Rules:

- Keep a clean rounded rectangle style.
- Do not use a realistic phone mockup unless explicitly requested.
- Smoothly animate size changes when ratio/orientation changes.
- The iframe should fill the inside of the frame.
- Hide overflow inside the frame.

## Loading State

When a playable is loading, show:

```text
Loading playable...
```

The loading state should appear when selecting a new playable.

## Error State

If the playable fails to load, show:

```text
Failed to load playable.
```

A failed external iframe can be hard to detect reliably. Implement best-effort error handling using iframe events where possible.

## Fullscreen Modal

Fullscreen is an in-page modal, not browser fullscreen.

When the fullscreen button is clicked:

- Open a large modal overlay.
- The modal should cover most of the screen.
- Include a close button.
- Include ratio and rotate controls inside the modal.
- Load the selected playable inside a new iframe in the modal.

Important:

- It is acceptable for the playable to restart in fullscreen modal.
- The modal iframe does not need to preserve the state of the small test frame.
- Changing ratio/orientation inside the modal should not reload the modal iframe.

## Touch and Mouse Support

Playable iframes should be usable with:

- Mouse on desktop.
- Touch on mobile/tablet where possible.

Do not add overlays that block pointer/touch input.

## GitHub Pages Compatibility

External playable URLs must work from GitHub Pages.

For local playable files, paths must respect the GitHub Pages base path if the site is served from:

```text
/portfolio/
```

Do not hardcode local playable URLs assuming root `/` unless base path handling is implemented.

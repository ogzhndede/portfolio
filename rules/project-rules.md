# Project Rules — Portfolio Website

## Purpose

This website is a personal portfolio for Oğuz Han Dede.

It should present:

- Developer identity.
- Selected games and projects.
- Playable ads in an interactive test frame.
- Creative ad videos / marketing videos.
- Resume preview and download.
- Social/contact links.

The site should communicate a game developer / playable ads developer identity with a dark, technical, polished visual style.

## Project Type

- Static portfolio website.
- Built with Next.js.
- Hosted on GitHub Pages.
- Repository name: `portfolio`.
- URL pattern: `https://username.github.io/portfolio/`.

## Navigation Model

The site should behave like a single-page app.

Navigation items:

- About Me
- Playables
- Projects
- Creatives
- CV

Changing sections should update the visible content without a full page reload.

Implementation may use local state or client-side routing, but the user experience must feel instant and continuous.

## Desktop Layout

Desktop is the main priority.

Expected desktop structure:

```text
+----------------------+--------------------------------------+
| Fixed left sidebar   | Main content area                    |
|                      |                                      |
| Profile              | Active section content               |
| Name/title           |                                      |
| Navigation           |                                      |
|                      |                                      |
| Social links/footer  |                                      |
+----------------------+--------------------------------------+
```

The left sidebar should always remain visible on desktop.

## Mobile Layout

Mobile should be usable, but not the main priority.

Acceptable mobile behavior:

- Sidebar can become a top header.
- Navigation can become horizontal or collapsed.
- Main content should stack vertically.
- Playable tester can become a vertical layout.
- Content should not overflow horizontally.

## Content Language

All user-facing site text should be English.

## Important Product Priorities

Priority order:

1. Preserve current visual identity.
2. Make content easy to update.
3. Make playable testing experience strong.
4. Keep the site static and GitHub Pages compatible.
5. Keep code simple and maintainable.

## Non-Goals

The website is not:

- A blog platform.
- A CMS.
- A backend app.
- A multi-user product.
- A complex animation showcase.
- A generic portfolio template.

Avoid building features outside the stated portfolio scope.

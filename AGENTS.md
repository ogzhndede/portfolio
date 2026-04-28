# AGENTS.md — Portfolio Website Rules

This file defines the working rules for AI coding agents such as Codex. Read this file before making changes.

## Project Summary

This is a personal portfolio website for Oğuz Han Dede, a Game / Playable Ads Developer.

The website is a static Next.js portfolio deployed through GitHub Pages under a repository named `portfolio`.

Expected public URL pattern:

```text
https://username.github.io/portfolio/
```

The site must feel like a single-page app. Navigation between About Me, Playables, Projects, Creatives, and CV should not cause a full page reload.

## Primary Goals

- Keep the current visual style.
- Showcase games, projects, playable ads, creative ad videos, and resume.
- Make adding new projects, playables, and creatives simple through data files.
- Keep the site lightweight, static, and compatible with GitHub Pages.
- Prioritize desktop layout while keeping mobile reasonably usable.

## Main Sections

The site has five main sections:

1. About Me
2. Playables
3. Projects
4. Creatives
5. CV

The left sidebar is persistent on desktop. On mobile, it may become a top navigation/header layout.

## Design Direction

Preserve the current design language:

- Dark background.
- Blue accent color.
- Monospace / retro / terminal-like typography.
- Minimal, clean, technical portfolio feel.
- Large empty space is acceptable.
- Avoid bright, noisy, generic portfolio templates.
- Active navigation state should stay visually close to the current blue outlined/background style.

Do not redesign the whole site unless explicitly requested.

## Technology

Current assumptions:

- Framework: Next.js
- Language: likely JavaScript
- Deployment: GitHub Pages
- Static output required
- Manual deployment is acceptable
- No backend
- No database
- No login
- No server-side runtime dependency

If the project already has a working stack, preserve it. Do not migrate to TypeScript, Tailwind, SCSS, or another framework unless explicitly requested.

## Data-Driven Content

Content should be easy to update from data files.

Recommended structure:

```text
src/data/profile.js
src/data/projects.js
src/data/playables.js
src/data/creatives.js
src/data/socialLinks.js
```

Adding a new project, playable, or creative should not require changing layout/component logic.

## Codex Working Rules

When making changes:

1. Read the relevant files first.
2. Preserve the existing visual style.
3. Make small, safe changes.
4. Do not rewrite the whole app unless necessary.
5. Do not add unnecessary dependencies.
6. Do not introduce server-only features.
7. Keep GitHub Pages compatibility in mind.
8. Avoid hardcoded absolute URLs for internal assets.
9. Use the configured base path for local assets if needed.
10. After changes, summarize what changed and mention any assumptions.

## Required Response Format After Each Task

When finishing a coding task, respond with:

```text
Changes:
- ...

Test:
- ...

Notes / Risks:
- ...
```

## Do Not Do

- Do not create a backend.
- Do not add authentication.
- Do not add a database.
- Do not replace the current design language.
- Do not make page navigation reload the app.
- Do not break playable iframe behavior.
- Do not make ratio changes reload the currently selected playable.
- Do not rely on external services for core functionality.
- Do not hardcode the site to only work on localhost.

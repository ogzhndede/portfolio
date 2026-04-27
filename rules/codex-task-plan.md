# Codex Task Plan

Use this file to guide implementation in small, safe steps.

Do not ask Codex to build everything in one task.

## Task 1 — Audit Current Project

Prompt:

```text
Read AGENTS.md and all files under /rules. Then inspect the current Next.js project structure. Do not change code yet. Summarize the current stack, routing approach, styling approach, and GitHub Pages readiness.
```

Expected output:

- Current framework version.
- JavaScript or TypeScript.
- App Router or Pages Router.
- Styling method.
- Existing components.
- Existing deployment setup.
- Risks.

## Task 2 — Normalize Data Structure

Prompt:

```text
Read AGENTS.md and /rules. Create or update data files for profile, projects, playables, and social links. Keep the current UI unchanged as much as possible. Components should read from data files instead of hardcoded repeated content.
```

Expected files:

```text
src/data/profile.js
src/data/projects.js
src/data/playables.js
src/data/socialLinks.js
```

## Task 3 — Sidebar Cleanup

Prompt:

```text
Using the data files, make the sidebar render profile information, navigation items, social links, and auto-updated year. Preserve the current visual style and active nav behavior.
```

Rules:

- Desktop sidebar remains fixed.
- Mobile may use top layout.
- Do not redesign.

## Task 4 — About Me Behavior

Prompt:

```text
Implement the About Me section according to the rules. It should show profile image, main greeting, animated typewriter subtitle, and Projects/Playables buttons. The typewriter animation should replay on page refresh and when returning to About Me.
```

Rules:

- No long bio.
- No skill list.
- No location block.
- Keep English text.

## Task 5 — Projects Section

Prompt:

```text
Build the Projects section from src/data/projects.js. Support Mobile Games, Steam Projects, and Game Jam Projects. Each project card should show image, title, short description, platform tags, and one or more external links.
```

Rules:

- Project click/link opens external URL.
- Handle missing optional fields gracefully.
- Do not create detail pages.

## Task 6 — Playables Library

Prompt:

```text
Build the Playables library from src/data/playables.js. Show games as expandable groups. Each game row should show icon, title, and playable count. Clicking a playable should select it and load it in the test panel.
```

Rules:

- Game groups fold out.
- Playable items show title.
- Optional mini icon or number is allowed.

## Task 7 — Playable Test Frame

Prompt:

```text
Implement the playable test frame. It must embed the selected playable URL in an iframe. Add ratio selector for 9:20, 16:9, 4:3 and a rotate button for portrait/landscape. Changing ratio or orientation must not reload the current iframe.
```

Rules:

- Do not change iframe `src` for ratio changes.
- Do not change iframe `key` for ratio changes.
- Animate frame size changes.
- Use rounded rectangle frame.

## Task 8 — Playable Fullscreen Modal

Prompt:

```text
Add an in-page fullscreen modal for the selected playable. Opening fullscreen may load a new iframe and restart the playable. The modal must include close, ratio selector, and rotate controls.
```

Rules:

- No browser fullscreen API required.
- Modal covers most of screen.
- Modal iframe ratio changes should not reload the modal iframe.

## Task 9 — CV Section

Prompt:

```text
Implement the CV section with PDF preview and direct download button. Use public/files/Oguz_Han_Dede_Resume.pdf as the stable file path. If preview fails, show a readable fallback while keeping the download button available.
```

Rules:

- Download button directly downloads the PDF.
- Keep viewer simple.
- Do not add a backend.

## Task 10 — GitHub Pages Static Path Check

Prompt:

```text
Check and adjust the Next.js configuration for GitHub Pages deployment under /portfolio. Make internal asset paths and static export compatible with https://username.github.io/portfolio/. Do not add GitHub Actions.
```

Rules:

- Manual deployment is acceptable.
- Document the build/export steps.
- Preserve local dev workflow.

## Task 11 — Responsive Pass

Prompt:

```text
Make a responsive pass without changing the desktop design. Desktop remains the priority. On mobile, sidebar can become a top nav and content should avoid horizontal overflow.
```

Rules:

- Do not redesign desktop.
- Keep Playables usable as much as possible.
- Avoid heavy mobile-only rewrites.

## Task 12 — Final Polish

Prompt:

```text
Polish spacing, hover states, loading states, and empty/error states across the portfolio. Preserve the current dark blue monospace design.
```

Rules:

- Do not add new major features.
- Do not add many new colors.
- Keep performance lightweight.

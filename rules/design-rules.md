# Design Rules

## Visual Identity

Preserve the current visual direction shown in the reference screenshots.

Core style:

- Dark / near-black background.
- Blue accent color.
- Monospace or terminal-like font.
- Minimal layout.
- High contrast.
- Large empty space.
- Subtle borders and cards.
- Technical / retro / developer-focused feeling.

The design should look custom and personal, not like a generic Bootstrap portfolio.

## Typography

Continue using the current font setup.

If the exact font is already configured in the project, do not replace it.

Typography direction:

- Monospace feel.
- Large bold section titles.
- Small uppercase navigation labels.
- Compact secondary text.
- Clear hierarchy without excessive font variety.

## Colors

Preserve the current palette.

Expected color roles:

- Background: near-black.
- Main text: light gray / white.
- Secondary text: muted gray.
- Accent: blue.
- Active state: blue outline or subtle blue-filled background.
- Cards: slightly lighter dark tone than background.
- Borders: subtle dark/blue border.

Avoid adding many new colors.

## Sidebar

The sidebar should include:

- Profile photo.
- Name: `OĞUZ HAN DEDE`
- Subtitle: `GAME / PLAYABLE ADS DEVELOPER`
- Navigation items:
  - About Me
  - Projects
  - Playables
  - CV
- Social links at the bottom:
  - LinkedIn
  - Email
  - GitHub
- Footer line:
  - Auto-updated year.
  - Location can remain.

The sidebar is fixed on desktop.

Active navigation state should remain close to the current design:
- subtle blue outline
- darker blue/purple background
- blue text

## Main Content Area

The right side is the main content area.

Rules:

- Keep content centered or aligned consistently.
- Avoid filling the entire screen with unnecessary elements.
- Keep spacing generous.
- Cards should be readable but not oversized.
- Avoid heavy gradients or loud effects.

## Animations

Animations should be tasteful and lightweight.

Allowed animation types:

- Typewriter text animation on About Me.
- Smooth section transitions.
- Smooth playable device frame resizing.
- Simple hover transitions.
- Modal fade/scale.

Avoid:

- Excessive motion.
- Long blocking animations.
- Animations that make navigation feel slow.
- Re-rendering iframe when only the playable ratio changes.

## About Me Design

About Me should be simple and close to the screenshot.

Content:

- Profile photo.
- Main greeting/title.
- Animated typewriter subtitle.
- Buttons linking to Projects and Playables.

Do not add long bio, location, skill lists, or extra sections unless explicitly requested.

The typewriter animation should run:
- on page refresh
- when returning to About Me

## Projects Design

Projects section should show project/game cards.

Each card may include:

- Image / thumbnail.
- Project title.
- Short description.
- Platform tag.
- External link action.

Projects should be grouped or filterable by category:

- Mobile Games
- Steam Projects
- Game Jam Projects

Clicking a project or link should navigate to an external URL.

## Playables Design

The Playables section is the most important section.

Expected layout:

```text
+------------------------------+--------------------------------+
| Playable Library             | Playable Test Panel             |
|                              |                                |
| Game groups                  | Device frame                    |
|   Playable items             | Ratio/orientation controls      |
|                              | Fullscreen button               |
+------------------------------+--------------------------------+
```

The left side contains a playable library.  
The right side contains the playable testing frame.

## CV Design

The CV section should include:

- Section title: Resume
- PDF preview
- Download Resume button

If PDF preview fails, show a readable fallback message and keep the download button available.

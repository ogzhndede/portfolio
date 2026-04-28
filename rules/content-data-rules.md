# Content and Data Rules

## Goal

Projects, playables, profile information, and social links should be managed through data files.

This allows new content to be added without changing layout/component logic.

Recommended structure:

```text
src/data/profile.js
src/data/projects.js
src/data/playables.js
src/data/creatives.js
src/data/socialLinks.js
```

If the project uses a different existing structure, preserve it unless there is a clear reason to adjust it.

## Profile Data

Recommended shape:

```js
export const profile = {
  name: "OĞUZ HAN DEDE",
  title: "GAME / PLAYABLE ADS DEVELOPER",
  location: "ANKARA",
  profileImage: "/images/profile/profile.jpg"
};
```

Notes:

- Keep user-facing text English.
- Do not add a long bio unless explicitly requested.
- Do not add skill/location blocks to About Me unless explicitly requested.

## Social Links

Recommended shape:

```js
export const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/..."
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:example@example.com"
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/..."
  }
];
```

Rules:

- Email should use `mailto:`.
- Keep LinkedIn, Email, and GitHub only unless explicitly requested.
- External links should open safely.

## Project Categories

Required categories:

```js
export const projectCategories = [
  "Mobile Games",
  "Steam Projects",
  "Game Jam Projects"
];
```

## Projects Data

A project can have one or more links.

Recommended shape:

```js
export const projects = [
  {
    id: "example-mobile-game",
    title: "Example Mobile Game",
    category: "Mobile Games",
    description: "Short description of the project.",
    image: "/images/projects/example-mobile-game.jpg",
    platformTags: ["iOS", "Android"],
    links: [
      {
        label: "App Store",
        url: "https://..."
      },
      {
        label: "Google Play",
        url: "https://..."
      },
      {
        label: "Gameplay",
        url: "https://youtube.com/..."
      }
    ]
  }
];
```

Rules:

- Some projects may have App Store and Google Play links.
- Some may only have Steam.
- Some may only have Itch.io.
- Some may only have a YouTube gameplay link.
- Do not assume every project has the same link types.
- Project cards should handle missing optional fields gracefully.

## Playables Data

Playable ads are grouped under games.

Recommended shape:

```js
export const playableGames = [
  {
    id: "arcane-arena",
    title: "Arcane Arena",
    icon: "/images/playables/arcane-arena/icon.png",
    playables: [
      {
        id: "arcane-arena-1",
        title: "Arcane Arena 1",
        url: "https://example.com/arcane-arena-1/index.html"
      },
      {
        id: "arcane-arena-2",
        title: "Arcane Arena 2",
        url: "https://example.com/arcane-arena-2/index.html"
      }
    ]
  }
];
```

Rules:

- Each game has an icon, title, and playable count.
- Clicking a game expands/collapses its playable list.
- Clicking a playable loads that playable in the test frame.
- A playable URL is already browser-runnable HTML.
- The URL may be external or local.
- Local playable paths may be supported later, but external URLs must work.

## Asset Organization

Recommended public asset structure:

```text
public/
  images/
    profile/
    projects/
    playables/
  files/
    Oguz_Han_Dede_Resume.pdf
```

Rules:

- Keep the resume file path stable.
- Recommended resume path:
  - `public/files/Oguz_Han_Dede_Resume.pdf`
- Runtime link:
  - `/files/Oguz_Han_Dede_Resume.pdf`
- For GitHub Pages base path, internal links may need base path handling.

## Data Safety

Components should handle:

- Missing image.
- Missing links.
- Empty project list.
- Empty playable list.
- Broken playable URL.
- Broken resume PDF preview.

Do not crash the page because of incomplete content.

## Creatives Data

Creative ad videos are managed through a creatives data file.

Recommended shape:

```js
export const creatives = [
  {
    id: "example-creative-1",
    title: "Creative 1",
    gameTitle: "Arcane Arena",
    gameIcon: "/images/playables/arcane-arena/icon.png",
    videoUrl: "/videos/creatives/example-creative-1.mp4",
    thumbnail: "/images/creatives/example-creative-1.jpg"
  }
];
```

Rules:

- `videoUrl` should support local MP4 paths.
- `thumbnail` is optional.
- `gameIcon` is optional.
- `gameTitle` is optional.
- Missing optional fields must not break the UI.
- Local creative video and image paths must respect the GitHub Pages base path.

Recommended creative asset structure:

```text
public/
  videos/
    creatives/
  images/
    creatives/
```

Do not crash the page because a creative thumbnail or game icon is missing.

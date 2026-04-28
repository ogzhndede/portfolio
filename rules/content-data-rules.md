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

Current implementation uses root-level TypeScript data files:

```text
data/profile.ts
data/projects.ts
data/playables.ts
data/creatives.ts
data/socialLinks.ts
```

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
  "Game Jam Projects",
  "Steam Projects"
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
        id: "app-store",
        label: "App Store",
        url: "https://..."
      },
      {
        id: "google-play",
        label: "Google Play",
        url: "https://..."
      },
      {
        id: "gameplay",
        label: "Gameplay",
        url: "https://youtube.com/..."
      }
    ],
    primaryLinkId: "app-store"
  }
];
```

Rules:

- Some projects may have App Store and Google Play links.
- Some may only have Steam.
- Some may only have Itch.io.
- Some may only have a YouTube gameplay link.
- Do not assume every project has the same link types.
- If `primaryLinkId` is set, it chooses the primary card link by matching a link `id` or `label`.
- If `primaryLinkId` is not set, the first item in `links` is the primary card link.
- Project cards should handle missing optional fields gracefully.
- Project metadata may be generated locally from the primary link into `data/generated/projectMetadata.json`.
- Generated project images should be saved under `public/images/projects/generated/`.
- Manually provided `project.image` or `project.logo` always wins over generated metadata.
- Do not fetch or scrape project metadata at runtime in the browser.

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
        id: "arcane-arena-v1",
        title: "Arcane Arena 1",
        variants: [
          {
            id: "v1",
            label: "1",
            url: "/playables/arcane-arena/v1/index.html"
          }
        ]
      },
      {
        id: "arcane-arena-v2",
        title: "Arcane Arena 2",
        variants: [
          {
            id: "v1",
            label: "1",
            url: "/playables/arcane-arena/v2/index.html"
          }
        ]
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
- A playable may use either a direct `url` or a `variants` array.
- If variants exist, the UI should expose variant buttons in the test panel.
- The URL may be external or local.
- Local playable builds should be stored under `public/playables/<game-id>/<version>/index.html`.
- Write local playable runtime URLs in data without the GitHub Pages base path, for example `/playables/arcane-arena/v1/index.html`.
- The app's public asset helper is responsible for resolving that path to `/portfolio/playables/arcane-arena/v1/index.html` on GitHub Pages.
- External URLs must continue to work.

## Asset Organization

Recommended public asset structure:

```text
public/
  images/
    profile/
    projects/
    playables/
  playables/
    arcane-arena/
      v1/
        index.html
      v2/
        index.html
    raid-rush/
      v1/
        index.html
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
- Preferred playable structure is one `index.html` per version folder:
  - `public/playables/game-name/v1/index.html`
  - `public/playables/game-name/v2/index.html`
  - `public/playables/game-name/v3/index.html`
- Avoid putting multiple playable entry HTML files in the same version folder.

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
    videoUrl: "/videos/creatives/arcane-arena/example-creative-1.mp4",
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
- Creative MP4 files should be grouped by game under `public/videos/creatives/<game-id>/`.
- Write local creative runtime URLs without the GitHub Pages base path, for example `/videos/creatives/raid-rush/raid-rush-creative-1.mp4`.

Recommended creative asset structure:

```text
public/
  videos/
    creatives/
      arcane-arena/
        arcane-arena-creative-1.mp4
      raid-rush/
        raid-rush-creative-1.mp4
  images/
    creatives/
```

Do not crash the page because a creative thumbnail or game icon is missing.

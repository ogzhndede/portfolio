# Portfolio

Personal portfolio for a Game / Playable Ads Developer, built as a static Next.js site for GitHub Pages.

Target deployment URL:

```text
https://username.github.io/portfolio/
```

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Static export through `next build`

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Static Build

Create the static GitHub Pages export:

```bash
npm run build
```

Expected output folder:

```text
out/
```

Deploy the contents of `out/` to GitHub Pages for the `portfolio` repository.

## GitHub Pages Configuration

The project is configured for:

```text
basePath: /portfolio
output: export
trailingSlash: true
images.unoptimized: true
```

Internal public assets are stored without the `/portfolio` prefix in data files and resolved at runtime with `publicAssetPath`.

Examples:

```text
/images/profile/ben.png -> /portfolio/images/profile/ben.png
/images/projects/ben.png -> /portfolio/images/projects/ben.png
/images/playables/g1.png -> /portfolio/images/playables/g1.png
/playables/arcane-arena/v1/index.html -> /portfolio/playables/arcane-arena/v1/index.html
/videos/creatives/raid-rush/raid-rush-creative-1.mp4 -> /portfolio/videos/creatives/raid-rush/raid-rush-creative-1.mp4
/files/Oguz_Han_Dede_Resume.pdf -> /portfolio/files/Oguz_Han_Dede_Resume.pdf
```

Do not write `/portfolio` in data files.

## Playable Builds

Store local playable builds under:

```text
public/playables/<game-id>/<version>/index.html
```

Example:

```text
public/playables/arcane-arena/v1/index.html
public/playables/arcane-arena/v2/index.html
public/playables/raid-rush/v1/index.html
```

Reference them in `data/playables.ts` as runtime URLs without the GitHub Pages base path:

```ts
{
  id: "arcane-arena-v1",
  title: "Arcane Arena 1",
  variants: [
    {
      id: "v1",
      label: "1",
      url: "/playables/arcane-arena/v1/index.html",
    },
  ],
  aspect: "16:9",
}
```

The preferred structure is one `index.html` per version folder. If there are multiple playable builds, use separate folders such as `v1`, `v2`, and `v3`.

## Creative Videos

Store local creative MP4 files under:

```text
public/videos/creatives/<game-id>/<file-name>.mp4
```

Example:

```text
public/videos/creatives/raid-rush/raid-rush-creative-1.mp4
```

Reference them in `data/creatives.ts` without the GitHub Pages base path:

```ts
{
  id: "raid-rush-creative-1",
  title: "Creative 1",
  gameTitle: "Raid Rush",
  gameIcon: "/images/playables/raid_rush_icon.png",
  videoUrl: "/videos/creatives/raid-rush/raid-rush-creative-1.mp4",
}
```

`thumbnail` is optional. If no thumbnail is provided, the video preview itself is used.

## Content Data Suggestions

After adding playable folders or creative MP4 files, you can print suggested data entries:

```bash
npm run suggest-content-data
```

This is a local helper only. The static site does not scan folders at runtime.

## Project Metadata Fetching

Project cards can use generated metadata when a manual image or description is missing.

Add or update project links in:

```text
data/projects.ts
```

Then run:

```bash
npm run fetch-project-metadata
```

To refresh existing generated metadata and re-download images:

```bash
npm run fetch-project-metadata -- --force
```

The script:

- reads `data/projects.ts`
- uses `primaryLinkId` when present, otherwise the first item in `links`
- fetches Open Graph / Twitter / basic HTML metadata locally
- downloads generated project images into `public/images/projects/generated/`
- writes metadata into `data/generated/projectMetadata.json`

Manual project fields still win. If `image` or `logo` is set in `data/projects.ts`, that local image is used instead of a generated one.

Use data paths like:

```text
/images/projects/generated/my-game.jpg
```

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
/files/Oguz_Han_Dede_Resume.pdf -> /portfolio/files/Oguz_Han_Dede_Resume.pdf
```

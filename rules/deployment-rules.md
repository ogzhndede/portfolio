# Deployment Rules — GitHub Pages

## Target

The portfolio is deployed through GitHub Pages.

Repository name:

```text
portfolio
```

Expected URL pattern:

```text
https://username.github.io/portfolio/
```

## Static Site Requirement

The site must be compatible with static hosting.

For Next.js, this usually means:

- Static export or static-compatible build.
- No server-only runtime behavior.
- No API routes required for core functionality.
- No dynamic server rendering dependency.

## Base Path

Because the site is hosted under a repository path, internal links and assets may need base path support.

Expected base path:

```text
/portfolio
```

Rules:

- Internal asset paths must work under `/portfolio/`.
- Avoid hardcoding paths that only work at domain root.
- If using Next.js config, consider `basePath` and asset prefix needs.
- Use helper functions for internal public asset URLs if necessary.

## Manual Deployment

Manual deployment is acceptable.

Do not add GitHub Actions unless explicitly requested.

If a deployment script is added, keep it simple and documented.

## Build Output

The current build output is unknown.

Do not assume `dist` or `out` blindly. Check the existing Next.js setup.

If creating or adjusting static export, document the expected output folder.

Common static output folder:

```text
out/
```

## Resume and Static Files

Resume path should be stable:

```text
public/files/Oguz_Han_Dede_Resume.pdf
```

Runtime path:

```text
/files/Oguz_Han_Dede_Resume.pdf
```

When deployed under `/portfolio/`, the actual browser path may need to resolve as:

```text
/portfolio/files/Oguz_Han_Dede_Resume.pdf
```

## Playable URLs

Playable URLs may be external browser-runnable HTML links.

Local playable URLs may be supported later.

Rules:

- Do not assume all playable URLs are local.
- External URLs should be passed directly to iframe `src`.
- Internal URLs should be base-path-safe.

## External Links

Project links, social links, and playable external URLs should open safely.

Use appropriate link attributes when opening new tabs:

```html
target="_blank"
rel="noopener noreferrer"
```

## No Backend

Do not add:

- backend server
- API route dependency
- database
- authentication
- cloud storage
- server-side upload/download system

Everything should work as static files and client-side UI.

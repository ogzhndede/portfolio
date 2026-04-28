import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PROJECTS_FILE = path.join(ROOT, "data", "projects.ts");
const METADATA_FILE = path.join(ROOT, "data", "generated", "projectMetadata.json");
const IMAGE_DIR = path.join(ROOT, "public", "images", "projects", "generated");
const FORCE = process.argv.includes("--force");

function findArrayLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find ${marker}`);
  }

  const equalsIndex = source.indexOf("=", markerIndex);
  const startIndex = source.indexOf("[", equalsIndex);
  if (startIndex === -1) {
    throw new Error(`Could not find array start for ${marker}`);
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      return source.slice(startIndex, index + 1);
    }
  }

  throw new Error(`Could not find array end for ${marker}`);
}

function loadProjects(source) {
  const literal = findArrayLiteral(source, "export const projects");
  return Function(`"use strict"; return (${literal});`)();
}

function getPrimaryLink(project) {
  const links = project.links?.length
    ? project.links
    : project.itchUrl
      ? [{ id: "itch", label: "Itch.io", url: project.itchUrl }]
      : [];

  if (!links.length) return null;
  if (!project.primaryLinkId) return links[0];
  return links.find((link) => link.id === project.primaryLinkId || link.label === project.primaryLinkId) ?? links[0];
}

function isExternalHttpUrl(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(['"])(.*?)\\1`, "i");
  return tag.match(pattern)?.[2];
}

function findMeta(html, keys) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const property = getAttribute(tag, "property") ?? getAttribute(tag, "name");
    if (!property || !keys.includes(property.toLowerCase())) continue;

    const content = getAttribute(tag, "content");
    if (content) return decodeHtml(content);
  }

  return "";
}

function findTitle(html) {
  return decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
}

function absolutizeUrl(value, pageUrl) {
  if (!value) return "";
  try {
    return new URL(value, pageUrl).toString();
  } catch {
    return "";
  }
}

function detectSource(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("store.steampowered.com")) return "Steam";
    if (host.includes("itch.io")) return "Itch.io";
    if (host.includes("apps.apple.com")) return "App Store";
    if (host.includes("play.google.com")) return "Google Play";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
    return host;
  } catch {
    return "";
  }
}

function sanitizeFilePart(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "project";
}

function extensionFromContentType(contentType = "") {
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  return "";
}

function extensionFromUrl(url) {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  } catch {
    return "";
  }
  return "";
}

async function readExistingMetadata() {
  if (!existsSync(METADATA_FILE)) return {};

  try {
    return JSON.parse(await readFile(METADATA_FILE, "utf8"));
  } catch {
    return {};
  }
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(project, imageUrl) {
  if (!imageUrl) return "";

  await mkdir(IMAGE_DIR, { recursive: true });

  const response = await fetch(imageUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 metadata fetcher",
      accept: "image/avif,image/webp,image/png,image/jpeg,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`image fetch failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const ext = extensionFromContentType(contentType) || extensionFromUrl(imageUrl) || ".jpg";
  const fileName = `${sanitizeFilePart(project.id)}${ext}`;
  const outputPath = path.join(IMAGE_DIR, fileName);

  if (!FORCE && await fileExists(outputPath)) {
    return `/images/projects/generated/${fileName}`;
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, bytes);
  return `/images/projects/generated/${fileName}`;
}

async function fetchProjectMetadata(project, primaryLink) {
  const response = await fetch(primaryLink.url, {
    headers: {
      "user-agent": "Mozilla/5.0 metadata fetcher",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`page fetch failed: ${response.status}`);
  }

  const html = await response.text();
  const title = findMeta(html, ["og:title"]) || findMeta(html, ["twitter:title"]) || findTitle(html);
  const description = findMeta(html, ["og:description"]) || findMeta(html, ["twitter:description"]) || findMeta(html, ["description"]);
  const imageUrl = absolutizeUrl(
    findMeta(html, ["og:image", "og:image:url", "og:image:secure_url"]) || findMeta(html, ["twitter:image", "twitter:image:src"]),
    primaryLink.url
  );

  let generatedImage = "";
  let imageDownloadError = "";

  if (!project.image && imageUrl) {
    try {
      generatedImage = await downloadImage(project, imageUrl);
    } catch (error) {
      imageDownloadError = error instanceof Error ? error.message : String(error);
    }
  }

  return {
    projectId: project.id,
    sourceUrl: primaryLink.url,
    source: detectSource(primaryLink.url),
    title,
    description,
    remoteImage: imageUrl,
    image: generatedImage,
    fetchedAt: new Date().toISOString(),
    ...(imageDownloadError ? { imageDownloadError } : {}),
  };
}

async function main() {
  const projectsSource = await readFile(PROJECTS_FILE, "utf8");
  const projects = loadProjects(projectsSource);
  const existingMetadata = await readExistingMetadata();
  const nextMetadata = { ...existingMetadata };

  await mkdir(path.dirname(METADATA_FILE), { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });

  console.log(`Reading ${projects.length} projects from data/projects.ts`);

  for (const project of projects) {
    const primaryLink = getPrimaryLink(project);

    if (!primaryLink || !isExternalHttpUrl(primaryLink.url)) {
      console.log(`- ${project.id}: skipped, no external primary link`);
      continue;
    }

    if (!FORCE && nextMetadata[project.id]?.sourceUrl === primaryLink.url) {
      console.log(`- ${project.id}: skipped, metadata already exists (use --force to refresh)`);
      continue;
    }

    try {
      console.log(`- ${project.id}: fetching ${primaryLink.url}`);
      nextMetadata[project.id] = await fetchProjectMetadata(project, primaryLink);
      console.log(`  ok: ${nextMetadata[project.id].title || "metadata fetched"}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      nextMetadata[project.id] = {
        ...(nextMetadata[project.id] ?? {}),
        projectId: project.id,
        sourceUrl: primaryLink.url,
        source: detectSource(primaryLink.url),
        fetchedAt: new Date().toISOString(),
        error: message,
      };
      console.log(`  failed: ${message}`);
    }
  }

  await writeFile(METADATA_FILE, `${JSON.stringify(nextMetadata, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, METADATA_FILE)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

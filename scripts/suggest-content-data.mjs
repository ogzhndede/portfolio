import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function toTitle(value) {
  return value
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function listDirectories(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareNatural);
}

function listFiles(directory, extension) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(extension))
    .map((entry) => entry.name)
    .sort(compareNatural);
}

function compareNatural(first, second) {
  return first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" });
}

function listPlayableHtmlFiles(directory) {
  const files = listFiles(directory, ".html");
  const numberedFiles = files.filter((file) => /^index\d+\.html$/i.test(file));

  if (numberedFiles.length > 0) return numberedFiles;
  if (files.includes("index.html")) return ["index.html"];
  return files.filter((file) => /^index.*\.html$/i.test(file));
}

function suggestedGameIcon(game) {
  const iconsRoot = path.join(root, "public", "images", "playables");
  const nestedIcon = path.join(root, "public", "images", "playables", game, "icon.png");
  if (existsSync(nestedIcon)) {
    return `/images/playables/${game}/icon.png`;
  }

  const hyphenIcon = `${game}-icon.png`;
  const hyphenIconPath = path.join(root, "public", "images", "playables", hyphenIcon);
  if (existsSync(hyphenIconPath)) {
    return `/images/playables/${hyphenIcon}`;
  }

  const flatIcon = `${game.replace(/-/g, "_")}_icon.png`;
  const flatIconPath = path.join(root, "public", "images", "playables", flatIcon);
  if (existsSync(flatIconPath)) {
    return `/images/playables/${flatIcon}`;
  }

  const iconFiles = listFiles(iconsRoot, ".png");
  const firstToken = game.split("-")[0];
  const fuzzyIcon = iconFiles.find((file) => file.startsWith(`${firstToken}-`) && file.endsWith("-icon.png"));
  if (fuzzyIcon) {
    return `/images/playables/${fuzzyIcon}`;
  }

  return "";
}

function printPlayables() {
  const playablesRoot = path.join(root, "public", "playables");
  const games = listDirectories(playablesRoot);

  console.log("Suggested playableGames entries:");
  console.log("");

  if (games.length === 0) {
    console.log("// No playable game folders found under public/playables.");
    return;
  }

  console.log("export const playableGames = [");
  for (const game of games) {
    const versions = listDirectories(path.join(playablesRoot, game));
    const gameIcon = suggestedGameIcon(game);

    console.log("  {");
    console.log(`    id: "${game}",`);
    console.log(`    title: "${toTitle(game)}",`);
    if (gameIcon) {
      console.log(`    icon: "${gameIcon}",`);
      console.log(`    logo: "${gameIcon}",`);
    }
    console.log("    playables: [");

    for (const [index, version] of versions.entries()) {
      const htmlFiles = listPlayableHtmlFiles(path.join(playablesRoot, game, version));
      if (htmlFiles.length === 0) continue;

      console.log("      {");
      console.log(`        id: "${game}-${version}",`);
      console.log(`        label: "${toTitle(game)} ${index + 1}",`);
      console.log(`        title: "${toTitle(game)} ${index + 1}",`);
      if (htmlFiles.length === 1 && htmlFiles[0] === "index.html") {
        console.log(`        url: "/playables/${game}/${version}/index.html",`);
      } else {
        console.log("        variants: [");
        for (const [variantIndex, file] of htmlFiles.entries()) {
          console.log(`          { id: "${file.replace(/\.html$/i, "")}", label: "${variantIndex + 1}", url: "/playables/${game}/${version}/${file}" },`);
        }
        console.log("        ],");
      }
      console.log(`        aspect: "16:9",`);
      console.log("      },");
    }

    console.log("    ],");
    console.log("  },");
  }
  console.log("];");
}

function printCreatives() {
  const creativesRoot = path.join(root, "public", "videos", "creatives");
  const games = listDirectories(creativesRoot);

  console.log("");
  console.log("Suggested creatives entries:");
  console.log("");

  if (games.length === 0) {
    console.log("// No creative game folders found under public/videos/creatives.");
    return;
  }

  console.log("export const creatives = [");
  for (const game of games) {
    const files = listFiles(path.join(creativesRoot, game), ".mp4");
    const gameIcon = suggestedGameIcon(game);

    for (const file of files) {
      const id = file.replace(/\.mp4$/i, "");

      console.log("  {");
      console.log(`    id: "${id}",`);
      console.log(`    title: "${toTitle(id)}",`);
      console.log(`    gameTitle: "${toTitle(game)}",`);
      if (gameIcon) {
        console.log(`    gameIcon: "${gameIcon}",`);
      }
      console.log(`    videoUrl: "/videos/creatives/${game}/${file}",`);
      console.log("  },");
    }
  }
  console.log("];");
}

printPlayables();
printCreatives();

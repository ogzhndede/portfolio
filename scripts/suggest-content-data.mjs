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
    .sort((a, b) => a.localeCompare(b));
}

function listFiles(directory, extension) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(extension))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function suggestedGameIcon(game) {
  const nestedIcon = path.join(root, "public", "images", "playables", game, "icon.png");
  if (existsSync(nestedIcon)) {
    return `/images/playables/${game}/icon.png`;
  }

  const flatIcon = `${game.replace(/-/g, "_")}_icon.png`;
  const flatIconPath = path.join(root, "public", "images", "playables", flatIcon);
  if (existsSync(flatIconPath)) {
    return `/images/playables/${flatIcon}`;
  }

  return `/images/playables/${game}/icon.png`;
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
    console.log(`    icon: "${gameIcon}",`);
    console.log(`    logo: "${gameIcon}",`);
    console.log("    playables: [");

    for (const [index, version] of versions.entries()) {
      console.log("      {");
      console.log(`        id: "${game}-${version}",`);
      console.log(`        label: "${toTitle(game)} ${index + 1}",`);
      console.log(`        title: "${toTitle(game)} ${index + 1}",`);
      console.log("        variants: [");
      console.log(`          { id: "v1", label: "1", url: "/playables/${game}/${version}/index.html" },`);
      console.log("        ],");
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
      console.log(`    gameIcon: "${gameIcon}",`);
      console.log(`    videoUrl: "/videos/creatives/${game}/${file}",`);
      console.log("  },");
    }
  }
  console.log("];");
}

printPlayables();
printCreatives();

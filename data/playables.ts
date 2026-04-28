export type PlayableAspect = "4:3" | "9:16" | "9:20" | "3:4" | "16:9" | "20:9";

export type PlayableVariant = {
  id: string;
  label: string;
  url: string;
};

export type PlayableItem = {
  id: string;
  label: string;
  title: string;
  url?: string;
  variants?: PlayableVariant[];
  aspect: PlayableAspect;
};

export type PlayableGame = {
  id: string;
  title: string;
  icon?: string;
  logo?: string;
  desc?: string;
  playables: PlayableItem[];
};

export const playableGames: PlayableGame[] = [
  {
    id: "raid-rush",
    title: "Raid Rush",
    icon: "/images/playables/raid-rush-icon.png",
    logo: "/images/playables/raid-rush-icon.png",
    playables: [
      {
        id: "raid-rush-v1",
        label: "Raid Rush 1",
        title: "Raid Rush 1",
        url: "/playables/raid-rush/v1/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v2",
        label: "Raid Rush 2",
        title: "Raid Rush 2",
        url: "/playables/raid-rush/v2/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v3",
        label: "Raid Rush 3",
        title: "Raid Rush 3",
        url: "/playables/raid-rush/v3/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v4",
        label: "Raid Rush 4",
        title: "Raid Rush 4",
        url: "/playables/raid-rush/v4/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v5",
        label: "Raid Rush 5",
        title: "Raid Rush 5",
        url: "/playables/raid-rush/v5/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v6",
        label: "Raid Rush 6",
        title: "Raid Rush 6",
        url: "/playables/raid-rush/v6/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v7",
        label: "Raid Rush 7",
        title: "Raid Rush 7",
        variants: [
          { id: "index1", label: "1", url: "/playables/raid-rush/v7/index1.html" },
          { id: "index2", label: "2", url: "/playables/raid-rush/v7/index2.html" },
        ],
        aspect: "16:9",
      },
      {
        id: "raid-rush-v8",
        label: "Raid Rush 8",
        title: "Raid Rush 8",
        url: "/playables/raid-rush/v8/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v9",
        label: "Raid Rush 9",
        title: "Raid Rush 9",
        url: "/playables/raid-rush/v9/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v10",
        label: "Raid Rush 10",
        title: "Raid Rush 10",
        url: "/playables/raid-rush/v10/index.html",
        aspect: "16:9",
      },
      {
        id: "raid-rush-v11",
        label: "Raid Rush 11",
        title: "Raid Rush 11",
        url: "/playables/raid-rush/v11/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "arcane-arena",
    title: "Arcane Arena",
    icon: "/images/playables/arcane-arena-icon.png",
    logo: "/images/playables/arcane-arena-icon.png",
    playables: [
      {
        id: "arcane-arena-v1",
        label: "Arcane Arena 1",
        title: "Arcane Arena 1",
        url: "/playables/arcane-arena/v1/index.html",
        aspect: "16:9",
      },
      {
        id: "arcane-arena-v2",
        label: "Arcane Arena 2",
        title: "Arcane Arena 2",
        variants: [
          { id: "index1", label: "1", url: "/playables/arcane-arena/v2/index1.html" },
          { id: "index2", label: "2", url: "/playables/arcane-arena/v2/index2.html" },
        ],
        aspect: "16:9",
      },
      {
        id: "arcane-arena-v3",
        label: "Arcane Arena 3",
        title: "Arcane Arena 3",
        url: "/playables/arcane-arena/v3/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "sling-plane",
    title: "Sling Plane",
    icon: "/images/playables/sling-plane-icon.png",
    logo: "/images/playables/sling-plane-icon.png",
    playables: [
      {
        id: "sling-plane-v1",
        label: "Sling Plane 1",
        title: "Sling Plane 1",
        url: "/playables/sling-plane/v1/index.html",
        aspect: "16:9",
      },
      {
        id: "sling-plane-v2",
        label: "Sling Plane 2",
        title: "Sling Plane 2",
        url: "/playables/sling-plane/v2/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "ball-brawl",
    title: "Ball Brawl",
    icon: "/images/playables/ball-brawl-icon.png",
    logo: "/images/playables/ball-brawl-icon.png",
    playables: [
      {
        id: "ball-brawl-v1",
        label: "Ball Brawl 1",
        title: "Ball Brawl 1",
        url: "/playables/ball-brawl/v1/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "hundred-mystery-buttons",
    title: "Hundred Buttons",
    icon: "/images/playables/hundred-mystry-buttons-icon.png",
    logo: "/images/playables/hundred-mystry-buttons-icon.png",
    playables: [
      {
        id: "hundred-mystery-buttons-v1",
        label: "Hundred Buttons 1",
        title: "Hundred Buttons 1",
        url: "/playables/hundred-mystery-buttons/v1/index.html",
        aspect: "16:9",
      },
      {
        id: "hundred-mystery-buttons-v2",
        label: "Hundred Buttons 2",
        title: "Hundred Buttons 2",
        url: "/playables/hundred-mystery-buttons/v2/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "valet-master",
    title: "Valet Master",
    icon: "/images/playables/valet-master-icon.png",
    logo: "/images/playables/valet-master-icon.png",
    playables: [
      {
        id: "valet-master-v1",
        label: "Valet Master 1",
        title: "Valet Master 1",
        url: "/playables/valet-master/v1/index.html",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "others",
    title: "Others",
    playables: [
      {
        id: "others-v1",
        label: "Others 1",
        title: "Others 1",
        url: "/playables/others/v1/index.html",
        aspect: "16:9",
      },
      {
        id: "others-v2",
        label: "Others 2",
        title: "Others 2",
        variants: [
          { id: "index1", label: "1", url: "/playables/others/v2/index1.html" },
          { id: "index2", label: "2", url: "/playables/others/v2/index2.html" },
        ],
        aspect: "16:9",
      },
    ],
  },
];

export const GAMES = playableGames;
export type GameAspect = PlayableAspect;
export type GameItem = PlayableGame;

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
  icon: string;
  logo: string;
  desc?: string;
  playables: PlayableItem[];
};

export const playableGames: PlayableGame[] = [
  {
    id: "raid-rush",
    title: "Raid Rush",
    icon: "/images/playables/raid_rush_icon.png",
    logo: "/images/playables/raid_rush_icon.png",
    desc: "Fast-paced raid action game",
    playables: [
      {
        id: "raid-rush-v1",
        label: "Raid Rush 1",
        title: "Raid Rush 1",
        variants: [
          {
            id: "v1",
            label: "1",
            url: "/playables/raid-rush/v1/index.html",
          },
        ],
        aspect: "9:20",
      },
    ],
  },
  {
    id: "arcane-arena",
    title: "Arcane Arena",
    icon: "/images/playables/arcane_arena_icon.png",
    logo: "/images/playables/arcane_arena_icon.png",
    desc: "Strategic arena battle experience",
    playables: [
      {
        id: "arcane-arena-v1",
        label: "Arcane Arena 1",
        title: "Arcane Arena 1",
        variants: [
          {
            id: "v1",
            label: "1",
            url: "/playables/arcane-arena/v1/index.html",
          },
        ],
        aspect: "4:3",
      },
      {
        id: "arcane-arena-v2",
        label: "Arcane Arena 2",
        title: "Arcane Arena 2",
        variants: [
          {
            id: "v1",
            label: "1",
            url: "/playables/arcane-arena/v2/index.html",
          },
        ],
        aspect: "9:16",
      },
    ],
  },
];

export const GAMES = playableGames;
export type GameAspect = PlayableAspect;
export type GameItem = PlayableGame;

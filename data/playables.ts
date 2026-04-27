export type PlayableAspect = "4:3" | "9:16" | "9:20" | "3:4" | "16:9" | "20:9";

export type PlayableItem = {
  id: string;
  label: string;
  title: string;
  url: string;
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
    id: "raidrush",
    title: "RaidRush",
    icon: "/images/playables/g1.png",
    logo: "/images/playables/g1.png",
    desc: "Fast-paced raid action game",
    playables: [
      {
        id: "raidrush-v1",
        label: "RaidRush 1",
        title: "RaidRush 1",
        url: "/playables/g1/index.html",
        aspect: "9:20",
      },
    ],
  },
  {
    id: "arcane-arena",
    title: "Arcane Arena",
    icon: "/images/playables/g2.png",
    logo: "/images/playables/g2.png",
    desc: "Strategic arena battle experience",
    playables: [
      {
        id: "arcane-v1",
        label: "Arcane Arena 1",
        title: "Arcane Arena 1",
        url: "/playables/g2/index.html",
        aspect: "4:3",
      },
      {
        id: "arcane-v2",
        label: "Arcane Arena 2",
        title: "Arcane Arena 2",
        url: "/playables/g3/index.html",
        aspect: "9:16",
      },
    ],
  },
];

export const GAMES = playableGames;
export type GameAspect = PlayableAspect;
export type GameItem = PlayableGame;

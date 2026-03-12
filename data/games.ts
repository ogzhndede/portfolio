
export type GameAspect = "4:3" | "9:16" | "9:20" | "3:4" | "16:9" | "20:9";

export type PlayableItem = {
  id: string;
  label: string;
  url: string;
  aspect: GameAspect; 
};

export type GameItem = {
  id: string;
  title: string;
  logo: string;
  desc?: string;
  playables: PlayableItem[];
};

export const GAMES: GameItem[] = [
  {
    id: "raidrush",
    title: "RaidRush",
    logo: "/logos/g1.png",
    desc: "Fast-paced raid action game",
    playables: [
      { id: "raidrush-v1", label: "RaidRush 1", url: "/playables/g1/index.html", aspect: "9:20" },
    ],
  },
  {
    id: "arcane-arena",
    title: "Arcane Arena",
    logo: "/logos/g2.png",
    desc: "Strategic arena battle experience",
    playables: [
      { id: "arcane-v1", label: "Arcane Arena 1", url: "/playables/g2/index.html", aspect: "4:3" },
      { id: "arcane-v2", label: "Arcane Arena 2", url: "/playables/g3/index.html", aspect: "9:16" },
    ],
  },
];
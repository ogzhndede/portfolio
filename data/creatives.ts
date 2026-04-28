export type CreativeItem = {
  id: string;
  title: string;
  videoUrl: string;
  gameTitle?: string;
  gameIcon?: string;
  thumbnail?: string;
};

export const creatives: CreativeItem[] = [
  {
    id: "creative-1",
    title: "Creative 1",
    gameTitle: "Raid Rush",
    gameIcon: "/images/playables/raid-rush-icon.png",
    videoUrl: "/videos/creatives/raid-rush/creative-1.mp4",
  },
  {
    id: "creative-2",
    title: "Creative 2",
    gameTitle: "Raid Rush",
    gameIcon: "/images/playables/raid-rush-icon.png",
    videoUrl: "/videos/creatives/raid-rush/creative-2.mp4",
  },
];

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
    id: "raid-rush-creative-1",
    title: "Creative 1",
    gameTitle: "Raid Rush",
    gameIcon: "/images/playables/raid_rush_icon.png",
    videoUrl: "/videos/creatives/raid-rush/raid-rush-creative-1.mp4",
  },
];

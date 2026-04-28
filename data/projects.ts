export type ProjectCategory = "Mobile Games" | "Steam Projects" | "Game Jam Projects";

export type ProjectLink = {
  id?: string;
  label: string;
  url: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  description?: string;
  desc?: string;
  image?: string;
  logo?: string;
  platformTags?: string[];
  links?: ProjectLink[];
  itchUrl?: string;
  primaryLinkId?: string;
};

export const projectCategories: ProjectCategory[] = [
  "Mobile Games",
  "Game Jam Projects",
  "Steam Projects",
];

export const projects: ProjectItem[] = [
  {
    id: "pen-dig",
    title: "Pen Dig",
    category: "Mobile Games",
    platformTags: ["Android", "iOS"],
    links: [
      {
        id: "google-play",
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.DoDoGame.PenDig",
      },
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/tr/app/pen-dig/id1669978113?l=tr&platform=ipad",
      },
    ],
  },
  {
    id: "color-pools",
    title: "Color Pools",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/color-pools/id1639554624",
      },
    ],
  },
  {
    id: "discount-run",
    title: "Discount Run",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/discount-run/id6443568868",
      },
    ],
  },
  {
    id: "airport-management",
    title: "Airport Management",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/airport-management/id1632240557",
      },
    ],
  },
  {
    id: "sculling-asmr",
    title: "Sculling ASMR",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/scullingasmr/id6477461973",
      },
    ],
  },
  {
    id: "water-cut-coin",
    title: "Water Cut Coin",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/water-cut-coin/id6476575955",
      },
    ],
  },
  {
    id: "one-gun-run",
    title: "One Gun Run",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/one-gun-run/id6471838989",
      },
    ],
  },
  {
    id: "currency-mining",
    title: "Currency Mining",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/currency-mining/id1661259832",
      },
    ],
  },
  {
    id: "color-down-stairs",
    title: "Color Down Stairs",
    category: "Mobile Games",
    platformTags: ["iOS"],
    links: [
      {
        id: "app-store",
        label: "App Store",
        url: "https://apps.apple.com/us/app/color-down-stairs/id1644718035",
      },
    ],
  },
  {
    id: "the-man-behind",
    title: "The Man Behind",
    category: "Game Jam Projects",
    platformTags: ["Itch.io"],
    links: [
      {
        id: "itch",
        label: "Itch.io",
        url: "https://justbadcode.itch.io/the-man-behind",
      },
    ],
  },
  {
    id: "buzzs-sketchbook",
    title: "Buzz's Sketchbook",
    category: "Game Jam Projects",
    platformTags: ["Itch.io"],
    links: [
      {
        id: "itch",
        label: "Itch.io",
        url: "https://witchiewitch.itch.io/buzzs-sketchbook",
      },
    ],
  },
  {
    id: "inverser",
    title: "Inverser",
    category: "Game Jam Projects",
    platformTags: ["Itch.io"],
    links: [
      {
        id: "itch",
        label: "Itch.io",
        url: "https://witchiewitch.itch.io/inverser",
      },
    ],
  },
  {
    id: "ad-agency-simulator",
    title: "Ad Agency Simulator",
    category: "Steam Projects",
    platformTags: ["Steam"],
    links: [
      {
        id: "steam",
        label: "Steam",
        url: "https://store.steampowered.com/app/2701980/Ad_Agency_Simulator/",
      },
    ],
  },
];

export const PROJECTS = projects;

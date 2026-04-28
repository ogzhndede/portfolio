export type ProjectCategory = "Mobile Games" | "Steam Projects" | "Game Jam Projects";

export type ProjectLink = {
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
};

export const projectCategories: ProjectCategory[] = [
  "Game Jam Projects",
  "Mobile Games",
  "Steam Projects",
];

export const projects: ProjectItem[] = [
  {
    id: "project-1",
    title: "Project Title",
    category: "Mobile Games",
    image: "/images/projects/ben.png",
    logo: "/images/projects/ben.png",
    description: "Short description of the project. What it is, what makes it interesting.",
    desc: "Short description of the project. What it is, what makes it interesting.",
    platformTags: ["Mobile"],
    links: [
      {
        label: "Itch.io",
        url: "https://itch.io/your-game",
      },
    ],
  },
  {
    id: "project-2",
    title: "Project Title",
    category: "Game Jam Projects",
    image: "/images/projects/ben.png",
    logo: "/images/projects/ben.png",
    description: "Short description of the project. What it is, what makes it interesting.",
    desc: "Short description of the project. What it is, what makes it interesting.",
    platformTags: ["Prototype"],
    links: [
      {
        label: "Itch.io",
        url: "https://itch.io/your-game",
      },
    ],
  },
];

export const PROJECTS = projects;

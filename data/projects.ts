
export type ProjectItem = {
    id: string;
    title: string;
    logo: string;
    desc: string;
    itchUrl: string;
};

export const PROJECTS: ProjectItem[] = [
    {
        id: "project-1",
        title: "Project Title",
        logo: "/projects/ben.png",
        desc: "Short description of the project. What it is, what makes it interesting.",
        itchUrl: "https://itch.io/your-game",
    },
    {
        id: "project-2",
        title: "Project Title",
        logo: "/projects/ben.png",
        desc: "Short description of the project. What it is, what makes it interesting.",
        itchUrl: "https://itch.io/your-game",
    },
];
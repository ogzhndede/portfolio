export type NavigationItem = {
  href: string;
  label: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "/about", label: "About Me" },
  { href: "/works", label: "Playables" },
  { href: "/projects", label: "Projects" },
  { href: "/creatives", label: "Creatives" },
  { href: "/cv", label: "CV" },
];

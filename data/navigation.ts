export type NavigationItem = {
  href: string;
  label: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/works", label: "Playables" },
  { href: "/cv", label: "CV" },
];

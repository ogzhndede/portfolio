export type SocialLink = {
  id: "linkedin" | "email" | "github";
  label: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/oguzhandede/",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:oguzhandede99@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/ogzhndede",
  },
];

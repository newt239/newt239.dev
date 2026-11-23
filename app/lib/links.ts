export type SocialLink = {
  name: string;
  handle?: string;
  href: string;
  logo: string;
  logoOnDark?: string;
};

export const socialLinks = {
  x: { name: "X", handle: "@newt239", href: "https://x.com/newt239", logo: "/x.svg", logoOnDark: "/x-white.svg" },
  github: {
    name: "GitHub",
    handle: "@newt239",
    href: "https://github.com/newt239",
    logo: "/github.svg",
    logoOnDark: "/github-white.svg",
  },
  zenn: { name: "Zenn", handle: "@newt_st21", href: "https://zenn.dev/newt_st21", logo: "/zenn.png" },
  qiita: { name: "Qiita", handle: "@newt239", href: "https://qiita.com/newt239", logo: "/qiita.webp" },
  hatena: {
    name: "はてなブログ",
    href: "https://newt239.hatenablog.com/",
    logo: "/hatena.svg",
    logoOnDark: "/hatena-white.svg",
  },
  mixi2: { name: "mixi2", href: "https://mixi.social/@newt", logo: "/mixi2.webp" },
  annict: { name: "Annict", href: "https://annict.com/@newt", logo: "/annict.webp" },
  booklog: { name: "ブクログ", href: "https://booklog.jp/users/newt239", logo: "/booklog.png" },
  linkedin: { name: "LinkedIn", href: "https://www.linkedin.com/in/newt239/", logo: "/linkedin.webp" },
  fernweh: { name: "fernweh", href: "https://fernweh.newt239.dev/", logo: "/fernweh.svg" },
} as const satisfies Record<string, SocialLink>;

export const profileSameAs = [
  socialLinks.x,
  socialLinks.github,
  socialLinks.zenn,
  socialLinks.qiita,
  socialLinks.hatena,
  socialLinks.mixi2,
  socialLinks.annict,
  socialLinks.booklog,
  socialLinks.linkedin,
].map((link) => link.href);

export const apiUrl = "https://api.newt239.dev";
export const discordInviteUrl = "https://discord.gg/rct5sx6rbZ";

type SocialLink = {
  name: string;
  handle?: string;
  href: string;
};

export const socialLinks = {
  x: { name: "X", handle: "@newt239", href: "https://x.com/newt239" },
  github: { name: "GitHub", handle: "@newt239", href: "https://github.com/newt239" },
  zenn: { name: "Zenn", handle: "@newt_st21", href: "https://zenn.dev/newt_st21" },
  qiita: { name: "Qiita", handle: "@newt239", href: "https://qiita.com/newt239" },
  hatena: { name: "はてなブログ", href: "https://newt239.hatenablog.com/" },
  mixi2: { name: "mixi2", href: "https://mixi.social/@newt" },
  annict: { name: "Annict", href: "https://annict.com/@newt" },
  linkedin: { name: "LinkedIn", href: "https://www.linkedin.com/in/newt239/" },
  fernweh: { name: "fernweh", href: "https://fernweh.newt239.dev/" },
} as const satisfies Record<string, SocialLink>;

export const profileSameAs = [
  socialLinks.x,
  socialLinks.github,
  socialLinks.zenn,
  socialLinks.qiita,
  socialLinks.hatena,
  socialLinks.mixi2,
  socialLinks.annict,
  socialLinks.linkedin,
].map((link) => link.href);

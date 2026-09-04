import { siteUrl } from "./site";

export const personId = `${siteUrl}/about#person`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: "newt",
  alternateName: "newt239",
  url: `${siteUrl}/about`,
  image: `${siteUrl}/icon.webp`,
  birthDate: "2005-11-02",
  email: "contact@newt239.dev",
  nationality: "JP",
  knowsAbout: ["Web フロントエンド", "UI/UX", "Web アクセシビリティ", "TypeScript"],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "芝浦工業大学 デザイン工学部 デザイン工学科",
    url: "https://www.shibaura-it.ac.jp/",
  },
  sameAs: [
    "https://x.com/newt239",
    "https://github.com/newt239",
    "https://zenn.dev/newt_st21",
    "https://qiita.com/newt239",
    "https://newt239.hatenablog.com/",
    "https://mixi.social/@newt",
    "https://annict.com/@newt",
    "https://www.linkedin.com/in/newt239/",
  ],
};

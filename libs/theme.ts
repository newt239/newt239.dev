export type ThemeVariable = {
  name: string;
  description: string;
  defaultValue: string;
  kind?: "color" | "number" | "enum";
  allowedValues?: string[];
  min?: number;
  max?: number;
};

export type ThemeConstraint =
  | { type: "contrast"; foreground: string; background: string; min: number }
  | { type: "similar"; a: string; b: string; max: number };

export type ThemeFont = {
  family: string;
  note: string;
  query?: string;
};

export const defaultFontFamily = "fot-udkakugo-large-pr6n";

export type ThemeGenerationResponse =
  | {
      type: "success";
      message: string;
      variables: { name: string; value: string }[];
    }
  | { type: "error" | "limited"; error: unknown };

export const themeFonts: ThemeFont[] = [
  {
    family: defaultFontFamily,
    note: "FOT-UD角ゴ_ラージ Pr6N, a large-face universal-design gothic from Adobe Fonts with wide apertures and a crisp contemporary silhouette, used by transit signage, public wayfinding and product interfaces, and the right pick whenever the theme calls for clarity, neutrality or an engineered modern feel",
  },
  {
    family: "Noto Sans JP",
    query: "Noto+Sans+JP:wght@400;700",
    note: "a neutral modern gothic with even strokes, the default face of corporate sites, documentation and news media",
  },
  {
    family: "Zen Kaku Gothic New",
    query: "Zen+Kaku+Gothic+New:wght@400;700",
    note: "a calm and well-balanced gothic, common on brand sites, portfolios and design studios",
  },
  {
    family: "BIZ UDGothic",
    query: "BIZ+UDGothic:wght@400;700",
    note: "a universal-design gothic built for plain legibility, used by government, education and business systems",
  },
  {
    family: "Murecho",
    query: "Murecho:wght@400;700",
    note: "a low-contrast contemporary gothic, common on startup landing pages and developer tools",
  },
  {
    family: "M PLUS Rounded 1c",
    query: "M+PLUS+Rounded+1c:wght@400;700",
    note: "a rounded gothic that feels friendly and approachable, common on consumer apps and casual services",
  },
  {
    family: "Zen Maru Gothic",
    query: "Zen+Maru+Gothic:wght@400;700",
    note: "a soft rounded gothic with a gentle feel, used by childcare, medical and lifestyle sites",
  },
  {
    family: "Noto Serif JP",
    query: "Noto+Serif+JP:wght@400;700",
    note: "a standard mincho made for long reading, used by articles, blogs and publishing sites",
  },
  {
    family: "Shippori Mincho",
    query: "Shippori+Mincho:wght@400;700",
    note: "a slightly retro mincho with warmth, used by books, literary sites and traditional confectioners",
  },
  {
    family: "Zen Old Mincho",
    query: "Zen+Old+Mincho:wght@400;700",
    note: "a classical and dignified mincho, used by ryokan, museums and long-established brands",
  },
  {
    family: "Hina Mincho",
    query: "Hina+Mincho",
    note: "an extremely thin and delicate mincho, used by fashion, cosmetics and gallery sites",
  },
  {
    family: "Klee One",
    query: "Klee+One:wght@400;600",
    note: "a textbook-style face with a handwritten pen feel, used by education, essays and personal diaries",
  },
  {
    family: "Dela Gothic One",
    query: "Dela+Gothic+One",
    note: "an extremely heavy display face with blunt impact, used by event posters and music sites",
  },
  {
    family: "Rampart One",
    query: "Rampart+One",
    note: "a three-dimensional playful display face, used by festivals and campaign pages",
  },
  {
    family: "Yuji Syuku",
    query: "Yuji+Syuku",
    note: "a brush-written calligraphy face, used by calligraphy, traditional Japanese crafts and sake brands",
  },
  {
    family: "Yusei Magic",
    query: "Yusei+Magic",
    note: "a thick handwritten marker face, used by flyers, hand-lettered POP signage and casual campaigns",
  },
  {
    family: "Hachi Maru Pop",
    query: "Hachi+Maru+Pop",
    note: "a round handwritten pop face, used by cute and youth-oriented sites",
  },
  {
    family: "DotGothic16",
    query: "DotGothic16",
    note: "a bitmap dot face, used by retro games and 8-bit themed sites",
  },
];

export const themeVariables: ThemeVariable[] = [
  {
    name: "--text",
    description: "Main text color. Must contrast well against --bg and --surface.",
    defaultValue: "48 42 37",
  },
  {
    name: "--text-muted",
    description: "Secondary text color. Must be readable on --bg and --surface.",
    defaultValue: "110 100 90",
  },
  {
    name: "--text-faint",
    description: "Tertiary text color. Must be slightly visible on --bg and --surface.",
    defaultValue: "122 114 104",
  },
  {
    name: "--bg",
    description: "Page background color. Must contrast well against --text.",
    defaultValue: "255 248 240",
  },
  {
    name: "--accent",
    description: "Primary accent color for links. Must stand out on --bg and --surface.",
    defaultValue: "36 107 209",
  },
  {
    name: "--accent-dark",
    description: "Dark accent color. Must contrast against --bg.",
    defaultValue: "26 72 120",
  },
  {
    name: "--highlight",
    description: "Highlight/emphasis color. Must differ from --accent and stand out on --bg.",
    defaultValue: "162 132 32",
  },
  {
    name: "--surface",
    description:
      "Card/section background. Should be close to --bg but visibly distinct. --text-muted must be readable on it.",
    defaultValue: "246 240 232",
  },
  {
    name: "--surface-hover",
    description: "Hover state background. Should be noticeably darker/lighter than --surface.",
    defaultValue: "236 230 222",
  },
  {
    name: "--border",
    description: "Subtle border color. Must be visible against --bg and --surface.",
    defaultValue: "240 234 228",
  },
  {
    name: "--radius-scale",
    description:
      "Multiplier applied to every corner radius in the UI. 0 makes all corners perfectly sharp, 1 is the default rounding, 2 makes everything very round. Use small values for sharp, technical or brutal themes and large values for soft, cute or playful themes.",
    defaultValue: "1",
    kind: "number",
    min: 0,
    max: 2,
  },
  {
    name: "--border-width",
    description:
      "Thickness of card and button borders. Thick borders suit bold, comic or brutalist themes; thin or zero borders suit minimal and elegant themes.",
    defaultValue: "2px",
    kind: "enum",
    allowedValues: ["0px", "1px", "2px", "3px", "4px"],
  },
  {
    name: "--corner-shape",
    description:
      "How the rounded corners are drawn. round is a normal arc, bevel cuts the corner off, scoop carves it inward, notch cuts a rectangular step and squircle is a soft superellipse.",
    defaultValue: "round",
    kind: "enum",
    allowedValues: ["round", "bevel", "scoop", "notch", "squircle"],
  },
  {
    name: "--font-family",
    description: [
      "Japanese typeface used across the whole site. Every candidate below is a deliberate design choice, so pick the one whose impression matches the theme rather than defaulting to any of them.",
      ...themeFonts.map((font) => `"${font.family}" is ${font.note}.`),
    ].join(" "),
    defaultValue: defaultFontFamily,
    kind: "enum",
    allowedValues: themeFonts.map((font) => font.family),
  },
];

export const themeConstraints: ThemeConstraint[] = [
  { type: "similar", a: "--surface", b: "--bg", max: 1.5 },
  { type: "similar", a: "--surface-hover", b: "--surface", max: 1.6 },
  { type: "similar", a: "--border", b: "--bg", max: 2.5 },
  { type: "contrast", foreground: "--text", background: "--bg", min: 4.5 },
  { type: "contrast", foreground: "--text", background: "--surface", min: 4.5 },
  { type: "contrast", foreground: "--text-muted", background: "--bg", min: 4.5 },
  { type: "contrast", foreground: "--text-muted", background: "--surface", min: 4.5 },
  { type: "contrast", foreground: "--text-faint", background: "--bg", min: 3 },
  { type: "contrast", foreground: "--text-faint", background: "--surface", min: 3 },
  { type: "contrast", foreground: "--accent", background: "--bg", min: 4.5 },
  { type: "contrast", foreground: "--accent", background: "--surface", min: 4.5 },
  { type: "contrast", foreground: "--accent-dark", background: "--bg", min: 3 },
  { type: "contrast", foreground: "--accent-dark", background: "--surface", min: 4.5 },
  { type: "contrast", foreground: "--highlight", background: "--bg", min: 3 },
];

const applyThemeFont = (family: string) => {
  const font = themeFonts.find((themeFont) => themeFont.family === family);
  if (!font?.query) {
    document.documentElement.style.removeProperty("--font-family");
    return;
  }
  let link = document.head.querySelector<HTMLLinkElement>("link[data-theme-font]");
  if (!link) {
    const apiPreconnect = document.createElement("link");
    apiPreconnect.rel = "preconnect";
    apiPreconnect.href = "https://fonts.googleapis.com";
    const staticPreconnect = document.createElement("link");
    staticPreconnect.rel = "preconnect";
    staticPreconnect.href = "https://fonts.gstatic.com";
    staticPreconnect.crossOrigin = "anonymous";
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.dataset.themeFont = "";
    document.head.append(apiPreconnect, staticPreconnect, link);
  }
  link.href = `https://fonts.googleapis.com/css2?family=${font.query}&display=swap`;
  document.documentElement.style.setProperty("--font-family", `"${font.family}"`);
};

export const applyTheme = (variables: { name: string; value: string }[]) => {
  for (const { name, value } of variables) {
    if (name === "--font-family") {
      applyThemeFont(value);
      continue;
    }
    document.documentElement.style.setProperty(name, value);
  }
};

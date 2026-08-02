export type ThemeVariable = {
  name: string;
  description: string;
  defaultValue: string;
  kind?: "color" | "number" | "enum";
  allowedValues?: string[];
  min?: number;
  max?: number;
  contrastAgainst?: string;
  minContrast?: number;
};

export type ThemeFont = {
  family: string;
  query: string;
};

export type ThemeGenerationResponse =
  | {
      type: "success";
      message: string;
      variables: { name: string; value: string }[];
    }
  | { type: "error" | "limited"; error: unknown };

export const themeFonts: ThemeFont[] = [
  { family: "Noto Sans JP", query: "Noto+Sans+JP:wght@400;700" },
  { family: "Zen Kaku Gothic New", query: "Zen+Kaku+Gothic+New:wght@400;700" },
  { family: "Zen Kaku Gothic Antique", query: "Zen+Kaku+Gothic+Antique:wght@400;700" },
  { family: "Zen Maru Gothic", query: "Zen+Maru+Gothic:wght@400;700" },
  { family: "M PLUS Rounded 1c", query: "M+PLUS+Rounded+1c:wght@400;700" },
  { family: "M PLUS 1p", query: "M+PLUS+1p:wght@400;700" },
  { family: "BIZ UDGothic", query: "BIZ+UDGothic:wght@400;700" },
  { family: "IBM Plex Sans JP", query: "IBM+Plex+Sans+JP:wght@400;700" },
  { family: "Murecho", query: "Murecho:wght@400;700" },
  { family: "Kiwi Maru", query: "Kiwi+Maru:wght@400;500" },
  { family: "Kosugi Maru", query: "Kosugi+Maru" },
  { family: "Sawarabi Gothic", query: "Sawarabi+Gothic" },
  { family: "Noto Serif JP", query: "Noto+Serif+JP:wght@400;700" },
  { family: "Shippori Mincho", query: "Shippori+Mincho:wght@400;700" },
  { family: "Shippori Mincho B1", query: "Shippori+Mincho+B1:wght@400;700" },
  { family: "Zen Old Mincho", query: "Zen+Old+Mincho:wght@400;700" },
  { family: "BIZ UDMincho", query: "BIZ+UDMincho:wght@400;700" },
  { family: "Sawarabi Mincho", query: "Sawarabi+Mincho" },
  { family: "Hina Mincho", query: "Hina+Mincho" },
  { family: "New Tegomin", query: "New+Tegomin" },
  { family: "Klee One", query: "Klee+One:wght@400;600" },
  { family: "Zen Antique", query: "Zen+Antique" },
  { family: "Zen Kurenaido", query: "Zen+Kurenaido" },
  { family: "Kaisei Decol", query: "Kaisei+Decol:wght@400;700" },
  { family: "Dela Gothic One", query: "Dela+Gothic+One" },
  { family: "RocknRoll One", query: "RocknRoll+One" },
  { family: "Reggae One", query: "Reggae+One" },
  { family: "Rampart One", query: "Rampart+One" },
  { family: "Train One", query: "Train+One" },
  { family: "Potta One", query: "Potta+One" },
  { family: "Mochiy Pop One", query: "Mochiy+Pop+One" },
  { family: "Hachi Maru Pop", query: "Hachi+Maru+Pop" },
  { family: "Yusei Magic", query: "Yusei+Magic" },
  { family: "Yomogi", query: "Yomogi" },
  { family: "Yuji Syuku", query: "Yuji+Syuku" },
  { family: "Stick", query: "Stick" },
  { family: "DotGothic16", query: "DotGothic16" },
];

export const themeVariables: ThemeVariable[] = [
  {
    name: "--text",
    description: "Main text color. Must contrast well against --bg and --surface.",
    defaultValue: "48 42 37",
    contrastAgainst: "--bg",
    minContrast: 4.5,
  },
  {
    name: "--text-muted",
    description: "Secondary text color. Must be readable on --bg and --surface.",
    defaultValue: "110 100 90",
    contrastAgainst: "--bg",
    minContrast: 4.5,
  },
  {
    name: "--text-faint",
    description: "Tertiary text color. Must be slightly visible on --bg and --surface.",
    defaultValue: "122 114 104",
    contrastAgainst: "--bg",
    minContrast: 3,
  },
  {
    name: "--bg",
    description: "Page background color. Must contrast well against --text.",
    defaultValue: "255 248 240",
  },
  {
    name: "--bg-accent",
    description: "Accent background for tags/badges. Must contrast against --text placed on it.",
    defaultValue: "216 226 240",
  },
  {
    name: "--bg-warm",
    description:
      "Warm background for highlighted sections. Must contrast against --text placed on it.",
    defaultValue: "240 220 196",
  },
  {
    name: "--accent",
    description: "Primary accent color for links. Must stand out on --bg and --surface.",
    defaultValue: "74 136 224",
    contrastAgainst: "--bg",
    minContrast: 4.5,
  },
  {
    name: "--accent-dark",
    description: "Dark accent color. Must contrast against --bg.",
    defaultValue: "26 72 120",
    contrastAgainst: "--bg",
    minContrast: 3,
  },
  {
    name: "--highlight",
    description: "Highlight/emphasis color. Must differ from --accent and stand out on --bg.",
    defaultValue: "162 132 32",
    contrastAgainst: "--bg",
    minContrast: 3,
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
    description:
      "Japanese typeface used across the whole site. Pick the one whose personality matches the theme: gothic faces feel modern and neutral, rounded faces feel soft and friendly, mincho faces feel classic and literary, and the display faces are loud and decorative.",
    defaultValue: "fot-udkakugo-large-pr6n",
    kind: "enum",
    allowedValues: themeFonts.map((font) => font.family),
  },
  {
    name: "--transition-duration",
    description:
      "How long hover and state transitions take. Short values feel snappy and mechanical, long values feel calm and dreamy.",
    defaultValue: "0.2s",
    kind: "enum",
    allowedValues: ["0.1s", "0.15s", "0.2s", "0.3s", "0.45s", "0.6s"],
  },
  {
    name: "--transition-easing",
    description:
      "The easing curve of transitions. linear is mechanical, ease-out is neutral, cubic-bezier(0.22, 1, 0.36, 1) is smooth, cubic-bezier(0.34, 1.56, 0.64, 1) bounces slightly, cubic-bezier(0.68, -0.55, 0.27, 1.55) overshoots strongly and steps(4, end) is choppy and retro.",
    defaultValue: "cubic-bezier(0.22, 1, 0.36, 1)",
    kind: "enum",
    allowedValues: [
      "linear",
      "ease-out",
      "cubic-bezier(0.22, 1, 0.36, 1)",
      "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      "steps(4, end)",
    ],
  },
];

const motionVariables = new Set(["--transition-duration", "--transition-easing"]);

function applyThemeFont(family: string) {
  const font = themeFonts.find((themeFont) => themeFont.family === family);
  if (!font) {
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
}

export function applyTheme(variables: { name: string; value: string }[]) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (const { name, value } of variables) {
    if (prefersReducedMotion && motionVariables.has(name)) {
      continue;
    }
    if (name === "--font-family") {
      applyThemeFont(value);
      continue;
    }
    document.documentElement.style.setProperty(name, value);
  }
}

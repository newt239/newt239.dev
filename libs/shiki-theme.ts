export const shikiTheme = {
  name: "newt239-tokens",
  type: "light",
  colors: {
    "editor.foreground": "var(--code-text)",
    "editor.background": "var(--code-bg)",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--code-comment)", fontStyle: "italic" },
    },
    {
      scope: ["string", "constant.other.symbol", "meta.embedded.assembly"],
      settings: { foreground: "var(--code-string)" },
    },
    {
      scope: [
        "support.type.property-name",
        "variable.other.property",
        "entity.name.function",
        "entity.name.tag",
        "support.function",
      ],
      settings: { foreground: "var(--code-property)" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "constant.language",
        "constant.numeric",
        "support.type",
        "entity.name.type",
      ],
      settings: { foreground: "var(--code-keyword)" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "var(--code-punctuation)" },
    },
  ],
};

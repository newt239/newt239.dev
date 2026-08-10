export const shikiTheme = {
  name: "newt239-tokens",
  type: "light" as const,
  colors: {
    "editor.foreground": "var(--code-text)",
    "editor.background": "var(--code-bg)",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--code-subtle)", fontStyle: "italic" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "var(--code-subtle)" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "constant.language",
        "constant.numeric",
        "support.type",
        "entity.name.type",
        "support.type.property-name",
        "variable.other.property",
        "entity.name.function",
        "entity.name.tag",
        "support.function",
      ],
      settings: { foreground: "var(--code-accent)" },
    },
  ],
};

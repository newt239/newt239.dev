const anyValue = ["/^.+$/"];

/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-plugin-use-baseline"],
  ignoreFiles: ["**/node_modules/**", ".nuxt/**", ".output/**", "dist/**", "public/**"],
  overrides: [{ files: ["**/*.vue"], customSyntax: "postcss-html" }],
  rules: {
    "plugin/use-baseline": [
      true,
      {
        available: "widely",
        ignoreAtRules: ["property", "starting-style"],
        ignoreSelectors: ["/view-transition/", "selection"],
        ignoreProperties: {
          "/^view-transition-/": anyValue,
          "/^overscroll-behavior/": anyValue,
          "backdrop-filter": anyValue,
          "corner-shape": anyValue,
          "scrollbar-gutter": anyValue,
          "text-box": anyValue,
          "text-wrap": anyValue,
          "transition-behavior": anyValue,
          "user-select": anyValue,
          "interpolate-size": ["allow-keywords"],
          "word-break": ["auto-phrase"],
        },
      },
    ],
    "declaration-property-value-allowed-list": { "font-weight": ["400", "800"] },
    "declaration-property-value-disallowed-list": [
      { "/.+/": [/\d*\.(?!(?:25|5|50|75|0)(?![0-9]))\d+rem/] },
      { message: "rem は 0.25 刻みで指定してください" },
    ],
    "declaration-property-value-no-unknown": [true, { ignoreProperties: { "/^--/": [/^from /] } }],
    "property-no-unknown": [true, { ignoreProperties: ["corner-shape"] }],
    "property-no-vendor-prefix": [true, { ignoreProperties: ["/^-webkit-mask/"] }],
    "selector-class-pattern": /^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?$/,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["deep"] }],
  },
};

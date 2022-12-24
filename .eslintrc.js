module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: ["pages/*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
};
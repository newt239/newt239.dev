// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().override("nuxt/vue/rules", {
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/html-self-closing": "off",
  },
});

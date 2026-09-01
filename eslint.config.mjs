import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["src/js/localization/generated/**/*.js"]
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
        document: true,
        window: true,
        customElements: true,
        FormData: true,
        localStorage: true,
        sessionStorage: true,
        console: true,
        Promise: true,
        HTMLElement: true,
        FileReader: true,
        CustomEvent: true
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    }
  }
];

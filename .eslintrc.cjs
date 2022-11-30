/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    quotes: ["error", "double", { "allowTemplateLiterals": true }],
    "vue/script-setup-uses-vars": 1,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};

// eslint.config.js
"use strict";

// Import the ESLint plugin locally
const eslintPluginExample = require("../index.js");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    // Using the eslint-plugin-example plugin defined locally
    plugins: { hoo00nn: eslintPluginExample },
    rules: {
      "hoo00nn/need-braces": "error",
    },
  },
];

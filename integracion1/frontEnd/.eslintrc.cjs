module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["xo", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",

  },
  plugins: ["react"],
  rules: {
    "indent": ['error', 2],
    "react/react-in-jsx-scope": "off",
    "quotes": "off",
    "jsx-quotes": "off",
    "semi": "off",
    "quote-props": "off",
    "no-unused-vars": "off",
    // "multiple - empty - lines": "on",
    // "singleQuote": true,
    // "useTabs": false,
    // "trailingComma": "none",
    // "endOfLine": "auto"
  },
};

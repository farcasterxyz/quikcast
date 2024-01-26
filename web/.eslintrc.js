module.exports = {
  extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  plugins: ["simple-import-sort", "unused-imports"],
  rules: {
    "@next/next/no-img-element": "off",
    "jsx-a11y/alt-text": "off",
    "no-duplicate-imports": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "tailwindcss/no-custom-classname": "error",
    "unused-imports/no-unused-imports": "error",
  },
};

module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'no-duplicate-imports': 'error',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
};

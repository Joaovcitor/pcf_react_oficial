// eslint-disable-next-line no-undef
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ["prettier", "react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "import/prettier-default-export": 0,
    "no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect", // Detecta a versão do React
    },
  },
};

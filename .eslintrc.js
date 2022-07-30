module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb/base",
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["sonarjs", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
    "newline-per-chained-call": "off",
    "prefer-while": "off",
    "no-console": "off",
    "prefer-template": "off",
    "sonarjs/no-duplicate-string": "off",
  },
};

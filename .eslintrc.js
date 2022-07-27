module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["sonarjs", "import"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "newline-per-chained-call": "off",
    "prefer-while": "off",
  },
};

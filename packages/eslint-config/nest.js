import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import turboPlugin from "eslint-plugin-turbo";

/**
 * Shared ESLint rules for the NestJS API.
 * `typescript-eslint` is not imported here: the package that imports it
 * resolves TypeScript, and the workspace root has 7.0.2, which
 * `typescript-eslint` 8 does not support. The app imports it so the 5.7.3
 * declared in `apps/api` is used.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nestConfig = [
  {
    ignores: ["eslint.config.mjs", "dist/**"],
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
];

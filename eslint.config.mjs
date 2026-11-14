import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["node_modules/**", "playwright-report/**", "test-results/**"]),
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["tests/**/*.ts", "fixtures/**/*.ts", "mocks/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "(^|/)pages/sections(/|$)",
              message:
                "Tests must not use sections directly. Access them through a page object (e.g. dashboardPage.quickLaunch).",
            },
          ],
        },
      ],
    },
  },
);

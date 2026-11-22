import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const privateConstructorMessage =
  "This class must have a private constructor. Expose a static factory (.visit() & .getPage()) instead.";

const privateConstructorRules = [
  {
    selector:
      "ClassDeclaration > ClassBody > MethodDefinition[kind='constructor']:not([accessibility='private'])",
    message: privateConstructorMessage,
  },
  {
    selector:
      "ClassDeclaration:not(:has(MethodDefinition[kind='constructor']))",
    message: privateConstructorMessage,
  },
];

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
  {
    files: ["pages/**/*.page.ts"],
    ignores: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...privateConstructorRules],
    },
  },
);

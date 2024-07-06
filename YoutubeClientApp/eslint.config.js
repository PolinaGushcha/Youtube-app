// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '/.angular',
      '/.vscode',
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      'coverage/',
      '.idea/',
      '*.iml',
      '*.sublime-project',
      '*.sublime-workspace',
      '/.sublime',
      '*.swp',
      '*.swo',
      '*.tmp',
      '.DS_Store',
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'angular.json',
      'tsconfig.json',
      'tsconfig.*.json'
    ],
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);

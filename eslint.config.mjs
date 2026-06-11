import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'Scraped_Data/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'playwright/no-wait-for-timeout': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);

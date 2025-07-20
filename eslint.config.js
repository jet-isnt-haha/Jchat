import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config([
	globalIgnores(['dist', 'node_modules', 'build']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		}
	},

	/**
	 * javascript 规则
	 */
	{
		files: ['**/*.{js,mjs,cjs,vue}'],
		rules: {
			'no-console': 'warn'
		}
	},

	/**
	 * React 规则
	 */
	{
		files: ['**/*.{jsx,tsx,}'],
		rules: {}
	},

	/**
	 * typescript 规则
	 */
	{
		files: ['**/*.{ts,tsx,}'],
		rules: {}
	},

	eslintPluginPrettierRecommended
]);

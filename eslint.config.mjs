import esLint from "@eslint/js";
// https://typescript-eslint.io/getting-started#step-2-configuration
import tsLint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";
import typescriptParser from "@typescript-eslint/parser";

export default [
	esLint.configs.recommended,
	// https://typescript-eslint.io/getting-started/typed-linting/
	...tsLint.configs.strict,
	...tsLint.configs.recommendedTypeChecked,
	{
		"settings": {
			// https://github.com/import-js/eslint-plugin-import#typescript
			"typescript": true,
			"node": true,
			"import/parsers": {
				"@typescript-eslint/parser": [".mts"]
			},
			// https://github.com/kriasoft/react-starter-kit/issues/1180#issuecomment-436753540
			"import/resolver": {
				"typescript": {
					"alwaysTryTypes": true
				}
			}
		},
		ignores: [
			"**/node_modules",
			"/target/**",
			"./*.mts"
		],
		languageOptions: {
			parser: typescriptParser,
			ecmaVersion: "latest",
			sourceType: "module",
			// https://typescript-eslint.io/getting-started/typed-linting/
			parserOptions: {
				project: true,
				// "project": "tsconfig.json"
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			tsdoc
		},
		"rules": {
			// "indent" is broken for Typescript: https://github.com/typescript-eslint/typescript-eslint/issues/1824
			"indent": "off",
			"quotes": [
				"error",
				"double"
			],
			"semi": [
				"error",
				"always"
			],
			"tsdoc/syntax": "warn",
			// Prevents "while(true)"
			"no-constant-condition": "off"
		}
	}
];
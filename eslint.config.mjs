/*
 * Copyright (c) 2024 Gili Tzabari
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import eslint from "@eslint/js";
// https://typescript-eslint.io/getting-started#step-2-configuration
import tsEslint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";

export default tsEslint.config(
	eslint.configs.recommended,
	// https://typescript-eslint.io/getting-started/typed-linting/
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			// https://typescript-eslint.io/getting-started/typed-linting/
			parserOptions: {
				projectService: true,
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
				"double",
				{"allowTemplateLiterals": true}
			],
			"semi": [
				"error",
				"always"
			],
			"tsdoc/syntax": "warn",
			// Prevents "while(true)"
			"no-constant-condition": "off",
			"no-mixed-spaces-and-tabs": [
				"error",
				"smart-tabs"
			],
			"@typescript-eslint/consistent-indexed-object-style": [
				"error",
				"index-signature"
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNumber: true
				}
			]
		}
	}, {
		ignores: [
			// Do not lint this configuration file
			"eslint.config.mjs",
			"/target/**",
			"**/node_modules"
		]
	});
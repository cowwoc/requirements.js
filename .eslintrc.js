module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true
	},
	extends: [
		"eslint:recommended"
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module"
	},
	plugins: [
		"jsdoc"
	],
	settings: {
		jsdoc: {
			tagNamePreference: {
				returns: "return"
			}
		}
	},
	overrides: [
		{
			files: [
				"gulpfile.babel.js",
				"src/**/*.js",
				"test/**/*.js"
			],
			rules: {
				"brace-style": [
					"error",
					"allman"
				],
				"comma-dangle": "error",
				"comma-spacing": "error",
				"default-param-last": "error",
				"dot-notation": "error",
				"func-call-spacing": "error",
				//				"indent": [
				//					"error",
				//					"tab",
				//					{
				//						"SwitchCase": 1,
				//						"FunctionDeclaration": {
				//							"parameters": "off"
				//						}
				//					}
				//				],
				//				"init-declarations": [
				//					"error",
				//					"always"
				//				],
				"keyword-spacing": "error",
				"no-array-constructor": "error",
				"no-dupe-class-members": "error",
				"no-duplicate-imports": "error",
				"no-empty-function": "error",
				"no-invalid-this": "error",
				"no-loop-func": "error",
				"no-loss-of-precision": "error",
				"no-redeclare": "error",
				"no-shadow": "error",
				"no-unused-expressions": "error",
				"no-unused-vars": "error",
				"no-use-before-define": [
					"error",
					{
						functions: false
					}
				],
				"no-useless-constructor": "error",
				quotes: "error",
				"require-await": "error",
				"no-return-await": "error",
				semi: "error"
			}
		},
		{
			files: [
				"src/**/*.ts",
				"test/**/*.ts"
			],
			parser: "@typescript-eslint/parser",
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			],
			parserOptions: {
				project: "./tsconfig.json"
			},
			plugins: [
				"@typescript-eslint"
			],
			rules: {
				"brace-style": "off",
				"@typescript-eslint/brace-style": [
					"error",
					"allman"
				],
				"comma-dangle": "off",
				"@typescript-eslint/comma-dangle": "error",
				"comma-spacing": "off",
				"@typescript-eslint/comma-spacing": "error",
				"default-param-last": "off",
				"@typescript-eslint/default-param-last": "error",
				"dot-notation": "error",
				"@typescript-eslint/dot-notation": "error",
				"func-call-spacing": "off",
				"@typescript-eslint/func-call-spacing": "error",
				//				"indent": "off",
				//				"@typescript-eslint/indent": [
				//					"error",
				//					"tab",
				//					{
				//						"SwitchCase": 1,
				//						"FunctionDeclaration": {
				//							"parameters": "off"
				//						},
				//					}
				//				],
				//				"init-declarations": "off",
				//				"@typescript-eslint/init-declarations": [
				//					"error",
				//					"always"
				//				],
				"keyword-spacing": "off",
				"@typescript-eslint/keyword-spacing": "error",
				"@typescript-eslint/lines-between-class-members": "off",
				"no-array-constructor": "off",
				"@typescript-eslint/no-array-constructor": "error",
				"@no-dupe-class-members": "off",
				"@typescript-eslint/no-dupe-class-members": "error",
				"no-duplicate-imports": "off",
				"@typescript-eslint/no-duplicate-imports": "error",
				"no-empty-function": "error",
				"@typescript-eslint/no-empty-function": "error",
				//				"no-extra-parens": "off",
				//				"@typescript-eslint/no-extra-parens": "error",
				"no-extra-semi": "off",
				"@typescript-eslint/no-extra-semi": "error",
				"no-invalidthis": "off",
				"@typescript-eslint/no-invalid-this": "error",
				"no-loop-func": "off",
				"@typescript-eslint/no-loop-func": "error",
				"no-loss-of-precision": "off",
				"@typescript-eslint/no-loss-of-precision": "error",
				"no-redeclare": "off",
				"@typescript-eslint/no-redeclare": "error",
				"no-shadow": "off",
				"@typescript-eslint/no-shadow": "error",
				"no-unused-expressions": "off",
				"@typescript-eslint/no-unused-expressions": "error",
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "error",
				"no-use-before-define": "off",
				"@typescript-eslint/no-use-before-define": [
					"error",
					{
						functions: false
					}
				],
				"no-useless-constructor": "off",
				// BUG: https://github.com/typescript-eslint/typescript-eslint/issues/2690
				//				"@typescript-eslint/no-useless-constructor": "error",
				//				"quotes": "off",
				"@typescript-eslint/quotes": "error",
				"require-await": "off",
				"@typescript-eslint/require-await": "error",
				"no-return-await": "off",
				"@typescript-eslint/return-await": "error",
				semi: "off",
				"@typescript-eslint/semi": "error",
				"@typescript-eslint/restrict-plus-operands": "off"
			}
		}
	],
	rules: {
		"no-console": "off",
		//    [
		//      "error",
		//      {
		//        "allow": [
		//          "assert"
		//        ]
		//      }
		//    ]
		"no-constant-condition": [
			"error",
			{
				checkLoops: false
			}
		],
		"block-scoped-var": "error",
		"consistent-return": [
			"error",
			{
				treatUndefinedAsUnspecified: true
			}
		],
		"dot-location": "error",
		eqeqeq: "error",
		"no-caller": "error",
		"no-div-regex": "error",
		"no-else-return": "error",
		"no-eq-null": "error",
		"no-eval": "error",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-label": "error",
		"no-floating-decimal": "error",
		"no-global-assign": "error",
		"no-implicit-coercion": "error",
		"no-implicit-globals": "error",
		"no-implied-eval": "error",
		"no-iterator": "error",
		"no-lone-blocks": "error",
		"no-magic-numbers": "off",
		"no-multi-spaces": "error",
		"no-multi-str": "error",
		"no-new-func": "error",
		"no-new-wrappers": "error",
		"no-new": "warn",
		"no-octal-escape": "error",
		"no-param-reassign": "off",
		"no-proto": "error",
		//"no-restricted-properties": "error",
		"no-return-assign": "error",
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"no-throw-literal": "error",
		"no-unmodified-loop-condition": "error",
		"no-useless-call": "error",
		"no-useless-concat": "error",
		//"no-useless-return": "error",
		"no-void": "error",
		"no-with": "error",
		radix: "error",
		"vars-on-top": "error",
		"wrap-iife": "error",
		yoda: "error",
		strict: "error",
		"no-catch-shadow": "error",
		"no-label-var": "error",
		"no-restricted-globals": "error",
		"no-shadow-restricted-names": "error",
		"no-undef-init": "error",
		"no-undefined": "error",
		"callback-return": "error",
		"global-require": "error",
		"handle-callback-err": "error",
		"no-mixed-requires": "error",
		"no-new-require": "error",
		"no-path-concat": "error",
		"no-process-env": "error",
		"no-process-exit": "error",
		"no-restricted-modules": "error",
		"no-sync": "error",
		"array-bracket-spacing": "error",
		"block-spacing": "error",
		camelcase: "error",
		//"capitalized-comments": "error",
		"comma-style": "error",
		"computed-property-spacing": "error",
		"consistent-this": "error",
		//"eol-last": [
		//	"error",
		//	"never"
		//],
		//"func-name-matching": "error",
		//"func-names": [
		//	"error",
		//	"as-needed"
		//],
		"func-style": [
			"error",
			"declaration",
			{
				allowArrowFunctions: true
			}
		],
		"id-blacklist": "error",
		"id-length": "off",
		"id-match": "error",
		"jsx-quotes": "error",
		"key-spacing": "error",
		//"line-comment-position": "error",
		"linebreak-style": "off",
		//"lines-around-comment": "error",
		//"lines-around-directive": "error",
		"max-depth": "error",
		"max-len": [
			"error",
			{
				code: 110,
				tabWidth: 2,
				ignoreUrls: true,
				ignorePattern: "@link"
			}
		],
		"max-lines": "off",
		"max-nested-callbacks": "error",
		"max-params": [
			"warn",
			{
				max: 7
			}
		],
		"max-statements-per-line": "error",
		"max-statements": [
			"error",
			{
				max: 25
			}
		],
		"multiline-ternary": "error",
		"new-cap": "error",
		"new-parens": "error",
		"newline-after-var": "off",
		"newline-before-return": "off",
		"newline-per-chained-call": "off",
		"no-bitwise": "error",
		"no-continue": "off",
		"no-inline-comments": "error",
		"no-lonely-if": "error",
		"no-mixed-operators": "error",
		"no-mixed-spaces-and-tabs": "error",
		"no-multiple-empty-lines": "error",
		"no-negated-condition": "error",
		"no-nested-ternary": "error",
		"no-new-object": "error",
		"no-plusplus": "off",
		"no-restricted-syntax": "error",
		"no-tabs": "off",
		"no-ternary": "error",
		"no-trailing-spaces": [
			"error",
			{
				skipBlankLines: true
			}
		],
		"no-underscore-dangle": "error",
		"no-unneeded-ternary": "error",
		"no-whitespace-before-property": "error",
		"object-curly-newline": "off",
		"object-curly-spacing": "error",
		"object-property-newline": "error",
		"one-var-declaration-per-line": "error",
		"one-var": [
			"error",
			"never"
		],
		"operator-assignment": "error",
		"operator-linebreak": "error",
		"padded-blocks": [
			"error",
			{
				blocks: "never",
				classes: "never",
				switches: "never"
			}
		],
		"quote-props": [
			"error",
			"as-needed"
		],
		//    "require-jsdoc": "error",
		"semi-spacing": "error",
		"sort-keys": "off",
		"sort-vars": "error",
		"space-before-blocks": "error",
		"space-before-function-paren": "off",
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"spaced-comment": "off",
		"unicode-bom": "error",
		"wrap-regex": "error",
		"arrow-body-style": "error",
		"arrow-parens": [
			"error",
			"as-needed"
		],
		"arrow-spacing": "error",
		"generator-star-spacing": "error",
		"no-confusing-arrow": "error",
		"no-restricted-imports": "error",
		"no-useless-computed-key": "error",
		"no-useless-rename": "error",
		"no-var": "error",
		"object-shorthand": "error",
		"prefer-arrow-callback": "off",
		"prefer-const": "error",
		//"prefer-destructuring": "error",
		//"prefer-numeric-literals": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "off",
		"rest-spread-spacing": "error",
		"sort-imports": "off",
		"symbol-description": "error",
		"template-curly-spacing": "error",
		"yield-star-spacing": "error",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-param-names": "error",
		"jsdoc/check-syntax": "error",
		"jsdoc/check-tag-names": "error",
		"jsdoc/check-types": "error",
		"jsdoc/implements-on-classes": "error",
		"jsdoc/newline-after-description": "error",
		"jsdoc/no-undefined-types": "error",
		"jsdoc/require-jsdoc": "error",
		"jsdoc/require-param-description": "error",
		"jsdoc/require-param-name": "error",
		"jsdoc/require-param-type": "error",
		"jsdoc/require-param": "error",
		"jsdoc/require-returns-check": "error",
		"jsdoc/require-returns-description": "error",
		"jsdoc/require-returns-type": "error",
		"jsdoc/require-returns": "error",
		"jsdoc/valid-types": "error"
	}
};
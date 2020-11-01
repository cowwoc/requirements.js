const presets =
	[
		"@babel/preset-env",
		"@babel/preset-typescript"
	];

const plugins =
	[
		[
			"@babel/plugin-transform-runtime",
			{
				"regenerator": true
			},
			"lodash"
		],
		"@babel/plugin-transform-typescript",
		"@babel/proposal-class-properties",
		"@babel/proposal-object-rest-spread"
	];

const ignore =
	[
		"node_modules/**"
	];

module.exports =
	{
		presets,
		plugins,
		ignore
	};
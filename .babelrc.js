const presets =
	[
		"@babel/preset-typescript",
		[
			"@babel/preset-env",
			{
				useBuiltIns: "usage",
				corejs:
					{
						version: 3,
						proposals: true
					}
				// debug: true
			}
		]
	];

const plugins =
	[
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
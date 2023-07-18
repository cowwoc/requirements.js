const config =
	{
		presets:
			[
				"@babel/preset-typescript",
				[
					"@babel/preset-env",
					{
						useBuiltIns: "usage",
						corejs:
							{
								version: "3.31.0",
								proposals: true
							}
						// debug: true
					}
				]
			],
		ignore:
			[
				"**/node_modules/**"
			],
		compact: false
	};

export {config as default};
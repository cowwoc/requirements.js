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
								version: "3.27.1",
								proposals: true
							}
						// debug: true
					}
				]
			],
		ignore:
			[
				"**/node_modules/**",
				"**/.yarn/**"
			],
		compact: false
	};

export {config as default};
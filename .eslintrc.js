module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'standard-with-typescript',
		'plugin:react/jsx-runtime',
		'plugin:react/recommended',
		'eslint-config-prettier',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-tabs': ['error', { allowIndentationTabs: true }],
	},
	plugins: ['react'],
};

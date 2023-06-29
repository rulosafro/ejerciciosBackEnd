module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'xo',
		'plugin:react/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'quotes': 'off',
		'jsx-quotes': 'off',
		'semi': 'off',
		'quote-props': 'off',
	},
};

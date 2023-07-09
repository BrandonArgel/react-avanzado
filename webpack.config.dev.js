const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const entry = path.join(SRC_DIR, 'index.tsx');
const html = path.join(SRC_DIR, 'index.dev.html');

module.exports = {
	entry,
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts$|tsx/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
						},
					},
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' }, // to inject the result into the DOM as a style block
					{ loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: 'sass-loader' }, // to convert SASS to CSS
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
		modules: [SRC_DIR, 'node_modules'],
		alias: {
			'@components': SRC_DIR + '/components',
			'@pages': SRC_DIR + '/pages',
			'@utils': SRC_DIR + '/utils',
			'@styles': SRC_DIR + '/styles',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: html,
			publicPath: '/',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		open: true,
		port: 3000,
		compress: true,
		historyApiFallback: true,
	},
};

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
	mode: 'production',
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
				test: /\.module\.s(a|c)ss$/,
				loader: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				loader: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
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
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
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

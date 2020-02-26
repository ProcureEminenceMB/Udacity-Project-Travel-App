const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const WorkboxPlugin = require( 'workbox-webpack-plugin' );

module.exports = {

	entry: './src/client/index.js',
	mode: 'development',
	stats: 'verbose',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
					/jest/
				]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html'
		}),
		new CleanWebpackPlugin({
			dry: false, // Simulate removal of files. Default is false.
			verbose: false, // Write logs to console. Default is false.
			cleanStaleWebpackAssets: true, // Remove unused webpack assets on rebuild. Default is true.
			protectWebpackAssets: false // Prevent removal of current webpack assets. Default is true.
		}),
		new WorkboxPlugin.GenerateSW()
	],
	output: {
		libraryTarget: 'var',
		library: 'TravelApp'
	}

};
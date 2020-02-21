const path = require( 'path' );
const webpack = require( 'webpack' );

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
			}
		]
	},
	plugins: [],
	output: {
		libraryTarget: 'var',
		library: 'TravelApp'
	}

};
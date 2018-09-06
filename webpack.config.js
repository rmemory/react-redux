/* eslint-disable global-require */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

// The default port value can be overridden at the command line
const port = process.env.PORT || 3000;

const config = {
	entry: {
		/* babel-polyfill is used for promises and whatnot. Stated differently,
		   babel-loader handles all of the transpiled features, while the babel
		   polyfill is used to extend the browser to feature that cannot be
		   transpiled. Meaning, index.js below is the primary application entry
		   point */
		app: ['babel-polyfill', './src/index.js'],

		// Split out a vendor specific packages into a vendor module
		vendor: ['axios', 'react', 'react-dom', 'react-router-dom'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		/* Add a hash to each emitted blob, allowing it to be dynamically
		   updated */
		filename: 'static/[name].[hash].js',
		publicPath: '/',
	},

	devtool: devMode ? 'source-map' /* A full source map is emitted as a
									   separate file in development. */
		: 'hidden-source-map', /* In production, capture the output and send
								  it to a third party service for you to
								  examine. This way you can capture errors
								  and fix them. */

	module: {
		rules: [
			/* babel-loader handles all of the new fangled ES6+ translations
			   as we all the JSX translations. See the babel configuration block
			   in package.json */
			{
				test: /\.(js[x]?)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			// Basic CSS loader --- Intentionally commented out
			// {
			// 	test: /\.css$/,
			// 	exclude: /node_modules/,
			// 	use: ['style-loader', 'css-loader'],
			// },

			/* Loader for styling */
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')({
								browsers: ['> 1%', 'last 2 versions'],
							})],
						},
					},
				],
			},
			/* Loader for images */
			{
				test: /\.(jpg|png|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: './src/images',
						outputPath: 'images/',
					},
				},
			},
			/* Loader for fonts */
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						context: './src/fonts',
						outputPath: 'fonts/',
					},
				}],
			},
		],
	},

	// Used only by webpack-dev-server
	devServer: {
		historyApiFallback: true, /* Without this, a browser refresh will cause
									 an http request to the server */
		port, // port: port,
	},

	/* This optimization section is "magic" to my brain at least. It apparently
	   makes sure the vendor bundle size is as small as possible. See:
	   https://github.com/webpack/webpack/issues/6357 */
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: 'vendor',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			favicon: 'public/favicon.ico',
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? 'styles/[name].css' : 'styles/[name].[hash].css',
			chunkFilename: devMode ? 'styles/[id].css' : 'styles/[id].[hash].css',
		}),
	],

	// Webpack 4 handles all of the minification during production
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};

module.exports = config;

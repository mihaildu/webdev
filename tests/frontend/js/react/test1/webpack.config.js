var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/refs-react.js",
    module: {
	rules: [
	    {
		// this is what to convert? all js files?
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: ["env", "react"]
		    }
		}
	    },
	    {
		test: /\.css$/,
		use: {
		    loader: "css-loader",
		    options: {}
		}
	    }
	]
    },
    output: {
	path: __dirname + "/dist",
	filename: debug ? "bundle.js" : "bundle.min.js"
    },
    plugins: debug ? [] : [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};

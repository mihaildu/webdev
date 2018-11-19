var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : false,
    entry: {
	index: "./src/refs-redux.js"
    },
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: ["env", "react"]
		    }
		}
	    }
	]
    },
    output: {
	path: __dirname + "/dist",
	filename: debug ? "index.js" : "index.min.js"
    },
    plugins: debug ? [] : [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};

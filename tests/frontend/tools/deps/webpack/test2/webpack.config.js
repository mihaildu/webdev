// with this file you just need to run "webpack"
// input & output is specified in here

// to run in production mode set NODE_ENV=production
// this will use DedupePlugin, OccurenceOderPlugin and Uglify
// I guess uglify also minimizes the output file
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    // TODO explanation
    context: __dirname,
    // TODO explanation
    devtool: debug ? "inline-sourcemap" : null,
    // this is the input js file (which imports other files)
    entry: "./js/test1.js",
    // this is the output one
    output: {
	//path: __dirname + "/js",
	path: __dirname,
	filename: debug ? "bundle.js" : "bundle.min.js"
    },
    // add aditional modules
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: ["env"]
		    }
		}
	    }
	]
    },
    // optional plugins
    // don't use any for debug mode
    // use some in production
    plugins: debug ? [] : [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};

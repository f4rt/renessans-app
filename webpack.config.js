const path = require('path');
const glob = require('glob');

module.exports = {
	mode: 'production',
  entry: path.resolve(__dirname, 'src/js/entry.js'),
  output: {
		filename: 'build.js',
    path: path.resolve(__dirname, 'wwwroot/js')
	},
	module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
			},
    ]
  },
  watch: true,
};
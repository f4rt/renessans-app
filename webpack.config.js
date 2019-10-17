const path = require('path');
const glob = require('glob');

// const entryArray = glob.sync('src/blocks/ims/**/*.js');
// const entryObject = entryArray.reduce((acc, item) => {
//   acc[path.basename(item, ".js")] = './' + item;
//   return acc;
// }, {});

module.exports = {
	mode: 'development',
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
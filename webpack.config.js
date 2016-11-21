const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');
const TARGET = process.env.npm_lifecycle_event;
require('php-loader');
var config;

// Constant paths which point to folders in directory
/*
  __dirname: directory we are in
*/
const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build'),
  images: path.join(__dirname, 'img')
};

/*
  Main webpack build configuration
  Anything else is added
*/
const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GN Summit Tours',
      hash: true,
      template: 'template/default_index.ejs',
      appMountId: 'app'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.php$/,
        loaders: [
          'php-loader?' + JSON.stringify({
            proxy: 'php/index/php',
            args: ['--arg1=no'],
            debug: true
          })
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

// Set babel env var to the npm_lifecycle_event(build, start, test, etc..)
process.env.BABEL_ENV = TARGET;

// Determines if the bundle will be built or served for development purposes
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env,NODE_ENV','production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);


/*
  Unused - If to be used, embed in common.module
  preLoaders: [
    {
      test: /\.jsx?$/,
      loaders: ['jshint'],
      // define an include so we check just the files we need
      include: PATHS.app
    }
  ],

  Unused - If to be used, embed in common.module.loaders array
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ],
    include: PATHS.images
  },

*/







































/* END */

const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', (comp) => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(
            comp.modifiedFiles, (file) => `\n  ${file}`).join('');
        console.log('===============================');
        console.log('FILES CHANGED:', changedFiles);
        console.log('===============================');
      }
    });
  }
}
const plugins = [];
plugins.push(new WatchRunPlugin());
plugins.push(new WebpackShellPluginNext({
  onBuildStart: {
    scripts: ['mkdir -p dist/ && npm run copy:html'],
    // scripts: ['echo "===> Starting packing with WEBPACK 5"'],
    blocking: true,
    parallel: false,
  },
  // onDoneWatch: {
  onBuildEnd: {
    // scripts: ['ls'],
    scripts: ['npm run optimize:inline'],
    // scripts: ['npm run copy:html && npm run optimize:inline'],
    // scripts: ['npm run optimize:inline'],
    blocking: true,
    parallel: false,
  },
}));
plugins.push(
    new ExtraWatchWebpackPlugin({
      files: [
        'src/app/dashboard/style.css',
        'src/app/dashboard/style.scss',
        'src/app/dashboard/index.html',
        // 'src/**/*.css',
        // 'src/**/*.json',
        // 'src/**/*.svg',
        // 'src/**/*.html',
      ],
      // dirs: [ 'path/to/dir' ],
    }));

module.exports = {
  mode: 'development',
  // stats: 'verbose',
  devtool: 'inline-source-map',
  entry: {
    main: './src/app/dashboard/src/index.ts',
  },
  output: {
    // path: path.resolve(__dirname, './src/app/dashboard'),
    // path: path.resolve(__dirname, './dist'),
    // path: path.resolve(__dirname, './dist'),
    // publicPath: '/static/',
    // publicPath: '/assets/',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: plugins,
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      // {
      //   test: /\.(scss|css)$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        // to slow?
        // use: [
        //   {
        //     loader: 'ts-loader',
        //     options: {
        //       configFile: 'tsconfig.webpack.json',
        //     },
        //   },
        // ],
        // use: ['ts-loader'],
        // loader: 'ts-loader?configFileName=tsconfig.webpack.json',
      },
    ],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: [
      {directory: path.join(__dirname, 'src/app/dashboard/static/')},
      {directory: path.join(__dirname, 'src/app/dashboard/assets/')},
    ],
    compress: true,
    port: 4200,
  },
};

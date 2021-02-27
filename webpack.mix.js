const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const mix = require('laravel-mix')

require('laravel-mix-tailwind')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
const isDevelopment = process.env.NODE_ENV !== 'production'

mix
  .setPublicPath('public')
  .ts('resources/client/index.tsx', 'public/js/')
  .react()
  .sass('resources/assets/scss/index.scss', 'public/css')
  .tailwind()
  .options({
    processCssUrls: false,
  })

if (isDevelopment) {
  mix.sourceMaps()
}

mix.webpackConfig({
  mode: isDevelopment ? 'development' : 'production',
  context: __dirname,
  target: 'node',
  output: {
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ].filter(Boolean),
})

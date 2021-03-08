const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const mix = require('laravel-mix')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const outputPath = path.resolve(__dirname, 'public')

require('laravel-mix-tailwind')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
const isDevelopment = process.env.NODE_ENV !== 'production'

mix
  .setPublicPath('public')
  .js('resources/client/index.tsx', 'public/js/')
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${outputPath}/*.hot-update.*`],
      dry: false,
    }),
    new Dotenv(),
  ].filter(Boolean),
})

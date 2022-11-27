const path = require('path')

const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry:['./resources/js/main.js','./resources/css/main.css'],
  output:{
    path: path.resolve(__dirname,'public','assets'),
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    clean:true
  },
  optimization: {
    minimize: isProduction,
    minimizer: [],
  },
  module:{
    rules:[
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'resources', 'js'),
        exclude: /(node_modules|bower_components)/,
        use:['babel-loader','source-map-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader:"postcss-loader",
            options:{
              sourceMap: true
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[contenthash].css" : "[name].css",
    }),
    new WebpackManifestPlugin({
      publicPath:'/assets'
    })
  ],
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.optimization.minimizer.push(new TerserPlugin())
    config.optimization.minimizer.push(new CssMinimizerPlugin())
  } else {
    config.mode = 'development';
  }
  return config;
}
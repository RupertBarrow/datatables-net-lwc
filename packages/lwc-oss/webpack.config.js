import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import LwcWebpackPlugin from "lwc-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
//const BundleAnalyzerPlugin from "webpack-bundle-analyzer").BundleAnalyzerPlugin

import fs from "fs"
import path from "path"
const __dirname = path.dirname(new URL(import.meta.url).pathname)

export default {
  entry: {
    app: "./src/modules/main/app/app.js",
    index: "./src/index.js",
  },

  output: {
    //filename: "[name].bundle.[contenthash].js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    library: {
      type: "module",
    },
  },

  mode: "development",
  devtool: "inline-source-map",
  experiments: {
    outputModule: true,
  },

  /*
  externals: {
    lwc: "import lwc",
  },
  */

  module: {
    rules: [
      {
        test: /\.svg/,
        type: "asset/resource",
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    // prettier-ignore
    new LwcWebpackPlugin(), // see package.json
    // TODO: ???
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),

    // All chunks in the same bundle
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    /*
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index-new.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/extension/contentScript.html",
      filename: "contentScript.html",
      chunks: ["contentScript"],
    }),
    */

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("src/index.html"),
          to: "index.html",
        },
        {
          from: path.resolve("node_modules/@salesforce-ux/design-system/assets/icons"),
          to: "slds/icons",
        },
        {
          from: path.resolve("node_modules/@salesforce-ux/design-system/assets/images"),
          to: "slds/images",
        },
        {
          from: path.resolve("node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css"),
          to: "slds/styles/salesforce-lightning-design-system.min.css",
        },
        {
          from: path.resolve("src/resources"),
          to: "resources",
        },
        {
          from: path.resolve("src/modules/ui/datatablesNet/external"),
          to: "external",
        },
      ],
    }),

    // see : https://blog.jakoblind.no/webpack-bundle-analyzer/
    //new BundleAnalyzerPlugin(),
  ],

  resolve: {
    fallback: {
      os: false,
      http: false,
      https: false,
      fs: false,
      timers: false,
      process: false,
      child_process: false,
      stream: false,
    },
  },

  devServer: {
    //contentBase: path.join(__dirname, "./dist"),
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    port: 3001,
  },
}

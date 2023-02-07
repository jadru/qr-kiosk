const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const ESLintPugin = require("eslint-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "swc-loader",
        exclude: /.yarn/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ESLintPugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};

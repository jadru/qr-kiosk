const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: 'false',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
});

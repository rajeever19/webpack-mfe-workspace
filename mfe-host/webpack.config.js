const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3000,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
        list: "list@http://localhost:3002/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

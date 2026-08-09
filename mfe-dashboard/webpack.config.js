const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  output: {
    publicPath: "auto",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults", modules: false }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.2.5" },
        "react-dom": { singleton: true, requiredVersion: "^19.2.5" },
        "@mui/material": { singleton: true },
        "@emotion/react": { singleton: true },
        "@emotion/styled": { singleton: true },
        "@shared/core": { singleton: true },
        // ✅ No more runtime dependency on host remote for the store
        "@shared/store": { singleton: true },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
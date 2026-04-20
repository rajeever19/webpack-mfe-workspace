const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",

  devServer: {
    port: 3000,
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
        type: "javascript/auto", // ✅ IMPORTANT
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
      name: "host",

      remotes: {
        dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
        list: "list@http://localhost:3002/remoteEntry.js",
      },

      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@mui/material": { singleton: true },
        "@emotion/react": { singleton: true },
        "@emotion/styled": { singleton: true },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
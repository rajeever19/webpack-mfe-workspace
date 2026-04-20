const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  mode: "development",

  devServer: {
    port: 3005, // use different port to avoid conflict
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
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          sourceType: "unambiguous"
        },
      },
    },
  ],

  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const entry = path.join(SRC_DIR, "index.tsx");
const html = path.join(SRC_DIR, "index.dev.html");

module.exports = {
  entry,
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [SRC_DIR, "node_modules"],
    alias: {
      "@components": SRC_DIR + "/components",
      "@pages": SRC_DIR + "/pages",
      "@utils": SRC_DIR + "/utils",
      "@styles": SRC_DIR + "/styles",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: html,
      publicPath: "/",
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
};

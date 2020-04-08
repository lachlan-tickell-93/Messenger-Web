const path = require("path")
//let HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/javascript/Index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html"],
  },
  //watch: true,
  mode: "production",
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "index.html",
  //   }),
  // ],
}

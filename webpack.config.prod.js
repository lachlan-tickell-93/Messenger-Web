const path = require("path")
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {

  const currentPath = path.join(__dirname);
  const envPath = currentPath + '/.env';
  const env = dotenv.config({ path: envPath }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
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
    watch: false,
    mode: "production",
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
  };
}

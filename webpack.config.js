// import { resolve as _resolve, join } from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// export const entry = './src/index.js';
// export const output = {
//   path: _resolve(__dirname, 'dist'),
//   publicPath: '/dist/',
//   filename: 'bundle.js',
// };
// export const devtool = 'eval-source-map';
// export const module = {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'],
//         },
//       },
//     },
//     {
//       test: /\.css$/,
//       use: ['style-loader', 'css-loader'],
//     },
//   ],
// };
// export const resolve = {
//   extensions: ['.js', '.jsx'],
// };
// export const devServer = {
//   static: {
//     directory: join(__dirname, './'),
//   },
//   compress: true,
//   hot: true,
//   port: 8080,
// };
// export const plugins = [
//   new HtmlWebpackPlugin({
//     template: './src/index.html',
//   }),
// ];
// export const devServer = {
//   static: './dist', // Serve files from 'dist' directory
//   port: 3000, // Specify the port
//   hot: true, // Enable Hot Module Replacement
// };

import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Convert ES module paths to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Clean dist folder before each build
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./frontend/src"), // Serve from 'public' folder
    },
    compress: true,
    hot: true,
    port: 3000, // Change to your preferred port
    historyApiFallback: true, // Needed for React Router
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/src/index.html", // Move index.html to 'public/'
    }),
  ],
};

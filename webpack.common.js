const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  templateParameters: {
    footer: '<p class="text-center">© 2024, Carita. By Muhammad Fauzul Hanif</p>',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
    login: path.resolve(__dirname, 'src/js/pages/auth/login.js'),
    register: path.resolve(__dirname, 'src/js/pages/auth/register.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/dashboard.html'),
      chunks: ['app'],
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Create Story',
      filename: 'stories/create.html',
      template: path.resolve(__dirname, 'src/views/stories/create.html'),
      chunks: ['app'],
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Profile',
      filename: 'profile.html',
      template: path.resolve(__dirname, 'src/views/profile.html'),
      chunks: ['app'],
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'auth/login.html',
      template: path.resolve(__dirname, 'src/views/auth/login.html'),
      chunks: ['login', 'app'],
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'auth/register.html',
      template: path.resolve(__dirname, 'src/views/auth/register.html'),
      chunks: ['register', 'app'],
      ...htmlWebpackPluginConfig,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};

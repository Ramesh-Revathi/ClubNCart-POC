const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true, // Enable HMR
    port: 21175,
    open: true,
    watchFiles: ['src/**/*'], // Watch source files
    static: './dist', // Serve static files
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/, // Process .tsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', { runtime: 'automatic' }], // Enable React automatic runtime
              ['@babel/preset-typescript'],
            ],
            plugins: ['react-refresh/babel'], // Enable React Fast Refresh
          },
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve extensions
  },
};

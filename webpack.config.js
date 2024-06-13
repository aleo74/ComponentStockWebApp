const webpack = require('webpack');

module.exports = {
  // Votre configuration existante...
  resolve: {
    fallback: {
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // S'assurer d'inclure également un polyfill pour `process` si nécessaire
    }),
  ],
};

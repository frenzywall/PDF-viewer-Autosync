const WorkerPlugin = require('worker-plugin');

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
      stream: false,
      buffer: false,
      http: false,
      https: false
    }
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  plugins: [new WorkerPlugin()]
};

module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /pdfjs-dist\/webpack\.js/,
          use: {
            loader: 'worker-loader',
            options: {
              publicPath: '/static/js/',
            },
          },
        });
        return webpackConfig;
      },
    },
  };
  
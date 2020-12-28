// const {
//   injectBabelPlugin,
//   compose,
//   getLoader,
//   loaderNameMatches,
// } = require('react-app-rewired');
// // const rewireLess = require('react-app-rewire-less');
// const rewireReactHotLoader = require('react-app-rewire-hot-loader')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  // // change importing css to less
  // // config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);
  // const paths = require('react-app-rewired/scripts/utils/paths');
  config = rewireReactHotLoader(config, env);
  //
  // if (env === "production") {
  //   // Remove default polyfills
  //   config.entry = { main: paths.appIndexJs };
  //
  //   // Include bundle analyzation
  //   config.plugins.push(
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: "static",
  //       openAnalyzer: false,
  //     }),
  //   );
  // }

  return config;
};

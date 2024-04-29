const path = require("path");
const verMajor ='0.0.1';
process.env.VUE_APP_VERSION = `${verMajor}`;
const plugins=[];
if(process.env.NODE_ENV === 'production'){
  //const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  //plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  devServer: {
   // proxy: "http://localhost/vitepos/"
    proxy: "http://127.0.0.1:8000/"
  },
  outputDir: path.resolve(__dirname, "../assets/"),
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:'',
  filenameHashing: false,
  css: {
    extract: (process.env.NODE_ENV === 'development' ? false : {
      filename: 'css/admin-style.css',
    }),
    sourceMap: process.env.NODE_ENV === 'development'
  },

  configureWebpack: {
    output: {
      filename: 'js/admin-script.js',
      //chunkFilename: 'js/[name].js'
    },
    optimization: {
      splitChunks: false
    },
    resolve: {
      alias: {
        '@lib': path.resolve(__dirname, './../appsbd-libs/'),
        '@': path.resolve(__dirname, 'src/'),
        //'@root': path.resolve(__dirname, './../'),
      }
    }
  },

}
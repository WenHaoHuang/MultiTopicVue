const utils = require('./utils')

module.exports = {
    dev:{
        NODE_ENV: '"development"',
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        host: 'localhost',
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },
    build:{
        NODE_ENV: '"production"',
        assetsRoot: utils.resolve('./dist'),
        assetsSubDirectory: utils.resolve('static'),
        assetsPublicPath: '/',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false
    }
}


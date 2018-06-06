const path = require('path')
const server_port = 6009

module.exports = {
    dev:{
        NODE_ENV: '"development"',
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            "/api": {
                changeOrigin: true,
                target: "http://localhost:" + server_port + "/",
                secure: false
            },
            "/libs": {
                changeOrigin: true,
                target: "http://localhost:" + server_port + "/",
                secure: false
            },
        },
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
        assetsRoot: path.resolve(__dirname, '../dist/'),
        assetsSubDirectory: './',
        assetsPublicPath: './',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false
    }
}


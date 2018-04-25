'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const chalk = require('chalk')
const ip = require('ip')
const config = require('./webpack.config')
const ENV = process.env

const HOST = ip.address()
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    devtool: config.dev.devtool,
    entry: {
        app: './src/pages/' + ENV.npm_package_DIR + '/main.js'
    },
    output: {
        path: utils.resolve('./dist/' + ENV.npm_package_DIR),
        filename: 'static/js/[name].js?v=[hash:4]',
        publicPath: ENV.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        contentBase: false,
        compress: true,
        host: HOST,
        port: PORT || 8080,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true,
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.NODE_ENV
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            static:'/static',
            template: `./src/pages/${ENV.npm_package_DIR}/template.ejs`,
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || 8080
    console.log('> Starting dev server...');
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            devWebpackConfig.devServer.port = port
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        chalk.gray('------------------------------------'),
                        '   Running: ' + chalk.magenta(`http://${HOST}:${port}`),
                        chalk.gray('------------------------------------')
                    ]
                },
                onErrors: utils.createNotifierCallback()
            }))

            resolve(devWebpackConfig)
        }
    })
})

const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const config = require('./webpack.config')
const webpack = require('webpack')

const $kv = require('../../config/kv.json')
const $domain = $kv.domain

module.exports = {
    context: utils.resolve('./'),
    output: {
        path: config.build.assetsRoot,
        filename: '[name]/app.js?v=[hash:4]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'components': utils.resolve('components'),
            'common': utils.resolve('src/common'),
            'layout': utils.resolve('src/layout'),
            '@': utils.resolve(`src`)
        }
    },
    plugins:[
        new webpack.DefinePlugin({
            '$domain': JSON.stringify($domain)
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('static/img/[hash:8].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('static/media/[name].[ext]?v=[hash:4]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('static/fonts/[name].[ext]?v=[hash:4]')
                }
            },
        ]
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}

const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
    context: utils.resolve('./'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'static': utils.resolve('src/static'),
            'components': utils.resolve('src/components'),
            'filter': utils.resolve('src/filter'),
            'common': utils.resolve('src/common'),
            '@': utils.resolve(`src/pages`)
        }
    },
    plugins:[
        new CopyWebpackPlugin([
            {
                from: utils.resolve(`./src/static`),
                to: utils.resolve(`./dist/static`),
                ignore: ['.*']
            }
        ]),
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
                include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client'), utils.resolve('node_modules/vue-echarts-v3/src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('static/img/[name].[ext]?v=[hash:4]')
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

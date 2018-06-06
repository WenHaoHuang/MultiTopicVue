const path = require('path')
const glob = require('glob')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpakcPlugin = require('clean-webpack-plugin')
const config = require('./webpack.config')

let buildList = []
if(process.env.MODE_BUILD === 'all'){
    const entryFiles = glob.sync('./src/pages/' + '/!(_**)/**/main.js')
    entryFiles.forEach((filePath) => {
        const fileName = filePath.replace(/.\/src\/pages\/|\/main.js/g,'')
        buildList.push(fileName)
    })
} else {
    buildList = require('./../build.list.js')
}

const baseConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: 'static/app.js?v=[hash:4]',
        chunkFilename: 'static/[id].js?v=[hash:4]',
        publicPath: config.build.assetsPublicPath
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.NODE_ENV
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('static/app.css?v=[contenthash:4]'),
            allChunks: true,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? {safe: true, map: {inline: false}}
                : {safe: true}
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
})

const webpackConfig = buildList.map(item => {
    const _webpackConfig = merge(baseConfig, {
        entry: `./src/pages/${item}/main.js`,
        output: {
            path: `${config.build.assetsRoot}/${item}`,
            publicPath: `/${item}/`
        },
        plugins: [].concat([
            new HtmlWebpackPlugin({
                static: `/static`,
                template: `./src/pages/${item}/template.js`,
                filename: `index.ejs`,
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            }),
            new CleanWebpakcPlugin(`dist/${item}`, {
                root: path.resolve(__dirname, '..'),
                verbose: false,
                dry: false
            })
        ])
    })
    return _webpackConfig
})

module.exports = webpackConfig

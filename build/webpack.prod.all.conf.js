const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.config')
const ENV = process.env
const PAGE_PATH = utils.resolve('./src/pages')

function entries(){
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/**/main.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 3] + '.' + pathArr[pathArr.length - 2]
        map[pathName] = filePath
    })
    return map;
}
function htmlPlugin(){
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/**/main.js')
    const arr = []
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 3] + "/" + pathArr[pathArr.length - 2]

        let conf = {
            template: `./src/pages/${pathName}/template.ejs`,
            filename: `./dist/${pathName}/index.html`,
            chunks: ['commons', pathName],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr;
}
const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    entry: entries(),
    output: {
        path: utils.resolve('./dist'),
        filename: 'static/js/[name].js?v=[hash:4]',
        publicPath: config.build.assetsPublicPath
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
            filename: utils.assetsPath('static/css/[name].css?v=[contenthash:4]'),
            allChunks: true,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ].concat(htmlPlugin()),
})
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackConfig
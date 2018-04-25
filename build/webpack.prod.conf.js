const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.config')
const ENV = process.env
const fileName = `${ENV.npm_package_DIR}/static`
const entries = {}
entries[fileName] = `./src/pages/${ENV.npm_package_DIR}/main.js`

const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    entry: entries,
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
            filename: utils.assetsPath('[name]/app.css?v=[contenthash:4]'),
            allChunks: true,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            {
                from: utils.resolve(`./src/pages/${ENV.npm_package_DIR}/static`),
                to: utils.resolve(`./dist/${ENV.npm_package_DIR}/static`),
                ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            static:`/static`,
            template: `./src/pages/${ENV.npm_package_DIR}/template.ejs`,
            filename: `${ENV.npm_package_DIR}/index.html`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
    ]
})
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackConfig
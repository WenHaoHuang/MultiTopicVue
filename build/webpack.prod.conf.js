const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENV = process.env

function entries() {
    const map = {}
    const fileName = `${ENV.npm_package_DIR}/static`
    map[fileName] = `./src/pages/${ENV.npm_package_DIR}/main.js`
    return map;
}

const webpackConfig = merge(prodWebpackConfig, {
    entry: entries(),
    plugins: [
        new HtmlWebpackPlugin({
            static: `/static`,
            template: `./src/pages/${ENV.npm_package_DIR}/template.ejs`,
            filename: `${ENV.npm_package_DIR}/index.ejs`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ],
})

module.exports = webpackConfig
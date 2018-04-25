const utils = require('./utils')
const merge = require('webpack-merge')
const glob = require('glob')
const prodWebpackConfig = require('./webpack.prod')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = utils.resolve('./src/pages')

function entries() {
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/**/main.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 3] + '/' + pathArr[pathArr.length - 2] + '/static'
        map[pathName] = filePath
    })
    return map;
}

function htmlPlugin() {
    const entryFiles = glob.sync(PAGE_PATH + '/!(_**)/**/main.js')
    const arr = []
    entryFiles.forEach((filePath) => {
        const pathArr = filePath.split('\/')
        const pathName = pathArr[pathArr.length - 3] + "/" + pathArr[pathArr.length - 2]

        let conf = {
            static: `/static`,
            template: `./src/pages/${pathName}/template.ejs`,
            filename: `${pathName}/index.ejs`,
            chunks: [pathName + '/static'],
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

const webpackConfig = merge(prodWebpackConfig, {
    entry: entries(),
    plugins: [].concat(htmlPlugin()),
})

module.exports = webpackConfig
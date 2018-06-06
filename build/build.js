process.env.NODE_ENV = 'production'

process.env.MODE_BUILD = process.argv[2].replace('--','')

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        hash: false,
        modules: false,
        children: {
            children: false,
            hash: true
        },
        chunks: false,
        chunkModules: false,
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
})

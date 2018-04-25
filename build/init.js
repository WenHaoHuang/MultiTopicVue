const chalk = require('chalk')
const rm = require('rimraf')
const path = require('path')
const child = require('child_process')
const utils = require('./utils')
const fs = require('fs')

const TPL = process.argv[2]
const DIR = process.argv[3]

if (TPL != 'pc' && TPL != 'wap') {
    console.log(chalk.red(`> 请选择一个开发版本 eg. npm run init pc`))
    process.exit()
} else if (!DIR) {
    console.log(chalk.red(`> 请选择一个目标路径 eg. npm run init pc demo`))
    process.exit()
}

rm(path.join(`./src/pages/${DIR}/${TPL}`), err => {
    if (err) throw err
    let order = `mkdir -p ./src/pages/${DIR}/${TPL}`
    order += '&& cp -Rf ' + utils.resolve(`./src/pages/_demo/${TPL} `) + utils.resolve(`./src/pages/${DIR}`)
    const orderStatus = child.execSync(order)
    if(orderStatus){
        console.log(chalk.cyan(`> ${DIR}/${TPL} 已清空并重新创建 成功.\n`))
    } else {
        console.log(chalk.cyan(`> ${DIR}/${TPL} 已清空并重新创建 失败.\n`))
    }
    const PACKAGE = require('../package.json')
    PACKAGE.DIR = `${DIR}/${TPL}`
    fs.writeFile(`./package.json`, JSON.stringify(PACKAGE, null, 2), {encoding: 'utf8'}, (err) => {
        if (err) {
            console.log(chalk.red(`> ${DIR}/${TPL} 写入 package.json 失败\n`))
        } else {
            console.log(chalk.green(`> ${DIR}/${TPL} 写入 package.json 成功\n`))
        }
    })
})

/**
 * @author : wenhao.huang
 * @date   : 2018/3/25
 * @project: kv.js
 */
const fs = require('fs');
const axios = require('axios');
const CONF = require('../../config/index.js');
const chalk = require('chalk')

const env = process.argv[2] || 'dev';

class KV {
    constructor() {
        this.API_CONF = {}
        this.Server_CONF = {}
        this.domain = CONF.domain
        this.web = CONF.web
        this.keys = CONF.keys
        this.ENV_CONF = {
            online: ['/Online', '正式'],
            ptr: ['/Ptr', '预发'],
            test: ['/Test', '测试'],
            dev: ['/Dev', '开发']
        }
    }

    start() {
        console.log(chalk.green('> 当前所处环境 => ' + this.ENV_CONF[env][1]))
        console.log(chalk.green('> 获取当前配置文件'))
        this.clientFn()
        this.serverFn()
    }

    clientFn() {
        this.API_CONF['ENV'] = env
        axios.all([this.getDomain(), this.getSeesion()])
            .then(axios.spread(() => {
                fs.writeFile(`./../config/kv.json`, JSON.stringify(this.API_CONF, null, 2), {encoding: 'utf8'}, (err) => {
                    if (err) {
                        console.log(chalk.red('> Client 配置文件写入失败\n'))
                    } else {
                        this.API_CONF = require('../../config/kv.json')
                        console.log(chalk.yellow(JSON.stringify(this.API_CONF)))
                        console.log(chalk.green('> Client 配置文件写入成功\n'))
                    }
                })
            }))
    }

    serverFn() {
        const axiosArr = []
        this.keys.forEach((item) => {
            axiosArr.push(this.getKey(item))
        })
        axios.all(axiosArr)
            .then(axios.spread(() => {
                fs.writeFile(`./../config/server.json`, JSON.stringify(this.Server_CONF, null, 2), {encoding: 'utf8'}, (err) => {
                    if (err) {
                        console.log(chalk.red('> Server 配置文件写入失败\n'))
                    } else {
                        this.Server_CONF = require('../../config/server.json')
                        console.log(chalk.yellow(JSON.stringify(this.Server_CONF)))
                        console.log(chalk.green('> Server 配置文件写入成功\n'))
                    }
                })
            }))
    }

    getDomain() {
        const ENV = env === 'dev' ? 'test' : env
        const domain = this.domain + this.ENV_CONF[ENV][0]
        return axios.get(domain)
            .then((response) => {
                const object = {}
                let str = this.parseBase64(response.data[0]['Value'])
                str = str.replace(/\s+/g, '').replace(/[\r\n]/g, '').replace(/'/g, '')
                str.split(',').forEach((item) => {
                    item = item.split('=>')
                    object[item[0]] = item[1]
                })
                this.API_CONF['domain'] = object
            })
            .catch((error) => {
                console.log(error.response.status)
            })
    }

    getSeesion() {
        const domain = this.web + this.ENV_CONF[env][0]
        return axios.get(domain + '/seesionIdKey')
            .then((response) => {
                this.API_CONF['seesionIdKey'] = this.parseBase64(response.data[0]['Value'])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getKey(item) {
        const domain = this.web + this.ENV_CONF[env][0]
        return axios.get(domain + '/' + item)
            .then((response) => {
                this.Server_CONF[item] = this.parseBase64(response.data[0]['Value'])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    parseBase64(str) {
        const b = new Buffer(str, 'base64')
        return b.toString()
    }
}

const kv = new KV()
kv.start()

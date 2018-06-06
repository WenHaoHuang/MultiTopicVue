/**
 * @author : wenhao.huang
 * @date   : 2018/3/9
 * @project: 拉取线上components
 */
const path = require('path');
const child = require('child_process');
const chalk = require('chalk')

const components = 'kesu-components';
const branches = process.argv[2] || 'huangwenhao';
const GITURL = 'http://' + branches + '@192.168.8.174:8090/Web_Team/' + components + '.git';

class Git {
    resolve(str) {
        return path.join(__dirname, '../', str)
    }

    async one() {
        child.execSync('rm -rf ' + this.resolve(components));
    }

    async two() {
        console.log('> 开始拉取 ' + GITURL)
        const execGit = child.execSync('git clone ' + GITURL);
        if (execGit) {
            console.log('> 项目获取   成功')
            let order = 'rm -rf ' + this.resolve('components');
            order += ' && mkdir components';
            order += ' && cp -Rf ' + this.resolve(components + '/components/* ') + this.resolve('components');
            order += ' && rm -rf ' + this.resolve(components);
            const orderLink = child.execSync(order);
            if (orderLink) {
                console.log(chalk.cyan('> 组件库建立 成功\n'))
                return 'ok';
            } else {
                console.log(chalk.red('> 组件库建立 失败\n'))
                return 'error';
            }
        } else {
            console.log('> 项目获取   ' + chalk.red('失败\n'))
            return;
        }
    }

    async _init() {
        await this.one();
        await this.two();
    }
}

const git = new Git();
git._init();

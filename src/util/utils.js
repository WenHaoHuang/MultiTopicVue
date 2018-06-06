/**
 * @author : wenhao.huang
 * @date   : 2018/3/20
 */

const Util = {
    // 验证电话号码
    checkPhone(phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    },
    // 验证手机验证码 or 交易密码
    checkCode(val) {
        if (!(/^\d{6}$/.test(val))) {
            return false;
        }
        return true;
    },
    // 验证账户密码
    checkPassword(val) {
        if (!(/^[a-zA-Z0-9]{6,16}$/.test(val))) {
            return false;
        }
        return true;
    },
    // 验证银行卡号
    checkBankCard(str) {
        if (!(/^[0-9]{16,19}$/.test(str))) {
            return false;
        }
        return true;
    },
    //真实姓名验证
    /**
     * 验证规则：
     * 1.必须为中文
     * 2.字符长度只能为2-16个汉字
     * 3.还要兼容符号·,并且只能出现在中间
     **/
    isChineseName(str) {
        if (str == '') return false;
        const reg = /^[\u4E00-\u9FA5]+·?[\u4E00-\u9FA5]+$/;
        const yesorno = str.match(reg) != null;
        if (yesorno) {
            if (str.length < 2 || str.length > 16) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    /**
     * 身份证号码验证 - 简单
     * 15位为全数字 | 18位的前17位为数字，最后一位为数字或者字母x
     */
    isIdCardNo(str){
        if(!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(str))){
            return false;
        }
        return true;
    },
    /**
     * 金额验证
     * 最多接受2位小数
     */
    isMoney(str){
        if(/(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^(0)\.$)|(^[0-9]\.[0-9]([0-9])?$)/.test(str)){
            return true;
        }
        return false;
    },
    /*
    * @function format 日期格式化
    * @params timestamp 必填，需格式化的时间戳或者其他日期格式
    * @return fmt 选填，需返回的时间格式，默认 yyy-MM-dd hh:mm:ss
    * 或者：yyyy年MM月dd日 hh时mm分ss秒
    * 或者<i>ss<i>
    * */
    format(timestamp,fmt){
        fmt = (fmt == undefined) ? 'yyyy-MM-dd hh:mm:ss' : fmt;
        if(timestamp == undefined){
            timestamp = new Date().getTime();
        } else if(String(timestamp).length == 10){
            timestamp = timestamp*1000;
        }
        timestamp = new Date(timestamp);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (timestamp.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
            'M+': timestamp.getMonth() + 1,
            'd+': timestamp.getDate(),
            'h+': timestamp.getHours(),
            'm+': timestamp.getMinutes(),
            's+': timestamp.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
            }
        }
        return fmt;
    },
    countTime(timestamp,fmt){
        fmt = (fmt == undefined) ? 'hh:mm:ss' : fmt;
        if(timestamp == undefined){
            timestamp = 0;
        }
        const o = {
            'd+': parseInt(timestamp/60/60/24),
            'h+': parseInt(timestamp/60/60%24),
            'm+': parseInt(timestamp/60%60),
            's+': parseInt(timestamp%60)
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
            }
        }
        return fmt;
    },
    // 根据当前时间戳
    getNowStamp() {
        return Math.floor((+ new Date())/1000)
    },
}

const UTIL = {
    install: (Vue) => {
        Vue.prototype.$util = Util
    }
}


export default UTIL;

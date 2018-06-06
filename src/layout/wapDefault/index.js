import layout from './layout.ejs'

const pf = {
    pageTitle: '标题',
    pageKeywords: '关键字',
    pageDescription: '页面描述。',
    static: $domain.static
}

const moduleExports = {
    init(options) {
        Object.keys(options).forEach(item=>{
            pf[item] = options[item]
        })
        return layout(pf)
    }
}

export default moduleExports

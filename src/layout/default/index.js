const layout = require('./layout.ejs')

const pf = {
    pageTitle: '',
    meta: '123456'
}
const moduleExports = {
    init({pageTitle}) {
        pf.pageTitle = pageTitle
        return this
    },
    run(content) {
        const renderData = {
            pageTitle: pf.pageTitle,
            content,
        };
        return layout(renderData)
    }
}

module.exports = moduleExports
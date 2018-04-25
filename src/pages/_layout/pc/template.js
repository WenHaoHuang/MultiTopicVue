const content = require('./content.ejs')

const layout = require('layout/default/index.js')
const pageTitle = 'ejs layout模板'

module.exports = layout.init({ pageTitle }).run(content({ pageTitle }))

const tape = require('tape')
const remark = require('remark')
const directives = require('remark-directive')
let shields = require('../main/index.js')

tape('markdown-to-html', t => {

    const processor = remark().use(directives).use(shields)
    t.deepEqual(processor('_hello_'), '<p>hi</p>', 'bad bad')
})
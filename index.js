const walk = require('wayfarer/walk')

function isGenerator (cb) {
    return (cb).constructor.name === 'GeneratorFunction'
}

function asyncRouter (router) {
    walk(router, (route, cb) => {
        return function() {
            var result = cb.apply(null, [].slice.call(arguments))
            var html = null
            var next = { done: false }
            if(isGenerator(cb)) {
                while(!next.done) {
                    next = result.next()
                    if(next.value instanceof Element) {
                        html = next.value
                    }
                }
                return html
            }
            return result
        }
    })
}

module.exports = asyncRouter

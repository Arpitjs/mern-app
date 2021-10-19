let {nanoid} = require('nanoid')

module.exports = (obj1, obj2, reg) => {
    if (obj2.name) {
        obj1.name = obj2.name
    }
    if (obj2.email) {
        obj1.email = obj2.email
    }
    if (obj2.password) {
        obj1.password = obj2.password
    }
    if (obj2.secret) {
        obj1.secret = obj2.secret
    }
    if (obj2.about) {
        obj1.about = obj2.about
    }
    if (obj2.username) {
        obj1.username = obj2.username 
    }
    if(!obj2.username && reg) {
        obj1.username = nanoid(6) 
    }
}
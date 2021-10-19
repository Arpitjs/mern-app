let bcrypt = require('bcryptjs')

exports.hashPassword = (password) => {
    return new Promise((res, rej) => {
        let hashedPassword = bcrypt.hash(password, 16)
        res(hashedPassword)
    })   
}

exports.comparePassword = (p1, p2) => {
    return bcrypt.compare(p1, p2)
}
let validateRegister = (obj) => {
        if(!obj.name) {
            return 'name is required'
        }
        if(obj.name.length < 5) {
            return 'name must have more than 5 characters'
        }
        if(!obj.password) {
            return 'password is required'
        }
        if(obj.password.length < 5) {
            return 'password must have more than 5 characters'
        }
        if(!obj.email) {
            return 'email is required'
        }
        if(!obj.secret) {
            return 'secret is required'
        }
}

let validateUpdate = (obj) => {
    if(obj.name && obj.name.length < 5) {
        return 'name must have more than 5 characters'
    }
    if(obj.password && obj.password.length < 5) {
        return 'password must have more than 5 characters'
    }
}

module.exports = {
    validateRegister, validateUpdate
}
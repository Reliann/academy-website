const mongooseDB = require('mongoose')

const userModel = new mongooseDB.Schema({
    username:String,
    password:String
})

module.exports= mongooseDB.model('users',userModel)
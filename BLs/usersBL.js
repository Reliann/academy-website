const userModel = require('../models/usersModel')

const createUser = (data)=>{
    
    return new Promise((resolve,reject)=>{
        userModel.find({username:data.username},(err,user)=>{
            if(user.length!=0){
                err? reject(err) : resolve(false)
            }else{
                let new_user = new userModel({
                    username : data.username,
                    password : data.password
                })
                new_user.save((err,user)=>{
                    err?reject(err):resolve(true)
                })
            }
        })
        
    })
}
const authenticateUser=(username,password)=>{
    return new Promise((resolve,reject)=>{
        userModel.find({username:username,password:password},'-__v',(err,user)=>{
            err&&reject(err)
            user.length?resolve(true):resolve(false)
            
        })
    })
}

module.exports={
    createUser,
    authenticateUser
}
const facultiesModel = require('../models/facultiesModel')

const getAllFaculties = ()=>{
    return new Promise((resolve,reject)=>{
        facultiesModel.find({},(err, faculties)=>{
            err? reject(err):resolve(faculties)
        })
    })
}

module.exports={
    getAllFaculties
}
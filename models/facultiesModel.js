const  mongooseDB = require("mongoose");

const facultySchema = new mongooseDB.Schema({
        name: String,
        about: String
    }
)

module.exports = mongooseDB.model('faculties', facultySchema)
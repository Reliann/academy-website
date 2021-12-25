const moongoseDB = require('mongoose')

const studentSchema = new moongoseDB.Schema ({
    //no need to add object _id here 
    fullName: String,
    email : String,
    faculty: String,
    birthday: Date,
    grades: [{name:String,score:Number, date:Date}],
    img: String,
    aboutMe:String,
    honor: Boolean
})

module.exports = moongoseDB.model('students', studentSchema)

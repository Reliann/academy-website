const mongoose = require('mongoose')

//ODM - connecting to my db


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/studentsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
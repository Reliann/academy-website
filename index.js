const express = require('express')
const cors = require('cors')
const studentsControler = require('./Controllers/studentsController')
const facultiesControler = require('./Controllers/facultiesController')
const usersControler = require('./Controllers/usersController')
require('./config/DB')
const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,PUT,PATCH,POST,DELETE"
 }
 
//app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/students',studentsControler) //controller for students
app.use('/faculties',facultiesControler)
app.use('/user', usersControler)

const path = require("path");
//CONTINUE HERE
app.use(express.static(path.resolve(__dirname, "./students webpage")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./students webpage", "login.html"));
});
app.listen(process.env.PORT||8000,
    () => console.log("The server is Running")
);


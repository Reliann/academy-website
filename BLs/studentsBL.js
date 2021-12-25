const studentModel = require('../models/studentModel')

const getAll = ()=>{
    return new Promise((resolve,reject)=>{
        studentModel.find({},(err,students)=>{
            err? reject(err): resolve(students)
        })
    })
}
const getById=(id) =>{
    return new Promise((resolve,reject)=>{

        studentModel.findById(id, (err,student)=>{
            err? reject(err): resolve(student)
        })
    })

}
const getGradesById = (id)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findById(id,'grades',(err,gradesObj)=>{
            err? reject(err):resolve(gradesObj.grades)
        })
    })
}
const putStudentGrade = async(id, grade_id, updated_grade) =>{
    return new Promise((resolve,reject)=>{
        studentModel.findOneAndUpdate({_id:id,'grades._id':grade_id},{$set:
            {'grades.$.name':updated_grade.name, 
            'grades.$.score':updated_grade.score, 
            'grades.$.date':new Date(updated_grade.date)}}, {new: true}
              ,(err,student)=>{
                    err? reject(err):resolve(student.grades.filter(grade=>grade._id == grade_id)[0])
            })
        })
}

const postStudentGrade = (id,grade)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findOneAndUpdate({_id:id},{$push:{
            grades:{name:grade.name, 
                score:grade.score, 
                date:new Date(grade.date)}}}
                ,{new: true},(err, student)=>{ 
                    err? reject(err):resolve(student.grades[student.grades.length-1])
                })
        
    })
}
const postStudent=(data)=>{
    
    let new_student = new studentModel({
        fullName: data.fullName,
        email : data.email,
        faculty: data.faculty,
        birthday: new Date(data.birthday),
        grades: [],
        img: "https://picsum.photos/150/150",//set some image for now 
        aboutMe:data.aboutMe,
        honor: false
    })
    return new Promise((resolve,reject)=>{
        new_student.save((err,data)=>{
            err? reject(err):resolve(data)
        })
    })

}
const putStudent=(id,student)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findByIdAndUpdate(id,{
            fullName: student.fullName,
            email : student.email,
            faculty: student.faculty,
            birthday: student.birthday,
            aboutMe: student.aboutMe,
            //grades: student.grades, -- no need to update it
            img: student.img? student.img:" https://picsum.photos/150/150", //default image for student.
            //honor: student.honor
        },{new:true},(err,data)=> err? reject(err): resolve(data))
    })
}
const deleteStudentGrade=(id,grade_id)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findByIdAndUpdate(id,{$pull:{grades:{_id:grade_id}}},(err)=>{
            err? reject(err):resolve({})
        })
    })
}
const deleteStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findByIdAndDelete(id,(err)=>{
            err? reject(err):resolve({})
        })
    })
}
const patchStudentFields = (id,fields)=>{
    return new Promise((resolve,reject)=>{
        studentModel.findByIdAndUpdate(id,fields,{new: true},(err,data)=>{
            if (err){
                reject(err)
            }
            else{
                // i want to return changed fields and the student id only
                let answer = {_id:data._id}
                for(key in fields){
                    if(key in data){
                        answer[key] = data[key]
                    }
                }
                resolve(answer)
            }
        })
    })
}


module.exports = {
    getAll,
    getById,
    postStudent,
    putStudent,
    patchStudentFields,
    deleteStudent,
    getGradesById,
    postStudentGrade,
    deleteStudentGrade,
    putStudentGrade
}
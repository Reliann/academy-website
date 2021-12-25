const router = require('express').Router()
const studentsBl = require('../BLs/studentsBL')

router.route('/').get(async (req,res) =>{ 
    let student = await studentsBl.getAll()
    return res.json(student)
})
//on localhost:8000/students/'id' -get
router.route('/:id').get(async (req,res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }else{
        let student = await studentsBl.getById(req.params.id)
        return res.json(student)
    }
    
})
// on localhost:8000/students/'id'/grades -get
router.route('/:id/grades').get(async (req,res)=>{
    let grades = await studentsBl.getGradesById(req.params.id)
    return res.json(grades)
})
//on localhost:8000/students -post
router.route('/').post(async(req,res)=>{
    let student= await studentsBl.postStudent(req.body)
    return res.json(student)
})
// on localhost:8000/students/'id'/grades -post
router.route('/:id/grades').post(async (req,res)=>{
    let grade= await studentsBl.postStudentGrade(req.params.id, req.body)
    return res.json(grade)
})
//on localhost:8000/students/id - put
router.route('/:id').put(async(req,res)=>{
    let student = await studentsBl.putStudent(req.params.id, req.body)
    return res.json(student)
})
// localhost:8000/students/id/grades/gid
router.route('/:id/grades/:gid').put(async (req,res)=>{
    let grade = await studentsBl.putStudentGrade(req.params.id,req.params.gid,req.body)
    return res.json(grade)
})
router.route('/:id/grades/:gid').delete(async (req,res)=>{
    let answer = await studentsBl.deleteStudentGrade(req.params.id,req.params.gid)
    return res.json(answer)
})
//localhost:8000/students/id -delete
router.route('/:id').delete(async(req,res)=>{
    let answer = await studentsBl.deleteStudent(req.params.id)
    return res.json(answer)
})
router.route('/:id').patch(async(req,res)=>{
    let answer = await studentsBl.patchStudentFields(req.params.id,req.body)
    return res.json(answer)
})

module.exports = router

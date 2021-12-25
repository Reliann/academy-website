const router = require('express').Router()
const facultiesBl = require('../BLs/facultiesBL')

router.route('/').get(async (req,res)=>{
    let faculties = await facultiesBl.getAllFaculties()
    return res.json(faculties)
})

module.exports = router
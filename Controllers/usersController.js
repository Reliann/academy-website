const router = require('express').Router()
const usersBL = require('../BLs/usersBL')

router.route('/').post(async (req,res)=>{
    const user = await usersBL.createUser(req.body)
    return res.json(user)
})

router.route('/:username/:password').post(async (req,res)=>{
    const user = await usersBL.authenticateUser(req.params.username, req.params.password)
    return res.json(user)
})

module.exports = router
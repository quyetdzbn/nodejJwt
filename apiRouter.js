const express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
    res.json('oke dcm')
})

router.get('/product',(req,res)=>{
    res.json('oke dcm1')
})

router.get('/10',(req,res)=>{
    res.json('oke dcm10')
})

module.exports = router
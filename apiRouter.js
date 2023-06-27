const express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
    res.json('oke ')
})

router.get('/product',(req,res)=>{
    res.json('oke 1')
})

router.get('/10',(req,res)=>{
    res.json('oke 10')
})

module.exports = router
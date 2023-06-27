const express= require('express')
var router = express.Router()
const AccountModel= require('../model/account')

//lay du lieu tu database
router.get('/',(req,res,next)=>{
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})


//them moi du lieu
router.post('/',(req,res,next)=>{
     var username= req.body.username
    var password= req.body.password

    AccountModel.create({
        username : username,    
        password : password
    })
    .then(data=>{
        res.json('them moi thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})


//update database theo id
router.put('/:id',(req,res,next)=>{
    var id= req.params.id
    var newPassword =  req.body.newPassword

    AccountModel.findByIdAndUpdate(id,{
        password : newPassword
    })

    .then(data=>{
        res.json('cap nhat thanh cong thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})


//xoa du lieu
router.delete('/:id',(req,res,next)=>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id:id
    })
    .then(data=>{
        res.json('xoa thanh cong ')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})
  
  

module.exports=router
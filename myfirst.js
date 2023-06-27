const express = require('express')
const app = express()
const port = 3000
const AccountModel=require('./model/account')
var bodyParser = require('body-parser')
var router = require('./apiRouter')
const path = require('path')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/test',router)

app.get('/login',(req,res,next)=>{
  res.sendFile(path.join(__dirname, 'login.html'))
})

app.post('/login',(req,res,next)=>{
  var username = req.body.username
  var password = req.body.password

  AccountModel.findOne({
    username: username,
    password: password
  })
  .then(data=>{
    if(data){
      var token = jwt.sign({_id: data._id},'mk')
      return res.json({
        message:'thanh cong',
        token:token
      })
    }
    else
    {
      return res.json('dang nhap that bai')
    }
  })
  .catch(err=>{
    res.status(500).json('loi server')
  })
})
var checkLogin = (req,res,next)=>{
  try{
    var token= req.cookies.token
    var ketqua= jwt.verify(token,'mk')
    AccountModel.findOne({
      _id:ketqua
    })
    .then(data=>{
      if(data){
        req.data=data
        next()
      }
      else{
        res.json('not permission')
      }
    })
    .catch(err=>{
      
    })
}
  catch(error){

    res.status(500).json('token k hoop le')
  }
}

var checkStudent=(req,res,next)=>{
  var role=req.data.role
  if( role ==='student' || role==='teacher'|| role==='manager')
  {
    next()
  }
  else{
    res.json('not permission')
  }
}

var checkManager=(req,res,next)=>{
  var role=req.data.role
  if(  role==='manager')
  {
    next()
  }
  else{
    res.json('not permission')
  }
}

var checkTeacher=(req,res,next)=>{
  var role=req.data.role
  if( role==='teacher'|| role==='manager')
  {
    next()
  }
  else{
    res.json('not permission')
  }
}

app.get('/student',checkLogin,checkStudent,(req,res,next)=>{
    console.log(req.data);
  res.json('all task')
})

app.get('/teacher',checkLogin,checkTeacher,(req,res,next)=>{
  next()
},(req,res,next)=>{
  
  res.json('teacher')
})

app.get('/manager',checkLogin,checkManager,(req,res,next)=>{
  next()
},(req,res,next)=>{
  
  res.json('manager')
})



var accountRouter=require('./router/acount')

app.use('/api/account/',accountRouter)



app.post('/register',(req,res,next)=>{
 var username= req.body.username
 var password= req.body.password

 AccountModel.findOne({
  username:username
 })
 .then(data=>{
    if(data){
      res.json('tai khoan da ton tai')
    }
    else{
      return AccountModel.create({
        username : username,
        password : password
      })
      
    }
  }
  )
  .then(data=>{
    res.json('tao tai khoan thanh cong')
  })  
.catch(err=>{
  res.status(500).json('tao tai khoan that bai')
})
})

app.post('/login',(req,res,next)=>{
  var username = req.body.username
  var password = req.body.password

  console.log(res.param);
  console.log(username, password);
  AccountModel.findOne({
    username: username,
    password : password
  })
  .then(data=>{
    if(data)
      res.json('dang nhap thanh cong')
    else
      res.status(300).json('tai khoan k dung')
  })
  .catch(err=>{
    res.status(500).json('co loi server')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
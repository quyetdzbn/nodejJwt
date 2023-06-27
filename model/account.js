const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username:String,
  password:String,
  role:String,

},{
    collection:'account'
});

const AccountModel= mongoose.model('account',accountSchema)
module.exports= AccountModel
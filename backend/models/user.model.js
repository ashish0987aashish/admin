

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({

   fullName:{type:String,required:true},
   email:{type:String,requied:true},
   password:{type:String,requied:true},
   createdOn:{type:Date,default:Date.now}

})

module.exports = mongoose.model("User",userSchema)

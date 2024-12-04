const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({

    bTitle:{type:String,required:true},
    bDesc:{type:String,required:true},
    bImgs:{type:[String],required:true},
    postDate:{type:Date,required:true},
    fullName:{type:String,required:true}
})


module.exports = mongoose.model("Blog",blogSchema)
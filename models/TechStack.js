const mongoose = require('mongoose')
const TechStackSchema=mongoose.Schema({
    techStackCode:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['started','development','testing','compelete']
    }
})
module.exports=mongoose.model("TechStack", TechStackSchema)
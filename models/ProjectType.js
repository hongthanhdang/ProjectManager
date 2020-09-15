const mongoose = require('mongoose')
const ProjectTypeSchema=mongoose.Schema({
    projectTypeCode:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    priority:{
        type:Number
    },
    status:{
        type:String,
    }
})
module.exports=mongoose.model("ProjectType",ProjectTypeSchema)
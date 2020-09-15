const mongoose = require('mongoose')
const ProjectStatusSchema=mongoose.Schema({
    projectStatusCode:{
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
module.exports=mongoose.model("ProjectStatus", ProjectStatusSchema)
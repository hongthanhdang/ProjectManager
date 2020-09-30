const mongoose = require('mongoose')
const CenterSchema=mongoose.Schema({
    centerCode:{
        type:String,
        require:true
    },
    responsibility:{
        type:String
    },
    techStackCode:{
        type:[String]
    },
    projectCodes:{
        type:[String]
    },
    staffCodes:{
        type:[String]
    }
})
module.exports=mongoose.model("Center",CenterSchema)
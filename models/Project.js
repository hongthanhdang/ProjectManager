const mongoose = require('mongoose')
const StaffSchema=mongoose.Schema({
    projectCode:{
        type:String
    },
    projectType:{
        type:String
    },
    projectStatusCode:{
        type:String,
    },
    techStacksCode:{
        type:[String],
    },
    centerCode:{
        type:String,
    },
    memberCodes:{
        type:[String],
    }
})
module.exports=mongoose.model('Staff',StaffSchema)
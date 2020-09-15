const mongoose = require('mongoose')
const StaffSchema=mongoose.Schema({
    code:{
        type:String
    },
    fullName: {
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    identificationCardNumber:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String,
    },
    foreignLanguage:{
        type:[String]
    },
    certification:{
        type:[String]
    },
    techStack:{
        type:[String]
    },
    participatedProjectID:{
        type:[String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.model('Staff',StaffSchema)
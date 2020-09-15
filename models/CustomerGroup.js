const mongoose = require('mongoose')
const CustomerGroupSchema=mongoose.Schema({
    customerGroupCode:{
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
module.exports=mongoose.model("CustomerGroup",CustomerGroupSchema)
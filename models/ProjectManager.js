const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const ProjectManagerSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        // check email
        type: String,
        required:true
    },
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});
// Hash password 
UserSchema.pre('save', async function save(next){
    console.log(this)
    if (!this.isModified('password')) {
        console.log('aaaaa')
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        // console.log(salt)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (error) {
        return next(error)
    }
})
// Compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    let validPass= await bcrypt.compare(candidatePassword,this.password)
    return validPass
};

module.exports = mongoose.model('ProjectManager', ProjectManagerSchema)
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10
const ProjectManagerSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        // check email
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        default: 'active',
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
ProjectManagerSchema.pre('save', async function save(next) {
    console.log(this)
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (error) {
        return next(error)
    }
})
// Compare password
ProjectManagerSchema.methods.comparePassword = async function (candidatePassword) {
    let validPass = await bcrypt.compare(candidatePassword, this.password)
    return validPass
};
export const ProjectManager=mongoose.model('ProjectManager',ProjectManagerSchema)
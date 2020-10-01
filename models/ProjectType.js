import mongoose from 'mongoose'
const ProjectTypeSchema = mongoose.Schema({
    projectTypeCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priority: {
        type: Number
    },
    status: {
        type: String,
    }
})
export const ProjectType = mongoose.model("ProjectType", ProjectTypeSchema)
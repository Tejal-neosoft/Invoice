import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firmname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    mob:{
        type:Number,
        required: true
    },
    cpass: {
        type: String,
        required: true
    }
})
export default mongoose.model("user", userSchema)
import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    rname: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    remail: {
        type: String,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
export default mongoose.model("product", productSchema)
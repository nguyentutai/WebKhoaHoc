import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    cornerprice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status:{
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('courses', courseSchema);
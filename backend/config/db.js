import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dbMadhav:dbMadhavXRetrievo@cluster0.vq0vh3h.mongodb.net/resume-builder').then(() => console.log("DB connected"))
}
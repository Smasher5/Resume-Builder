import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO).then(() => console.log("DB connected"))

}


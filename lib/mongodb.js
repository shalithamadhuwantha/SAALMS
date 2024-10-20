// lib\mongodb.js
import mongoose from "mongoose";


export const connectMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connect")
    } catch (error) {
        console.log("error: ",error)
    }
}


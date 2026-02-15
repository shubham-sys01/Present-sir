import mongoose from "mongoose";
import { user } from "@/models/user";
import { timetable } from "@/models/timetable";

export const dbconnect = async () => {
    const monguuri = process.env.MONGO_URI;
    console.log(monguuri)
    console.log("mongo connect")
    try {
        await mongoose.connect(monguuri)
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}


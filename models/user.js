import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    "username": { type: String, required: true },
    "email": { type: String, required: true },
    "password" : {type :String , required : true},
    "firstlogin" :{type :Boolean , default : true},
});     

export const user =
    mongoose.models.sampleuser ||
    mongoose.model("sampleuser", userschema);

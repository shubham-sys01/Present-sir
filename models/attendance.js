import mongoose from "mongoose";

const attendanceschema = new mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId , ref : "sampleuser" , required : true},
    attendance : [
        {
            "subject" : String,
            "code" : String,
            "totalclasses" : {type : Number , default : 0},
            "attended classes" : {type : Number , default : 0},
            "classesabsent" : {type : Number , default : 0}
        }
    ]
})

export const attendances = mongoose.models.attendances || mongoose.model("attendances",attendanceschema)
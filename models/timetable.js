import mongoose, { mongo, Schema } from "mongoose";

const timetableschema = new Schema({
    "userid": {type : mongoose.Schema.Types.ObjectId ,ref : "sampleuser" , required : true},
    "timetable": [
        {
            "day": String,
            "classes": [
                {
                    "starttime": String,
                    "endtime": String,
                    "subject": String,
                    "code" : String
                }
            ]
        }
    ]
})

export const timetable = mongoose.models.timetables || mongoose.model("timetables", timetableschema);

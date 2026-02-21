import mongoose from "mongoose";

const subjectschema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "sampleuser", required: true },
    attendance: [
        {
            "subject": String,
            "code": String,
            "totalclasses": { type: Number, default: 0 },
            "attended classes": { type: Number, default: 0 },
            "classesabsent": { type: Number, default: 0 },
            "dates": {
                type: [
                    {
                        "date": { type: Date },
                        "status": { type: Boolean, default: false }
                    }
                ],
                default: []
            }
        }
    ]
})

export const subjects = mongoose.models.subjects || mongoose.model("subjects", subjectschema)
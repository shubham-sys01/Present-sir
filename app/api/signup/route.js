"use server"
import { user } from "@/models/user";
import { NextResponse } from "next/server"
import { dbconnect } from "@/lib/mongoconnect";
import { genhash } from "@/lib/hashpass";
import { timetable } from "@/models/timetable";

dbconnect()
export async function POST(req) {
    const { name, email, password } = await req.json();
    if (!name | !email | !password) {
        return NextResponse.json({ status: false, message: "data missing" })
    }
    const find = await user.findOne({ email: email })
    console.log(find)
    if (find) {
        return NextResponse.json({ status: false, message: "email id is already used" })
    }
    try {
        const hash = await genhash(password)
        const res = await user.insertOne({ username: name, email: email, password: hash });
        //create a timetable also 
        const timetabled = [
            {
                "day" : "Monday",
                "classes" : []
            },
            {
                "day": "Tuesday",
                "classes": []
            },
            {
                "day": "Wednesday",
                "classes": []
            },
            {
                "day": "Thursday",
                "classes": []
            },
            {
                "day": "Friday",
                "classes": []
            },
            {
                "day": "Saturday",
                "classes": []
            }
        ]

        console.log(res)
        const tt = await timetable.insertOne({ userid: res._id, timetable: timetabled })
        console.log(tt)
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({ status: "success", message: "signed up" })
}
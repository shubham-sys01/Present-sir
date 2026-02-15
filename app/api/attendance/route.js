//fetch the attendance of the student of reach subjects

import { NextResponse } from "next/server"
import { attendances } from "@/models/attendance"
import jwt from "jsonwebtoken"
import { auth } from "@/lib/auth"
import { dbconnect } from "@/lib/mongoconnect"
dbconnect()
export async function GET(req) {
    console.log("attendance")
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect("/")
    }
    const decode = await auth(token)
    const user = await attendances.findOne({ userid: decode.userid })
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 404 })
    }
    const data = user.attendance
    return NextResponse.json({ data: data }, { status: 200 })
}

export async function POST(req) {
    const data = await req.json()
    console.log(data)
    const token = req.cookies.get("token").value;
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    console.log(decode)

    const user = await attendances.findOne({ userid: decode.userid })
    if (!user) {
        const res = await attendances.insertOne({
            userid: decode.userid, attendance: data
        }).exec
        console.log(res);
    }
    else {
        console.log("user already exist")
        console.log(user)
        const existingdata = user.attendance;
        const updateddata = [...existingdata, ...data]
        const update = await attendances.updateOne({ userid: decode.userid }, { attendance: updateddata })
    }
    return NextResponse.json({ status: true }, { status: 200 })
}


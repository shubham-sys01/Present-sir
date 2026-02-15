import { dbconnect } from "@/lib/mongoconnect";
import { timetable } from "@/models/timetable";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { user } from "@/models/user";
try {
    await dbconnect()
} catch (error) {
    console.log(error)
}

export async function POST(req) {
    const res = await req.json();
    console.log(res);
    const token = req.cookies.get("token").value;
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    //find in the db
    const data = await timetable.findOne({ userid : decode.userid})
    if (!data) {
        return NextResponse.json({ message: "user not found", status: false })
    }
    const updatetimetable = await timetable.updateOne({userid : decode.userid, timetable : res })
    console.log(updatetimetable)
    return NextResponse.json(({ status: 200, message : "updated successfully" }))
    // return new NextResponse("hello" ,{status : 500})
}
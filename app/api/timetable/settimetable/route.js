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
    console.log("set timetable")
    const res = await req.json();
    console.log(res);
    const token = req.cookies.get("token").value;
    console.log(token)
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    console.log(decode.userid)
    //find in the db
    const data = await user.findById(decode.userid)
    if (!data) {
        console.log(data)
        return NextResponse.json({ message: "user not found", status: false },{status : 401})
    }
    const updatetimetable = await timetable.updateOne({userid : decode.userid, timetable : res })
    console.log(updatetimetable)
    return NextResponse.json(({ status: 200, message : "updated successfully" }))
    // return new NextResponse("hello" ,{status : 500})
}
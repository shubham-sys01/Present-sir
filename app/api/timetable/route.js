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
    if (!res.day) {
        return NextResponse.json({ message: "Day not passed", status: false })
    }
    const decode = await auth(token);
    //find in the db
    const data = await timetable.findOne({ userid : decode.userid , "timetable.day" : res.day})
    if (!data) {
        return NextResponse.json({ message: "not able to fetch", status: false })
    }
    const final = data.timetable.filter((item)=>{
        return item.day == res.day
    })
    console.log(data)
    return NextResponse.json(({ status: 200, data: final }))
    // return new NextResponse("hello" ,{status : 500})
}

export async function GET(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        console.log("token not given so redirect")
        return NextResponse.json({status : false ,message : "not authorized"},{status :401 })
    }
    const decode = await auth(token)
    const userd = await timetable.findOne({ userid: decode.userid })
    if (!userd) {
        console.log("user not found so redirect")
        return NextResponse.json({status : false ,message : "not authorized"},{status :401 })
    }
    const data = await timetable.findOne({userid : decode.userid});
    console.log(data)
    return NextResponse.json({ data: data }, { status: 200 })
}
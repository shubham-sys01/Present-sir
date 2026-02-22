//fetch the attendance of the student of reach subjects

import { NextResponse } from "next/server"
import { subjects } from "@/models/subjects"

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
    const user = await subjects.findOne({ userid: decode.userid })
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 404 })
    }
    const data = user.attendance
    return NextResponse.json({ data: data }, { status: 200 })
}

export async function POST(req) {
    const data = await req.json()
    console.log(data)
    if(data){
        data["dates"] = [{}]
    }
    console.log(data)
    const token = req.cookies.get("token").value;
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    console.log(decode)

    const user = await subjects.findOne({ userid: decode.userid })
    if (!user) {
        const res = await subjects.insertOne({
            userid: decode.userid, attendance: data
        }).exec
        console.log(res);
    }
    else {
        console.log("user already exist")
        console.log(user)
        const existingdata = user.attendance;
        const updateddata = [...existingdata, ...data]
        const update = await subjects.updateOne({ userid: decode.userid }, { attendance: updateddata })
    }
    return NextResponse.json({ status: true }, { status: 200 })
}

export async function DELETE(req) {
    console.log("delete called")
    const data = await req.json()
    const { subject, code } = data
    const token = req.cookies.get("token").value;
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    console.log(decode)

    const user = await subjects.findOne({ userid: decode.userid })
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 404 })
    }
    const oldsubjects = user.attendance;
    const updatesubjects = oldsubjects.filter((item) => {
        return item.subject != subject && item.code != code;
    })
    try {
        const res = await subjects.updateOne({ userid: decode.userid }, { attendance: updatesubjects })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })

    }
    return NextResponse.json({ message: "updated successfully" }, { status: 200 })

}

export async function PATCH(req) {
    console.log("mark attendance")
    const data = await req.json()
    console.log(data)
    const { subject, code ,status} = data
    const token = req.cookies.get("token").value;
    if (!token) {
        return NextResponse.json({ status: false, msg: "token not available" })
    }
    const decode = await auth(token);
    console.log(decode)

    const user = await subjects.findOne({ userid: decode.userid })
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 404 })
    }
    const regsubjects = user.attendance;
    // const updatesubjects = subjects.map((item) => {
    //     if (item.subject == subject && item.code == code) {
    //         return {
    //             ...item, ["totalclasses"] : item.totalclasses+1  ,["attended classes"] : item["attended classes"] + 1
    //         }
    //     }
    //     else{
    //         return item;
    //     }
    // })
    const targetsub = regsubjects.find(item=> item.subject == subject && item.code == code)
    console.log(targetsub)
    if(targetsub && status == true){
        const date = new Date()
        targetsub["totalclasses"] += 1;
        targetsub["attended classes"] +=1;
        if(!targetsub.dates){
            targetsub.dates = [];
        }
        targetsub.dates.push({"date" : date , "status" : true})
    }
    else if(targetsub && status == false){
       const date = new Date()
        targetsub["totalclasses"] += 1;
        targetsub["absentclasses"] +=1;
        if(!targetsub.dates){
            targetsub.dates = [];
        }
        targetsub.dates.push({"date" : date , "status" : false}) 
    }
    try {
        // const res = await subjects.updateOne({ userid: decode.userid }, { attendance: updatesubjects })
        await user.save()
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })

    }
    return NextResponse.json({ message: "updated successfully" }, { status: 200 })
}

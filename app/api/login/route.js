"use server"
import { user } from "@/models/user";
import { NextResponse } from "next/server"
import { dbconnect } from "@/lib/mongoconnect";
import { gentoken } from "@/lib/gentoken";
import { compare } from "@/lib/hashpass";
dbconnect()
export async function POST(req) {
    const { email, password } = await req.json()
    console.log({ email, password })
    if (!email | !password) {
        return NextResponse.json({ status: false, message: "data missing" })
    }
    const finduser = await user.findOne({ email: email })
    if (!finduser) {
        return NextResponse.json({ status: false, message: "user not found" })
    }
    if(!await compare(password,finduser.password)){
        return NextResponse.json({ status: false, message: "password incorrect" })
    }
    // if (password != finduser.password) {
    //     return NextResponse.json({ status: false, message: "password incorrect" })
    // }
    // console.log("user id : ",finduser._id)
    const userid = finduser._id.toString();
    console.log("userid: ",userid)
    const token = await gentoken(userid)
    const firstlogin = finduser.firstlogin;
    await user.findOneAndUpdate({ email: email }, { firstlogin: false });
    const response = NextResponse.json({ message: "Login success", firstlogin: firstlogin ,username : finduser.username , email : finduser.email});
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/", 
        maxAge: 60 * 60 * 24 * 7,
    });
    return response
}

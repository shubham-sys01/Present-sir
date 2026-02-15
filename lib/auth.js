import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const auth = async(token)=>{
    const decode = jwt.decode(token,"thisismysecretkey")
    if(!token){
        console.log("not authenticated")
        return NextResponse.json({message :"user not authenticated" , status : false})
    }
    return decode;
}
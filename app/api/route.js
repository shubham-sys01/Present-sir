"use server"
import { NextResponse } from "next/server"

import { dbconnect } from "@/lib/mongoconnect";

dbconnect()
export async function POST(req){
    const data = await req.json();
    console.log(data)
    return  NextResponse.json({status : "success" , ...data})
}
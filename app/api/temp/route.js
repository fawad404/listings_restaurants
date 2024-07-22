import { NextResponse } from "next/server";

export function GET(){
    
    console.log("hello world");
    return NextResponse.json("hello world");
}
import { Admin } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const {key,email,password} = await req.json()
    if(key==process.env.key){
        await Admin.create({email,password})
        return NextResponse.json({msg:"admin created"},{status:200})
    }else{
        return NextResponse.json({msg:"Do not have access :("})
    }
}
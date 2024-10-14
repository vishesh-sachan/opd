import { Admin, Bed, Staff } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const beds = await Bed.find({})
        return NextResponse.json({beds},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg:"internal server error"},{status:400})
    }
    
}

export async function POST(req : Request) {
    const {id , number} = await req.json()

    try{
        const isAdmin = await Admin.findOne({_id:id})
        if(isAdmin){
            try{
                await Bed.create({number})
                return NextResponse.json({msg:"Bed Added"},{status:200})
            }catch(e:any){
                return NextResponse.json({msg:"Bed already exists"},{status:400})
            }
        }else{
            return NextResponse.json({msg:"Do Not have Access"},{status:403})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
    
    
}

export async function UPDATE(req:Request) {
    const {id ,bedId, userId} = await req.json()
    
    try{
        const isAdmin = await Admin.findOne({_id:id})
        const isStaff = await Staff.findOne({_id:id})
        if(isAdmin || isStaff){
            try{
                await Bed.updateOne({_id:bedId},{availability:true,to:userId})
                return NextResponse.json({msg:"Bed updated"},{status:200})
            }catch(e){
                console.log(e)
                return NextResponse.json({msg:"Internal Server Error"},{status:400})
            }
        }else{
            return NextResponse.json({msg:"Do Not have Access"},{status:403})
        }
       
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
    
}
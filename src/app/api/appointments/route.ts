import { Admin, Appointments} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    const {doctorId} = await req.json()
    try {
        const appointments = await Appointments.find({_id:doctorId})
        return NextResponse.json({appointments},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg:"internal server error"},{status:400})
    }
    
}

export async function POST(req : Request) {
    const {id , doctorId,userId} = await req.json()

    try{
        const isAdmin = await Admin.findOne({_id:id})
        if(isAdmin){
            try{
                await Appointments.create({doctorId,userId,date:new Date()})
                return NextResponse.json({msg:"Appointments Added"},{status:200})
            }catch(e:any){
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
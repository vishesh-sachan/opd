import { Admin, User } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const user = await User.find({})
        return NextResponse.json(user)
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
}


export async function POST(req : Request) {
    const {username,email,password,phone } = await req.json()    
    try{
        await User.create({ username,email,password,phone})
        return NextResponse.json({msg:"User Added"},{status:200})
    }catch(e:any){
        if(e.errorResponse.code==11000){ 
            console.log(e)
            return NextResponse.json({msg:"staff already exists"},{status:400})
        }else{
            console.log(e)
            return NextResponse.json({msg:"Internal Server Error"},{status:400})
        }
    }
    
    
}

export async function UPDATE(req:Request) {
    const {userId , username,email,password,phone,appointments,admited} = await req.json()
    
    try{
        await User.updateOne({_id:userId},{username,email,password,phone,appointments,admited})
        return NextResponse.json({msg:"details updated"},{status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
}

export async function DELETE(req:Request) {
    const {id , userId} = await req.json()
    try{
        const isAdmin = await Admin.find({_id:id})
        if(!isAdmin){
            return NextResponse.json({msg:"You don not have access!!"},{status:403})
        }else{
            try{
                await User.deleteOne({_id:userId})
                return NextResponse.json({msg:"User Deleted"},{status:200})
            }catch(e:any){
                console.log(e)
                return NextResponse.json({msg:"Internal Server Error"},{status:400})
            }
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
    
}

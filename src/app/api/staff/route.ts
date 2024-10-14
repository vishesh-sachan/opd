import { Admin, Inventory, Staff } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const staff = await Staff.find({})
        return NextResponse.json(staff)
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Intername Server Error"},{status:400})
    }
}


export async function POST(req : Request) {
    const {id ,username,email,password,phone,designation,specification } = await req.json()

    try{
        const isAdmin = await Admin.findOne({_id:id})
        if(isAdmin){
            try{
                await Staff.create({ username,email,password,phone,designation,specification })
                return NextResponse.json({msg:"Staff Added"},{status:200})
            }catch(e:any){
                if(e.errorResponse.code==11000){
                    return NextResponse.json({msg:"staff already exists"},{status:400})
                }
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
    const {id ,staffId,username,email,password,phone,designation,specification} = await req.json()
    
    try{
        const isAdmin = await Admin.findOne({_id:id})
        if(isAdmin){
            try{
                await Staff.updateOne({_id:staffId},{username,email,password,phone,designation,specification})
                return NextResponse.json({msg:"details updated"},{status:200})
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

export async function DELETE(req:Request) {
    const {id , staffId} = await req.json()
    try{
        const isAdmin = await Admin.find({_id:id})
        if(!isAdmin){
            return NextResponse.json({msg:"You don not have access!!"},{status:403})
        }else{
            try{
                await Inventory.deleteOne({_id:staffId})
                return NextResponse.json({msg:"Item Deleted"},{status:200})
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

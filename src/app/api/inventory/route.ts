import { Admin, Inventory, Staff } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const items = await Inventory.find({})
        return NextResponse.json(items)
    }catch(e){
        console.log(e)
        return NextResponse.json({msg:"Internal Server Error"},{status:400})
    }
}


export async function POST(req : Request) {
    const {id , itemName , quantity} = await req.json()

    try{
        const isAdmin = await Admin.findOne({_id:id})
        if(isAdmin){
            try{
                await Inventory.create({itemName,quantity,lastRestocked:new Date()})
                return NextResponse.json({msg:"Item Added"},{status:200})
            }catch(e:any){
                if(e.errorResponse.code==11000){
                    return NextResponse.json({msg:"item already exists"},{status:400})
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
    const {id ,itemId, quantity , removed} = await req.json()
    
    try{
        const isAdmin = await Admin.findOne({_id:id})
        const isStaff = await Staff.findOne({_id:id})
        if(isAdmin || isStaff){
            try{
                if(removed){
                    const res = await Inventory.findById(itemId)
                    const quan = res.quantity - quantity //add condition
                    await Inventory.updateOne({_id:itemId},{quantity:quan})
                    return NextResponse.json({msg:"item updated"},{status:200})
                }else{
                    const res = await Inventory.findById(itemId)
                    const quan = res.quantity + quantity
                    await Inventory.updateOne({_id:itemId},{quantity:quan , lastRestocked: new Date()})
                    return NextResponse.json({msg:"item updated"},{status:200})
        
                }
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
    const {id , itemId} = await req.json()
    try{
        const isAdmin = await Admin.find({_id:id})
        if(!isAdmin){
            return NextResponse.json({msg:"You don not have access!!"},{status:403})
        }else{
            try{
                await Inventory.deleteOne({_id:itemId})
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

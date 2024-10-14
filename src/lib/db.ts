import mongoose from "mongoose";

const DBurl = process.env.MONGODB_CONNECTION_STRING || ''

if (!mongoose.connections[0].readyState) {
    try {
        mongoose.connect(DBurl)

    } catch (error) {
        console.log({ msg: "error while connecting to DB" }, error)
    }

}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    appointments: { type: [] ,default:[]},
    admited: { type:[],default:[]}
})

const StaffSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    specification: { type: String ,default:""},

})

const AdminSchema = new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

const InventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, default: 0 },
    lastRestocked: { type: Number, required: true }
})

const BedSchema = new mongoose.Schema({
    number:{type:String,required:true},
    availability:{type:Boolean,default:false},
    to:{type:String,default:""}
})

const AppointmentsSchema = new mongoose.Schema({
    doctorId:{type:String,required:true},
    userId:{type:String,required:true},
    date:{type:String,required:true}
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
export const Bed = mongoose.models.Bed || mongoose.model('Bed', BedSchema);
export const Appointments = mongoose.models.Appointments || mongoose.model('Appointments', AppointmentsSchema);

// export const User = mongoose.model('User' , UserSchema)
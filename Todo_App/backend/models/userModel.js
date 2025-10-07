import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            minlength:3
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trime:true,
        },
        password:{
            type:String,
            trim:true,
            minlength:6,
            required:true,
        }
    },
    // add created At and updated
    {timestamps:true}
)

   // password hash before save
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model("User",userSchema)
export default User;


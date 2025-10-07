import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcryptjs"

// register function
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields ar required" });
        }
        // check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "users already exists" });
        }

        // create new user
        const newUser = await User.create(
            {
                username,
                email,
                password
            }
        )

        // send response
        res.status(201).json({
            message: "Registered Successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token:generateToken(newUser._id)
            }
        })
    } catch (error) {
          return res.status(500).json({message: "server error", error: error.message})
    }
}


// login function
export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

        // check user registerd
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"please registered then login again!"})
        }

        // campare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password"});
        }

        // genrate token
        const token = generateToken(user._id);

        // response send
        res.json({
            message:"logged in successfully",
            user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            token
            }
        })
    } catch (error) {
        return res.status(500).json({message:"server error", error: error.message})
    }
}

// logout function
export const logoutUser = (req,res)=>{
    try {
        res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict', 
    })
    
    // response send
    res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:"server error", error:error.message})
    }
    
}


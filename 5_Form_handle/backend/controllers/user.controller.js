import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// register controller
export const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        user.password = undefined;
        res.status(201).json({
            message: "User Registered Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "User Registration Failed",
            err: error.message
        });
    }
}

// login controller
export const loginUser = async (req, res) => {
    try {
        const {password,email} = req.body
        const user = await User.findOne({ email }).select("+password");
        // console.log(user);
        if (!user.email) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "password wrong"
            })
        }
        // jwt token generate
        const token = jwt.sign(
            { id: user._id },
            process.env.jWT_SECRET,
            { expiresIn: "1d" }
        )
        res.status(200).json({
            message: "User Logged In Successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "User Login Failed",
            error
        })
    }
}

// Get All Users controller
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users)
        res.status(200).json({
            message: "Users Fetched Successfully",
            users
        },)
    } catch (error) {
        res.status(400).json({
            message: "Users Fetch Failed",
            error
        })
    }
}




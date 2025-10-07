import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
    try {
        // token already attach with auth middleware 
        const token = req.token;
       
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

        // token verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // User fetch aur password field ko exclude karo
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found",
            });
        }

        // Attach user object to request
        req.user = user;

        next();

    } catch (error) {
        // console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Not authorized, token is invalid or expired" });
    }
}

export default protect;
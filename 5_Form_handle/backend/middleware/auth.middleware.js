import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided"})
    }
    // token extract
    const token = authHeader.split(" ")[1];
    // console.log(token)
    try {
        const decoded = jwt.verify(token,process.env.jWT_SECRET);
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({message:"invalid token", status: 500})
    }
}

export default authMiddleware;
import jwt from "jsonwebtoken"

const generateToken = (id)=>{
    return jwt.sign(
        {id}, // payload (user info)
        process.env.JWT_SECRET, // secret key
        {expiresIn:"3d"}  // expiry time
    )
}

export default generateToken


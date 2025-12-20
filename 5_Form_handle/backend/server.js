import express from "express";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/api/user", userRouter)

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port ", PORT);
    })
})
.catch((error)=>{
    console.log(`server error: ${error}`);
})


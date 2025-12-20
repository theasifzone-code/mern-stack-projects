import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import fileUpload from "./routes/fileUpload.route.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json()); // to accept json data
app.use("/uploadFile", fileUpload);


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => console.log(error));
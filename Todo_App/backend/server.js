import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const url = process.env.MONGO_URI;
mongoose.connect(url)
    .then(() => {
        console.log("database connected succesfully")
    })
    .catch((err) => {
        console.error(`connection error: ${err}`)
    })

// Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
})

// Task Model
const Task = mongoose.model("Task", taskSchema,"todo-app");

// Api EndPoints

// new task added
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        return res.json(newTask);
    } catch (error) {
        return res.json({ message: error.message });
    }
})

// get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const task = await Task.find();
        return res.json(task);
    } catch (error) {
        return res.json({ message: error.message });
    }
})
// update task
app.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedTask) return res.status(404).json({ message: "Task not found." });
        return res.json(updatedTask);
    } catch (error) {
        return res.json({ message: error.message });
    }
})

// delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found." });
        return res.json({ message: "Task deleted successfully." });
    } catch (error) {
        return res.json({ message: error.message })
    }
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})

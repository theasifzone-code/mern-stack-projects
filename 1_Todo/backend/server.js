import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";

// --- Custom Error Handling Imports ---
import { notFound, errorHandler } from "./middleware/error.js";

// Load .env file
dotenv.config();

const app = express();

// --- Core Middlewares ---
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable CORS for all origins

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello, Todo backend API is running...");
});

// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/apikeys", apiKeyRoutes);

// --- Error Handling Middlewares ---
app.use(notFound);     // 404 Not Found
app.use(errorHandler); // Global Error Handler

// --- Start Server with DB Connection ---
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
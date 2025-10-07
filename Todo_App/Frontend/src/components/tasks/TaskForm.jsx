import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaCheckCircle, FaPlus, FaSpinner } from "react-icons/fa";

// TaskForm Component 
const TaskForm = ({ onTaskAdded }) => {
    // Form fields
    const [title, setTitle] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    // UI states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState("");

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!title.trim()) {
            setLocalError("Task title cannot be empty.");
            return;
        }
        if (title.trim().length < 3) {
            setLocalError("Task title must be at least 3 characters long.");
            return;
        }

        setIsSubmitting(true);
        setLocalError("");

        try {
            // ✅ API call
            const { data } = await axiosInstance.post("/tasks", {
                title: title.trim(),
                completed: isCompleted,
            });

            // ✅ Normalize backend response
            const createdTask = data?.task || data?.data || data;

            // ✅ Immediately update UI via parent callback
            if (createdTask && typeof onTaskAdded === "function") {
                onTaskAdded(createdTask);
            } else {
                console.warn("No valid task data returned. Falling back to refetch.");
            }

            toast.success("Task created successfully!");
            setTitle("");
            setIsCompleted(false);
        } catch (err) {
            console.error("Task creation error:", err);
            const message =
                err.response?.data?.message || "Something went wrong while creating task.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-indigo-100 p-5 sm:p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FaPlus className="text-indigo-600 hidden sm:block" /> Create New Task
            </h3>

            {/* Local validation error */}
            {localError && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mb-4 font-semibold border border-red-200">
                    {localError}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Title input */}
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="title"
                        className="text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="write task "
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setLocalError("");
                        }}
                        disabled={isSubmitting}
                        required
                        className={`w-full px-4 py-3 text-base border ${localError ? "border-red-400" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all duration-200 shadow-inner placeholder-gray-400`}
                    />
                </div>

                {/* Checkbox + Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    {/* Checkbox */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 w-full sm:w-auto">
                        <input
                            id="completed"
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                            className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor="completed"
                            className="text-gray-700 font-medium text-sm sm:text-base select-none flex items-center gap-1"
                        >
                            <FaCheckCircle className="text-green-500 hidden sm:block" />
                            Mark as completed
                        </label>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || title.trim().length < 3}
                        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white flex justify-center items-center gap-2 shadow-md transition-all duration-200 ${isSubmitting
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03]"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <FaSpinner className="animate-spin" /> Adding...
                            </>
                        ) : (
                            <>
                                <FaPlus /> Add Task
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;

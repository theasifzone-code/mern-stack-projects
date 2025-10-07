import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import TaskItem from '../../components/tasks/TaskItem';
import TaskForm from '../../components/tasks/TaskForm';
import { toast } from 'react-toastify';
import { FaPlus, FaTasks } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

// DashboardScreen
const DashboardScreen = () => {
  const [tasks, setTasks] = useState([]); // Task list
  const [isLoading, setIsLoading] = useState(true); // Loading spinner state
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle for task form
  const { user } = useAuth(); // User details from context

  // Fetch all user tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/tasks');
      const fetchedTasks = response.data.tasks || response.data.data || response.data;
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch tasks.');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on first render
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = (createdTask) => {
    if (!createdTask || !createdTask._id) {
      // fallback: re-fetch if invalid
      fetchTasks();
      return;
    }

    // Instantly update UI with new task at the top
    setTasks((prevTasks) => [createdTask, ...prevTasks]);
    setIsFormVisible(false);
  };


  // Delete a task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.info('Task deleted successfully.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  // Update (toggle) task status
  const handleUpdateTask = async (taskId, currentCompletedStatus) => {
    const newStatus = !currentCompletedStatus;
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, {
        completed: newStatus,
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? response.data : task))
      );
      toast.success(`Task marked as ${newStatus ? 'completed' : 'incomplete'}.`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task.');
    }
  };

  // Loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <p className="text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading your tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8 py-8">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl px-6 py-8 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Hello, <span className="text-yellow-300">{user?.username || 'User'}</span> 👋
          </h1>
          <p className="text-indigo-100 mt-2 text-sm sm:text-base">
            Manage your tasks and boost your productivity effortlessly.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold py-2.5 px-5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.05]"
          >
            <FaPlus />
            {isFormVisible ? 'Hide Form' : 'Add Task'}
          </button>
        </div>
      </div>

      {/* Task Form */}
      {isFormVisible && (
        <div className="mb-10 animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-indigo-100">
            <TaskForm onTaskAdded={handleAddTask} />
          </div>
        </div>
      )}

      {/* Task Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center sm:justify-start">
          <FaTasks className="mr-2 text-indigo-600" /> Your Tasks
        </h2>
      </div>

      {/* Task List Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-indigo-300 rounded-2xl bg-white/70 backdrop-blur-sm shadow-inner text-center">
            <p className="text-lg sm:text-xl font-medium text-gray-600 mb-2">
              No tasks yet!
            </p>
            <p className="text-sm text-gray-500">
              Tap “Add Task” above to create your first one 🚀
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleComplete={handleUpdateTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;

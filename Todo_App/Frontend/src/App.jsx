import { useState, useEffect } from 'react';

function App() {
  // usestate create
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

// api url
  const API_URL = 'http://localhost:3000/tasks';
// useEffect hook use to fetch data from api
  useEffect(() => {
    fetchTasks();
  }, []); 

// get all tasks
  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    setTasks(tasks);
  };
// add new task
  const handleAddTask = async () => {
    if (newTask.trim() === '') return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    });
    setNewTask('');
    fetchTasks();
  };
// delete task
  const handleDeleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };
// check task completed
  const handleToggleCompleted = async (task) => {
    await fetch(`${API_URL}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">React To-Do App</h1>
        <div className="flex space-x-2 mb-4">
          {/* input field */}
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTask()} placeholder="Add a task" className="flex-1 p-2 border border-gray-300 rounded"/>
          {/* add task button */}
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Add Task
          </button>
        </div>
        {/* task list */}
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task._id} className={`flex justify-between items-center p-3 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <span className={`${task.completed ? 'line-through text-gray-500': 'text-gray-800'}`}>
                {task.title}
              </span>
              <div className="flex space-x-2">
              <button onClick={() => handleToggleCompleted(task)} className={`bg-green-500 font-bold text-white px-3 py-1 rounded cursor-pointer `}>{task.completed?"uncomplete":"complete"}</button>
              <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
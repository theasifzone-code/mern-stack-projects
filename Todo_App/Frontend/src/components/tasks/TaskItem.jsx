import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// TaskItem Component 
const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  // Container style (dynamic based on completion)
  const itemClasses = `
    flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6
    p-4 rounded-2xl border transition-all duration-300
    ${task.completed 
      ? 'bg-green-50 border-green-600 hover:bg-green-100' 
      : 'bg-white border-indigo-300 hover:bg-indigo-50'}
    hover:shadow-md active:scale-[0.99]
  `;

  // Title style
  const titleClasses = `
    text-base sm:text-lg font-semibold break-words
    ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}
  `;

  // Format date
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={itemClasses}>
      {/* Info Section */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => onToggleComplete(task._id, task.completed)}
        title="Click to toggle completion"
      >
        <p className={titleClasses}>{task.title}</p>
        <p className="text-xs text-gray-400 mt-1 sm:mt-0">
          Created on: {formattedDate}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">
        {/* Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(task._id, task.completed);
          }}
          className={`p-2 sm:p-3 rounded-full transition-all duration-200 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1
            ${task.completed
              ? 'text-red-600 bg-red-100 hover:bg-red-200 focus:ring-red-300'
              : 'text-green-600 bg-green-100 hover:bg-green-200 focus:ring-green-300'}
          `}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <FaTimesCircle size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <FaCheckCircle size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="p-2 sm:p-3 text-gray-500 bg-gray-100 rounded-full 
            hover:bg-red-100 hover:text-red-600 transition-all duration-200 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-300"
          aria-label="Delete task"
        >
          <FaTrash size={16} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

// Type checking
TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;

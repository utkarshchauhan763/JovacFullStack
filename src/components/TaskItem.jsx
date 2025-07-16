import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <div className={`
      group p-4 border rounded-lg transition-all duration-300
      ${task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200 hover:border-blue-300'
      }
      ${isDeleting ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
    `}>
      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            disabled={task.completed}
            className={`
              w-5 h-5 rounded border-2 transition-all duration-200
              ${task.completed 
                ? 'bg-green-500 border-green-500 cursor-not-allowed' 
                : 'border-gray-300 hover:border-blue-500 cursor-pointer'
              }
            `}
          />
          {task.completed && (
            <span className="ml-2 text-green-600 font-bold">✓</span>
          )}
        </label>

        <div className="flex-1 min-w-0">
          <p className={`
            text-sm font-medium transition-all duration-200
            ${task.completed 
              ? 'text-green-700 line-through opacity-75' 
              : 'text-gray-800'
            }
          `}>
            {task.text}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            📅 {task.createdAt}
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="
            opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 
            hover:bg-red-50 rounded-lg transition-all duration-200
            focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500
          "
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
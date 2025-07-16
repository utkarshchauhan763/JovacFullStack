import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskText.trim().length === 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    
    onAddTask(taskText);
    setTaskText('');
  };

  const isInputValid = taskText.trim().length > 0 && taskText.length <= 50;
  const remainingChars = 50 - taskText.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ➕ Add New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What needs to be done? ✍️"
              maxLength={50}
              className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200 outline-none border-gray-300
                ${isShaking ? 'animate-pulse border-red-500' : ''}
                ${taskText.length > 40 ? 'border-yellow-400' : ''}
              `}
            />
            
            <div className={`
              absolute right-3 top-3 text-sm
              ${remainingChars < 10 ? 'text-red-500' : 'text-gray-400'}
            `}>
              {remainingChars}
            </div>
          </div>
          
          {taskText.length > 40 && (
            <p className="text-yellow-600 text-sm mt-1">
              ⚠️ {remainingChars} characters remaining
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isInputValid}
          className={`
            w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
            ${isInputValid
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isInputValid ? '🚀 Add Task' : '🔒 Enter a task to continue'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
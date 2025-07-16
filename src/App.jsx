import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  // Add new task
  const addTask = (taskText) => {
    if (taskText.trim().length === 0) return;
    
    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    showMessage('✅ Task added successfully!', 'success');
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    showMessage('🎉 Task completed!', 'success');
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    showMessage('🗑️ Task deleted!', 'info');
  };

  // Show message
  const showMessage = (msg, type) => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  // Get pending and completed tasks
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Task Manager
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done!
          </p>
        </div>

        {/* Success/Info Messages */}
        {message && (
          <div className={`
            mb-6 p-4 rounded-lg text-center font-medium transition-all duration-300
            ${message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-blue-100 text-blue-800 border border-blue-200'
            }
          `}>
            {message.text}
          </div>
        )}

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingTasks.length}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Tasks */}
          <TaskList
            title="⏳ Pending Tasks"
            tasks={pendingTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            emptyMessage="🎉 No pending tasks! Great job!"
            cardStyle="bg-white border-l-4 border-orange-400"
          />

          {/* Completed Tasks */}
          <TaskList
            title="✅ Completed Tasks"
            tasks={completedTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            emptyMessage="📋 No completed tasks yet."
            cardStyle="bg-white border-l-4 border-green-400"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

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
      createdAt: new Date().toLocaleString(),
      priority: 'medium'
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
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      showMessage('🎉 Task completed!', 'success');
    } else {
      showMessage('↩️ Task marked as pending', 'info');
    }
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    showMessage('🗑️ Task deleted!', 'error');
  };

  // Edit task
  const editTask = (taskId, newText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, text: newText.trim() }
          : task
      )
    );
    showMessage('✏️ Task updated!', 'info');
  };

  // Show message
  const showMessage = (msg, type) => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    showMessage(`🧹 Cleared ${completedCount} completed tasks!`, 'info');
  };

  // Get filtered tasks
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">
            📝 Task Manager
          </h1>
          <p className="subtitle">
            Stay organized and get things done!
          </p>
        </header>

        {/* Success/Info Messages */}
        {message && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Task Statistics */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-number">{pendingTasks.length}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card stat-completed">
            <div className="stat-number">{completedTasks.length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {/* Clear Completed Button */}
        {completedTasks.length > 0 && (
          <div className="clear-section">
            <button 
              onClick={clearCompleted}
              className="clear-btn"
            >
              🧹 Clear {completedTasks.length} Completed Task{completedTasks.length !== 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* Task Lists */}
        <div className="task-sections">
          {/* Pending Tasks */}
          <TaskList
            title="⏳ Pending Tasks"
            tasks={pendingTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            emptyMessage="🎉 No pending tasks! Great job!"
            className="pending-section"
          />

          {/* Completed Tasks */}
          <TaskList
            title="✅ Completed Tasks"
            tasks={completedTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            emptyMessage="📋 No completed tasks yet."
            className="completed-section"
          />
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Made with ❤️ using React + Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import TaskItem from './TaskItem';

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

  const isInputValid = taskText.trim().length > 0 && taskText.length <= 100;
  const remainingChars = 100 - taskText.length;

  return (
    <div className="task-form">
      <h2 className="form-title">
        ➕ Add New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What needs to be done? ✍️"
              maxLength={100}
              className={`task-input ${isShaking ? 'shake' : ''} ${taskText.length > 80 ? 'warning' : ''}`}
            />
            
            <div className={`char-counter ${remainingChars < 20 ? 'warning' : ''}`}>
              {remainingChars}
            </div>
          </div>
          
          {taskText.length > 80 && (
            <p className="warning-text">
              ⚠️ {remainingChars} characters remaining
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isInputValid}
          className={`submit-btn ${isInputValid ? 'active' : 'disabled'}`}
        >
          {isInputValid ? '🚀 Add Task' : '🔒 Enter a task to continue'}
        </button>
      </form>
    </div>
  );
};

const TaskList = ({ 
  title, 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask,
  emptyMessage, 
  className 
}) => {
  return (
    <div className={`task-list ${className}`}>
      <h2 className="list-title">
        {title} ({tasks.length})
      </h2>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-message">
            {emptyMessage}
          </div>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskForm;
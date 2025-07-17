import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const handleEdit = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onEdit(task.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'} ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-content">
        {/* Checkbox */}
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="task-checkbox"
          />
          <span className="checkmark">
            {task.completed && <span className="check-icon">✓</span>}
          </span>
        </label>

        {/* Task Text */}
        <div className="task-details">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              className="edit-input"
              autoFocus
              maxLength={100}
            />
          ) : (
            <p className={`task-text ${task.completed ? 'completed-text' : ''}`}>
              {task.text}
            </p>
          )}
          <p className="task-meta">
            📅 {task.createdAt}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="task-actions">
          {!task.completed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit-btn"
              title="Edit task"
            >
              ✏️
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className="action-btn delete-btn"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
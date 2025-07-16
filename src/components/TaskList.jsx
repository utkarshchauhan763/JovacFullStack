import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  title, 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  emptyMessage, 
  cardStyle 
}) => {
  return (
    <div className={`${cardStyle} rounded-lg shadow-lg p-6`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {title} ({tasks.length})
      </h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">
            {emptyMessage}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
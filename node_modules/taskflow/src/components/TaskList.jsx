import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

export default function TaskList({
  tasks,
  totalTasksCount,
  onToggleComplete,
  onOpenEdit,
  onOpenDelete,
  onResetFilters,
  onFocusAddForm,
  hasActiveFilters
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        isFilterEmpty={totalTasksCount > 0 && hasActiveFilters}
        onResetFilters={onResetFilters}
        onFocusAddForm={onFocusAddForm}
      />
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span className="task-list-summary">
          Showing <strong>{tasks.length}</strong> {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="task-cards-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onOpenEdit={onOpenEdit}
            onOpenDelete={onOpenDelete}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import EmptyState from '../EmptyState/EmptyState';
import { useTasks } from '../../hooks/useTasks';

export default function TaskList() {
  const {
    filteredTasks,
    tasks,
    reorderTasks,
    hasActiveFilters,
    resetFilters,
    setIsQuickAddOpen,
    currentView
  } = useTasks();

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent or ghost image
    try {
      e.dataTransfer.setData('text/plain', index);
    } catch {
      // ignore
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    // Map index in filteredTasks to tasks array if filtering is not active
    // If not filtered, reorder directly in tasks
    if (!hasActiveFilters && currentView === 'tasks') {
      reorderTasks(draggedIndex, targetIndex);
    } else {
      // Find source task and target task
      const sourceTask = filteredTasks[draggedIndex];
      const targetTask = filteredTasks[targetIndex];
      if (sourceTask && targetTask) {
        const sourceOriginalIdx = tasks.findIndex((t) => t.id === sourceTask.id);
        const targetOriginalIdx = tasks.findIndex((t) => t.id === targetTask.id);
        if (sourceOriginalIdx !== -1 && targetOriginalIdx !== -1) {
          reorderTasks(sourceOriginalIdx, targetOriginalIdx);
        }
      }
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        isFilterEmpty={tasks.length > 0 && hasActiveFilters}
        currentView={currentView}
        onResetFilters={resetFilters}
        onCreateTask={() => setIsQuickAddOpen(true)}
      />
    );
  }

  return (
    <div className="task-list-wrapper">
      <div className="task-list-header-info">
        <span className="task-count-label">
          Showing <strong>{filteredTasks.length}</strong> {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
        <span className="drag-hint-label">Tip: Drag tasks to reorder</span>
      </div>

      <div className="task-cards-stack" role="list">
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            isDragging={draggedIndex === index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

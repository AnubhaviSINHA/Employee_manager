import React from 'react';
import { ClipboardList, SearchX, CheckCircle, Plus, RotateCcw } from 'lucide-react';

export default function EmptyState({ isFilterEmpty, currentView, onResetFilters, onCreateTask }) {
  if (isFilterEmpty) {
    return (
      <div className="empty-state-box">
        <div className="empty-icon-circle icon-muted">
          <SearchX size={28} />
        </div>
        <h3 className="empty-state-heading">No tasks found</h3>
        <p className="empty-state-text">
          No tasks matched your current search query or active filter combination.
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm empty-action-btn"
          onClick={onResetFilters}
        >
          <RotateCcw size={14} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  if (currentView === 'completed') {
    return (
      <div className="empty-state-box">
        <div className="empty-icon-circle icon-success-soft">
          <CheckCircle size={28} />
        </div>
        <h3 className="empty-state-heading">No completed tasks yet</h3>
        <p className="empty-state-text">
          Completed tasks will appear here as you finish your work.
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state-box">
      <div className="empty-icon-circle icon-primary-soft">
        <ClipboardList size={28} />
      </div>
      <h3 className="empty-state-heading">You&apos;re all caught up! 🎉</h3>
      <p className="empty-state-text">
        Create a task to get started and organize your day.
      </p>
      <button
        type="button"
        className="btn btn-primary empty-action-btn"
        onClick={onCreateTask}
      >
        <Plus size={16} />
        <span>Create Task</span>
      </button>
    </div>
  );
}

import React from 'react';

export default function EmptyState({ isFilterEmpty, onResetFilters, onFocusAddForm }) {
  if (isFilterEmpty) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-title">No matching tasks</h3>
        <p className="empty-description">
          We couldn't find any tasks matching your search query or filters.
        </p>
        <button
          type="button"
          className="btn btn-secondary empty-action-btn"
          onClick={onResetFilters}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn-icon"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state-card">
      <div className="empty-icon-wrapper">
        <svg
          className="empty-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <h3 className="empty-title">No tasks yet</h3>
      <p className="empty-description">
        Create your first task and start being productive.
      </p>
      <button
        type="button"
        className="btn btn-primary empty-action-btn"
        onClick={onFocusAddForm}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="btn-icon"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>+ Add Task</span>
      </button>
    </div>
  );
}

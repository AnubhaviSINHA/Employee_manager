import React from 'react';

export default function TaskCard({
  task,
  onToggleComplete,
  onOpenEdit,
  onOpenDelete
}) {
  const { id, title, description, priority, dueDate, completed, createdAt } = task;

  // Format the due date nicely, e.g. "28 Oct 2026"
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      // Split YYYY-MM-DD to avoid timezone shifting
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      const date = new Date(year, parseInt(month, 10) - 1, day);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Check if date is overdue or due today for pending tasks
  const getDateStatus = (dateStr) => {
    if (!dateStr || completed) return null;
    try {
      const [year, month, day] = dateStr.split('-');
      const taskDate = new Date(year, parseInt(month, 10) - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      taskDate.setHours(0, 0, 0, 0);

      const diffTime = taskDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return { label: 'Overdue', className: 'date-badge-overdue' };
      if (diffDays === 0) return { label: 'Due Today', className: 'date-badge-today' };
      if (diffDays === 1) return { label: 'Due Tomorrow', className: 'date-badge-upcoming' };
      return null;
    } catch {
      return null;
    }
  };

  const formattedDate = formatDueDate(dueDate);
  const dateStatus = getDateStatus(dueDate);

  const getPriorityBadgeClass = (p) => {
    switch (p?.toLowerCase()) {
      case 'high':
        return 'badge-priority-high';
      case 'low':
        return 'badge-priority-low';
      case 'medium':
      default:
        return 'badge-priority-medium';
    }
  };

  return (
    <div className={`task-card ${completed ? 'task-completed' : ''}`}>
      <div className="task-card-left">
        <label className="checkbox-container" title={completed ? "Mark pending" : "Mark completed"}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete(id)}
            className="task-checkbox-input"
            aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'completed'}`}
          />
          <span className="custom-checkbox">
            <svg
              className="checkbox-check-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </label>
      </div>

      <div className="task-card-content">
        <div className="task-header-row">
          <h4 className="task-title" title={title}>
            {title}
          </h4>
          <div className="task-badges">
            <span className={`priority-badge ${getPriorityBadgeClass(priority)}`}>
              <span className="priority-dot" />
              {priority ? priority.toUpperCase() : 'MEDIUM'}
            </span>
          </div>
        </div>

        {description && (
          <p className="task-description">{description}</p>
        )}

        <div className="task-meta-row">
          {formattedDate && (
            <div className="task-due-date">
              <svg
                className="meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Due: {formattedDate}</span>
              {dateStatus && (
                <span className={`due-status-pill ${dateStatus.className}`}>
                  {dateStatus.label}
                </span>
              )}
            </div>
          )}

          {!formattedDate && (
            <span className="task-no-due">No due date</span>
          )}
        </div>
      </div>

      <div className="task-card-actions">
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={() => onOpenEdit(task)}
          aria-label={`Edit task "${title}"`}
          title="Edit task"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="action-icon"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => onOpenDelete(task)}
          aria-label={`Delete task "${title}"`}
          title="Delete task"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="action-icon"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}

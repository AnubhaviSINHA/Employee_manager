import React, { useState } from 'react';

export default function TaskForm({ onAddTask, formRef }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required. Please enter a title.');
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className="task-form-card" id="add-task-section" ref={formRef}>
      <div className="form-card-header">
        <div className="form-header-title-group">
          <svg
            className="form-header-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <h3 className="form-title">Create New Task</h3>
        </div>
        <span className="form-hint">Fill in the task details</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Task Title <span className="required-star">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className={`form-input ${error ? 'input-error' : ''}`}
            placeholder="e.g., Finalize presentation slides..."
            value={title}
            onChange={handleTitleChange}
            maxLength={120}
          />
          {error && (
            <div className="form-error-msg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="error-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Description Textarea */}
        <div className="form-group">
          <label htmlFor="task-description" className="form-label">
            Description <span className="optional-tag">(optional)</span>
          </label>
          <textarea
            id="task-description"
            className="form-textarea"
            rows="2"
            placeholder="Add relevant notes, links, or context for this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Priority & Due Date Row */}
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="task-priority" className="form-label">
              Priority
            </label>
            <div className="select-wrapper">
              <select
                id="task-priority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
            </div>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-due-date" className="form-label">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary submit-task-btn">
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
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
}

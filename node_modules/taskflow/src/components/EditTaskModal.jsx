import React, { useState, useEffect } from 'react';

export default function EditTaskModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Sync state with selected task
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'Medium');
      setDueDate(task.dueDate || '');
      setError('');
    }
  }, [task, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <svg
              className="modal-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <h3 className="modal-title">Edit Task</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="edit-task-title" className="form-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="edit-task-title"
                type="text"
                className={`form-input ${error ? 'input-error' : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error && e.target.value.trim()) setError('');
                }}
                maxLength={120}
                autoFocus
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

            {/* Description */}
            <div className="form-group">
              <label htmlFor="edit-task-desc" className="form-label">
                Description <span className="optional-tag">(optional)</span>
              </label>
              <textarea
                id="edit-task-desc"
                className="form-textarea"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Priority & Due Date */}
            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="edit-task-priority" className="form-label">
                  Priority
                </label>
                <div className="select-wrapper">
                  <select
                    id="edit-task-priority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🔴 High</option>
                  </select>
                </div>
              </div>

              <div className="form-group flex-1">
                <label htmlFor="edit-task-due" className="form-label">
                  Due Date
                </label>
                <input
                  id="edit-task-due"
                  type="date"
                  className="form-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

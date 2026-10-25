import React, { useState, useEffect } from 'react';
import { X, Edit3, AlertCircle, Flag, Tag, Calendar } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { CATEGORIES, PRIORITIES } from '../../utils/taskUtils';

export default function EditTaskModal() {
  const { editingTask, setEditingTask, editTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Project');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setCategory(editingTask.category || 'Project');
      setDueDate(editingTask.dueDate || '');
      setError('');
    }
  }, [editingTask]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && editingTask) {
        setEditingTask(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingTask, setEditingTask]);

  if (!editingTask) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    editTask({
      ...editingTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate
    });

    setEditingTask(null);
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setEditingTask(null)}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="modal-title">Edit Task</h3>
              <p className="modal-subtitle">Modify task details and schedule</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setEditingTask(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="edit-task-title-inp" className="form-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="edit-task-title-inp"
                type="text"
                className={`form-input ${error ? 'input-error' : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error && e.target.value.trim()) setError('');
                }}
                maxLength={140}
                autoFocus
              />
              {error && (
                <div className="form-error-msg">
                  <AlertCircle size={14} className="error-icon" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="edit-task-desc-inp" className="form-label">
                Description <span className="optional-tag">(optional)</span>
              </label>
              <textarea
                id="edit-task-desc-inp"
                className="form-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Row: Priority, Category, Due Date */}
            <div className="form-grid-3">
              <div className="form-group">
                <label htmlFor="edit-task-priority-sel" className="form-label flex-label">
                  <Flag size={13} />
                  <span>Priority</span>
                </label>
                <select
                  id="edit-task-priority-sel"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p === 'High' ? '🔴 High' : p === 'Medium' ? '🟡 Medium' : '🟢 Low'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-task-cat-sel" className="form-label flex-label">
                  <Tag size={13} />
                  <span>Category</span>
                </label>
                <select
                  id="edit-task-cat-sel"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-task-date-inp" className="form-label flex-label">
                  <Calendar size={13} />
                  <span>Due Date</span>
                </label>
                <input
                  id="edit-task-date-inp"
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
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

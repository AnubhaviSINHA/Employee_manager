import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Calendar, Tag, Flag } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { CATEGORIES, PRIORITIES } from '../../utils/taskUtils';

export default function TaskForm({ onSuccess, isModal = false }) {
  const { addTask, preferences } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(preferences.defaultPriority || 'Medium');
  const [category, setCategory] = useState(preferences.defaultCategory || 'Project');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required. Please enter a title.');
      return;
    }

    addTask({
      title,
      description,
      priority,
      category,
      dueDate
    });

    // Reset fields
    setTitle('');
    setDescription('');
    setPriority(preferences.defaultPriority || 'Medium');
    setCategory(preferences.defaultCategory || 'Project');
    setDueDate('');
    setError('');

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      {/* Task Title */}
      <div className="form-group">
        <label htmlFor="task-title-input" className="form-label">
          Task Title <span className="required-star">*</span>
        </label>
        <input
          id="task-title-input"
          type="text"
          className={`form-input ${error ? 'input-error' : ''}`}
          placeholder="e.g., Finalize presentation slides..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error && e.target.value.trim()) setError('');
          }}
          maxLength={140}
          autoFocus={isModal}
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
        <label htmlFor="task-desc-input" className="form-label">
          Description <span className="optional-tag">(optional)</span>
        </label>
        <textarea
          id="task-desc-input"
          className="form-textarea"
          rows={isModal ? 3 : 2}
          placeholder="Add details, links, or notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Grid: Priority, Category, Due Date */}
      <div className="form-grid-3">
        {/* Priority */}
        <div className="form-group">
          <label htmlFor="task-priority-select" className="form-label flex-label">
            <Flag size={13} />
            <span>Priority</span>
          </label>
          <select
            id="task-priority-select"
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

        {/* Category */}
        <div className="form-group">
          <label htmlFor="task-cat-select" className="form-label flex-label">
            <Tag size={13} />
            <span>Category</span>
          </label>
          <select
            id="task-cat-select"
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

        {/* Due Date */}
        <div className="form-group">
          <label htmlFor="task-date-input" className="form-label flex-label">
            <Calendar size={13} />
            <span>Due Date</span>
          </label>
          <input
            id="task-date-input"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-submit-full">
          <PlusCircle size={16} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}

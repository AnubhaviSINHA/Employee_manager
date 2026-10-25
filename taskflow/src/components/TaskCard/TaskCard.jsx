import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  CheckCircle2,
  Circle,
  GripVertical,
  Flag,
  Tag
} from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { formatDate, getDueDateStatus } from '../../utils/dateUtils';

export default function TaskCard({
  task,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging
}) {
  const {
    toggleComplete,
    setEditingTask,
    setDeletingTask,
    duplicateTask,
    setDetailsTask
  } = useTasks();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close 3-dot dropdown menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const { id, title, description, priority, category, dueDate, completed } = task;
  const dueStatus = getDueDateStatus(dueDate, completed);

  const handleCardClick = (e) => {
    // Prevent opening modal when clicking checkbox, buttons, or menu
    if (
      e.target.closest('.task-checkbox-container') ||
      e.target.closest('.card-menu-container') ||
      e.target.closest('.drag-handle')
    ) {
      return;
    }
    setDetailsTask(task);
  };

  return (
    <div
      className={`task-card ${completed ? 'task-completed' : ''} ${isDragging ? 'task-dragging' : ''}`}
      onClick={handleCardClick}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      role="listitem"
    >
      {/* Drag Grip Handle */}
      <div
        className="drag-handle"
        title="Drag to reorder task"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={16} />
      </div>

      {/* Checkbox */}
      <div className="task-checkbox-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          className={`custom-checkbox-btn ${completed ? 'checked' : ''}`}
          onClick={() => toggleComplete(id)}
          title={completed ? 'Mark as in progress' : 'Mark as completed'}
        >
          {completed ? (
            <CheckCircle2 size={19} className="check-icon-active" />
          ) : (
            <Circle size={19} className="check-icon-idle" />
          )}
        </button>
      </div>

      {/* Main Task Content */}
      <div className="task-card-main">
        <div className="task-header-row">
          <h4 className={`task-title ${completed ? 'completed-text' : ''}`}>
            {title}
          </h4>

          {/* Badges */}
          <div className="task-badges-row">
            {category && (
              <span className="badge-category-pill">
                <Tag size={10} />
                <span>{category.toUpperCase()}</span>
              </span>
            )}
            <span className={`badge-priority-pill priority-${priority?.toLowerCase()}`}>
              <Flag size={10} />
              <span>{priority?.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {description && (
          <p className="task-desc-preview">{description}</p>
        )}

        <div className="task-footer-meta">
          {dueDate && (
            <div className="due-date-meta">
              <Calendar size={13} className="meta-icon" />
              <span>{formatDate(dueDate)}</span>
              {dueStatus && (
                <span className={`due-badge ${dueStatus.badgeClass}`}>
                  {dueStatus.label}
                </span>
              )}
            </div>
          )}

          {!dueDate && (
            <span className="no-due-text">No due date</span>
          )}
        </div>
      </div>

      {/* 3-Dot Action Menu */}
      <div className="card-menu-container" ref={menuRef} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="card-menu-trigger-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Task options"
          title="More options"
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <div className="card-dropdown-menu">
            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setMenuOpen(false);
                setEditingTask(task);
              }}
            >
              <Edit2 size={14} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setMenuOpen(false);
                duplicateTask(task);
              }}
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </button>

            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setMenuOpen(false);
                toggleComplete(id);
              }}
            >
              <CheckCircle2 size={14} />
              <span>{completed ? 'Mark In Progress' : 'Mark Complete'}</span>
            </button>

            <div className="dropdown-divider" />

            <button
              type="button"
              className="dropdown-menu-item item-danger"
              onClick={() => {
                setMenuOpen(false);
                setDeletingTask(task);
              }}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

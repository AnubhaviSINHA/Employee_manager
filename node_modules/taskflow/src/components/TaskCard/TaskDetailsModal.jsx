import React, { useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Tag,
  Flag,
  CheckCircle2,
  Circle,
  Copy,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { formatDate, formatDateTime, getDueDateStatus } from '../../utils/dateUtils';

export default function TaskDetailsModal() {
  const {
    detailsTask,
    setDetailsTask,
    setEditingTask,
    setDeletingTask,
    toggleComplete,
    duplicateTask
  } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && detailsTask) {
        setDetailsTask(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailsTask, setDetailsTask]);

  if (!detailsTask) return null;

  const {
    title,
    description,
    priority,
    category,
    dueDate,
    completed,
    createdAt,
    updatedAt
  } = detailsTask;

  const dueStatus = getDueDateStatus(dueDate, completed);

  return (
    <div
      className="modal-overlay"
      onClick={() => setDetailsTask(null)}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card modal-card-details" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="details-header-meta">
            <span className={`status-pill ${completed ? 'status-pill-completed' : 'status-pill-active'}`}>
              {completed ? <CheckCircle2 size={13} /> : <Circle size={13} />}
              <span>{completed ? 'Completed' : 'In Progress'}</span>
            </span>

            <span className={`badge-priority badge-priority-${priority?.toLowerCase()}`}>
              <Flag size={12} />
              <span>{priority}</span>
            </span>

            <span className="badge-category">
              <Tag size={12} />
              <span>{category || 'General'}</span>
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setDetailsTask(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="details-modal-body">
          <h2 className={`details-task-title ${completed ? 'line-through-title' : ''}`}>
            {title}
          </h2>

          <div className="details-section">
            <h4 className="details-section-label">Description</h4>
            <div className="details-description-box">
              {description ? (
                <p className="details-description-text">{description}</p>
              ) : (
                <p className="details-empty-note">No description provided for this task.</p>
              )}
            </div>
          </div>

          <div className="details-grid-meta">
            <div className="meta-card">
              <div className="meta-card-header">
                <Calendar size={14} className="meta-card-icon" />
                <span>Due Date</span>
              </div>
              <div className="meta-card-value">
                {dueDate ? formatDate(dueDate) : 'No due date set'}
              </div>
              {dueStatus && (
                <span className={`due-status-pill ${dueStatus.badgeClass}`}>
                  {dueStatus.label}
                </span>
              )}
            </div>

            <div className="meta-card">
              <div className="meta-card-header">
                <Clock size={14} className="meta-card-icon" />
                <span>Created</span>
              </div>
              <div className="meta-card-value">
                {createdAt ? formatDateTime(createdAt) : 'Unknown'}
              </div>
              {updatedAt && (
                <div className="meta-card-sub">
                  Updated: {formatDateTime(updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer details-modal-footer">
          <div className="footer-left-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                duplicateTask(detailsTask);
                setDetailsTask(null);
              }}
              title="Duplicate task"
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </button>
            <button
              type="button"
              className="btn btn-danger-ghost btn-sm"
              onClick={() => {
                setDeletingTask(detailsTask);
                setDetailsTask(null);
              }}
              title="Delete task"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>

          <div className="footer-right-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingTask(detailsTask);
                setDetailsTask(null);
              }}
            >
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              className={`btn btn-sm ${completed ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => toggleComplete(detailsTask.id)}
            >
              <CheckCircle2 size={14} />
              <span>{completed ? 'Mark as In Progress' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

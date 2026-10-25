import React, { useEffect } from 'react';

export default function DeleteConfirmModal({ task, isOpen, onClose, onConfirm }) {
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

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-content">
          <div className="delete-icon-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="delete-modal-icon"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>

          <h3 className="delete-modal-title">Delete Task</h3>
          <p className="delete-modal-text">
            Are you sure you want to delete this task?
          </p>
          <div className="delete-task-preview">
            &ldquo;{task.title}&rdquo;
          </div>
          <p className="delete-modal-subtext">
            This action cannot be undone.
          </p>

          <div className="modal-footer delete-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              autoFocus
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onConfirm(task.id);
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

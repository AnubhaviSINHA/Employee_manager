import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, itemName, confirmText = 'Confirm', onConfirm, onClose, danger = true }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className={`confirm-icon-box ${danger ? 'icon-danger' : 'icon-warning'}`}>
            {danger ? <Trash2 size={24} /> : <AlertTriangle size={24} />}
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="confirm-modal-body">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
          {itemName && (
            <div className="confirm-item-preview">
              &ldquo;{itemName}&rdquo;
            </div>
          )}
          <p className="confirm-subnote">This action cannot be undone.</p>
        </div>

        <div className="confirm-modal-footer">
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
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

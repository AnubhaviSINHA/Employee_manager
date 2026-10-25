import React, { useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import TaskForm from './TaskForm';
import { useTasks } from '../../hooks/useTasks';

export default function QuickAddModal() {
  const { isQuickAddOpen, setIsQuickAddOpen } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isQuickAddOpen) {
        setIsQuickAddOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickAddOpen, setIsQuickAddOpen]);

  if (!isQuickAddOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsQuickAddOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <PlusCircle size={18} />
            </div>
            <div>
              <h3 className="modal-title">Create New Task</h3>
              <p className="modal-subtitle">Add details to schedule and track your work</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsQuickAddOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <TaskForm isModal={true} onSuccess={() => setIsQuickAddOpen(false)} />
        </div>
      </div>
    </div>
  );
}

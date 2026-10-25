import React from 'react';
import Toast from './Toast';
import { useTasks } from '../../hooks/useTasks';

export default function ToastContainer() {
  const { toasts, removeToast } = useTasks();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={removeToast}
        />
      ))}
    </div>
  );
}

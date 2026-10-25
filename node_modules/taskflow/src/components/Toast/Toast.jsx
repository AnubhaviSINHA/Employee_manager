import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ id, message, type = 'success', onDismiss }) {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="toast-icon toast-warning" size={18} />;
      case 'error':
        return <AlertCircle className="toast-icon toast-error" size={18} />;
      case 'info':
        return <Info className="toast-icon toast-info" size={18} />;
      case 'success':
      default:
        return <CheckCircle2 className="toast-icon toast-success" size={18} />;
    }
  };

  return (
    <div className={`toast-item toast-item-${type}`} role="alert">
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
      </div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss toast"
      >
        <X size={15} />
      </button>
    </div>
  );
}

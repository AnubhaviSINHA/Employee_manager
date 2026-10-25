import React from 'react';

export default function Stats({ total, completed, pending }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="dashboard-header-section">
      <div className="header-intro">
        <h2 className="header-title">My Tasks</h2>
        <p className="header-subtitle">Organize your work and stay productive.</p>
      </div>

      <div className="stats-grid">
        {/* Total Tasks Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Tasks</span>
            <div className="stat-icon-wrapper stat-icon-total">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{total}</span>
            <span className="stat-subtext">Registered tasks</span>
          </div>
        </div>

        {/* Completed Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Completed</span>
            <div className="stat-icon-wrapper stat-icon-completed">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value-group">
              <span className="stat-value">{completed}</span>
              {total > 0 && (
                <span className="stat-badge stat-badge-success">
                  {percentage}%
                </span>
              )}
            </div>
            <span className="stat-subtext">Tasks resolved</span>
          </div>
        </div>

        {/* Pending Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending</span>
            <div className="stat-icon-wrapper stat-icon-pending">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-value">{pending}</span>
            <span className="stat-subtext">In progress / pending</span>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-container">
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <div className="progress-labels">
            <span>Progress Completion</span>
            <span className="progress-percent-text">{percentage}%</span>
          </div>
        </div>
      )}
    </section>
  );
}

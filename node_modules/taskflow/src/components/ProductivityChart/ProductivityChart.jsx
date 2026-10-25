import React from 'react';
import { Target, Zap, Award } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export default function ProductivityChart() {
  const { stats } = useTasks();
  const { total, completed, completionRate } = stats;

  const getStatusMessage = (rate) => {
    if (total === 0) return 'No tasks created yet. Add a task to start tracking.';
    if (rate === 100) return 'Outstanding! All tasks are completed! 🏆';
    if (rate >= 75) return 'Almost there! Fantastic momentum this week.';
    if (rate >= 50) return 'Good progress! Halfway through your goals.';
    if (rate >= 25) return 'Off to a solid start. Keep the momentum going!';
    return 'Let’s tackle some pending tasks today.';
  };

  return (
    <div className="productivity-card">
      <div className="productivity-card-header">
        <div className="productivity-title-group">
          <div className="productivity-icon-badge">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="productivity-card-title">Weekly Productivity</h3>
            <p className="productivity-card-sub">Task completion velocity and progress</p>
          </div>
        </div>

        <div className="productivity-rate-pill">
          <Award size={15} />
          <span>{completionRate}% Complete</span>
        </div>
      </div>

      <div className="productivity-progress-section">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill-animated"
            style={{ width: `${completionRate}%` }}
            role="progressbar"
            aria-valuenow={completionRate}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="productivity-details-row">
          <div className="productivity-counter">
            <Target size={14} className="counter-icon" />
            <span>
              <strong>{completed}</strong> of <strong>{total}</strong> tasks completed
            </span>
          </div>
          <span className="productivity-encouragement">
            {getStatusMessage(completionRate)}
          </span>
        </div>
      </div>
    </div>
  );
}

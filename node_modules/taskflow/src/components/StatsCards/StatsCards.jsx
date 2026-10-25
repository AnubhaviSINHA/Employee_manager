import React from 'react';
import { Layers, CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export default function StatsCards() {
  const { stats, setStatusFilter, setCurrentView } = useTasks();

  const handleCardClick = (filterType) => {
    setCurrentView('tasks');
    setStatusFilter(filterType);
  };

  return (
    <div className="stats-cards-grid">
      {/* 1. Total Tasks */}
      <div
        className="stats-metric-card"
        onClick={() => handleCardClick('all')}
        role="button"
        tabIndex={0}
        title="View all tasks"
      >
        <div className="metric-card-top">
          <span className="metric-label">Total Tasks</span>
          <div className="metric-icon-box icon-total">
            <Layers size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-number">{stats.total}</span>
          <span className="metric-trend trend-neutral">
            <TrendingUp size={13} />
            <span>Active flow</span>
          </span>
        </div>
        <p className="metric-subtext">Overall registered tasks</p>
      </div>

      {/* 2. Completed */}
      <div
        className="stats-metric-card"
        onClick={() => handleCardClick('completed')}
        role="button"
        tabIndex={0}
        title="View completed tasks"
      >
        <div className="metric-card-top">
          <span className="metric-label">Completed</span>
          <div className="metric-icon-box icon-completed">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-number">{stats.completed}</span>
          <span className="metric-trend trend-positive">
            {stats.completionRate}% Done
          </span>
        </div>
        <p className="metric-subtext">Tasks successfully resolved</p>
      </div>

      {/* 3. In Progress */}
      <div
        className="stats-metric-card"
        onClick={() => handleCardClick('active')}
        role="button"
        tabIndex={0}
        title="View active tasks"
      >
        <div className="metric-card-top">
          <span className="metric-label">In Progress</span>
          <div className="metric-icon-box icon-progress">
            <Clock size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-number">{stats.inProgress}</span>
          <span className="metric-trend trend-warning">
            Pending action
          </span>
        </div>
        <p className="metric-subtext">Currently active workloads</p>
      </div>

      {/* 4. Overdue */}
      <div
        className="stats-metric-card"
        onClick={() => handleCardClick('overdue')}
        role="button"
        tabIndex={0}
        title="View overdue tasks"
      >
        <div className="metric-card-top">
          <span className="metric-label">Overdue</span>
          <div className="metric-icon-box icon-overdue">
            <AlertTriangle size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-number text-danger">{stats.overdue}</span>
          <span className={`metric-trend ${stats.overdue > 0 ? 'trend-danger' : 'trend-positive'}`}>
            {stats.overdue > 0 ? 'Action required' : 'All on time'}
          </span>
        </div>
        <p className="metric-subtext">Past due date deadlines</p>
      </div>
    </div>
  );
}

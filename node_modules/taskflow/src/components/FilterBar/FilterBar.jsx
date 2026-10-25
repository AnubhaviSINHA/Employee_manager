import React from 'react';
import { Filter, ArrowUpDown, RotateCcw, Tag, Flag } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { CATEGORIES, PRIORITIES, SORT_OPTIONS } from '../../utils/taskUtils';

export default function FilterBar() {
  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    hasActiveFilters,
    resetFilters,
    stats,
    currentView
  } = useTasks();

  const isSpecialView = currentView === 'today' || currentView === 'upcoming' || currentView === 'completed';

  return (
    <div className="filter-bar-card">
      <div className="filter-bar-row">
        {/* Status Filter Tabs (rendered when not inside special status views like 'today'/'completed') */}
        {!isSpecialView && (
          <div className="status-tabs-list" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'all'}
              className={`status-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              <span>All</span>
              <span className="status-tab-badge">{stats.total}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'active'}
              className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              <span>Active</span>
              <span className="status-tab-badge">{stats.inProgress}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'completed'}
              className={`status-tab-btn ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              <span>Completed</span>
              <span className="status-tab-badge">{stats.completed}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'overdue'}
              className={`status-tab-btn tab-overdue ${statusFilter === 'overdue' ? 'active' : ''}`}
              onClick={() => setStatusFilter('overdue')}
            >
              <span>Overdue</span>
              {stats.overdue > 0 && (
                <span className="status-tab-badge badge-danger-count">{stats.overdue}</span>
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'today'}
              className={`status-tab-btn ${statusFilter === 'today' ? 'active' : ''}`}
              onClick={() => setStatusFilter('today')}
            >
              <span>Today</span>
              {stats.todayTasks > 0 && (
                <span className="status-tab-badge">{stats.todayTasks}</span>
              )}
            </button>
          </div>
        )}

        {/* Dropdowns: Priority, Category, Sort */}
        <div className="filter-selects-group">
          {/* Priority dropdown */}
          <div className="filter-select-wrapper">
            <Flag size={14} className="filter-select-icon" />
            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="all">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p} Priority
                </option>
              ))}
            </select>
          </div>

          {/* Category dropdown */}
          <div className="filter-select-wrapper">
            <Tag size={14} className="filter-select-icon" />
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By dropdown */}
          <div className="filter-select-wrapper">
            <ArrowUpDown size={14} className="filter-select-icon" />
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-ghost-primary btn-sm reset-filter-btn"
              onClick={resetFilters}
              title="Reset all active filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

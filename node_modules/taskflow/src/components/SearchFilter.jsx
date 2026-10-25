import React from 'react';

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  counts,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="search-filter-card">
      <div className="search-filter-top">
        {/* Search Input Bar */}
        <div className="search-box-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              title="Clear search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Priority Filter Select */}
        <div className="priority-select-wrapper">
          <label htmlFor="filter-priority" className="visually-hidden">
            Filter by priority
          </label>
          <select
            id="filter-priority"
            className="filter-priority-select"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs & Active status indicator */}
      <div className="search-filter-bottom">
        <div className="status-tabs-group" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'all'}
            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('all')}
          >
            All
            <span className="tab-count">{counts.total}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'active'}
            className={`status-tab ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('active')}
          >
            Active
            <span className="tab-count">{counts.pending}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === 'completed'}
            className={`status-tab ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('completed')}
          >
            Completed
            <span className="tab-count">{counts.completed}</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
            title="Reset search and filters"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="reset-icon"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}

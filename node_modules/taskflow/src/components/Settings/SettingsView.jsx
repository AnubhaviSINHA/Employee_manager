import React, { useState } from 'react';
import { Sun, Moon, Sliders, Trash2, RotateCcw, ShieldAlert, Check } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { PRIORITIES, CATEGORIES } from '../../utils/taskUtils';

export default function SettingsView() {
  const { theme, toggleTheme, isDark } = useTheme();
  const {
    preferences,
    setPreferences,
    clearAllTasks,
    resetToSampleData,
    setConfirmModalConfig,
    showToast
  } = useTasks();

  const handlePriorityChange = (e) => {
    const val = e.target.value;
    setPreferences((prev) => ({ ...prev, defaultPriority: val }));
    showToast('Default priority updated', 'success');
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setPreferences((prev) => ({ ...prev, defaultCategory: val }));
    showToast('Default category updated', 'success');
  };

  const handlePromptClearAll = () => {
    setConfirmModalConfig({
      title: 'Clear All Tasks?',
      message: 'Are you sure you want to delete all tasks from TaskFlow? All saved data will be removed from your browser storage.',
      confirmText: 'Clear All Data',
      danger: true,
      onConfirm: clearAllTasks
    });
  };

  const handlePromptResetSample = () => {
    setConfirmModalConfig({
      title: 'Reset to Sample Data?',
      message: 'This will replace your current tasks with the 5 realistic starter tasks.',
      confirmText: 'Reset Tasks',
      danger: false,
      onConfirm: resetToSampleData
    });
  };

  return (
    <div className="settings-view-container">
      <div className="settings-header">
        <h2 className="settings-title">Application Settings</h2>
        <p className="settings-subtitle">Manage interface preferences and local task storage</p>
      </div>

      <div className="settings-cards-stack">
        {/* 1. Appearance */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-box">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <h3 className="settings-card-title">Appearance &amp; Theme</h3>
              <p className="settings-card-sub">Switch between Light and Dark interface modes</p>
            </div>
          </div>

          <div className="settings-card-body">
            <div className="theme-toggle-row">
              <div className="theme-choice-info">
                <strong>Current Theme: </strong>
                <span className="theme-name-tag">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary theme-switch-btn"
                onClick={toggleTheme}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Task Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-box">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="settings-card-title">Task Defaults</h3>
              <p className="settings-card-sub">Configure default options for new task creation</p>
            </div>
          </div>

          <div className="settings-card-body">
            <div className="settings-form-grid">
              <div className="form-group">
                <label htmlFor="pref-priority-sel" className="form-label">
                  Default Priority
                </label>
                <select
                  id="pref-priority-sel"
                  className="form-select"
                  value={preferences.defaultPriority || 'Medium'}
                  onChange={handlePriorityChange}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pref-category-sel" className="form-label">
                  Default Category
                </label>
                <select
                  id="pref-category-sel"
                  className="form-select"
                  value={preferences.defaultCategory || 'Project'}
                  onChange={handleCategoryChange}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Data & Storage Management */}
        <div className="settings-card settings-card-danger">
          <div className="settings-card-header">
            <div className="settings-icon-box icon-box-danger">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="settings-card-title">Data &amp; Storage</h3>
              <p className="settings-card-sub">Manage browser LocalStorage data</p>
            </div>
          </div>

          <div className="settings-card-body">
            <div className="data-actions-row">
              <div className="data-action-item">
                <div>
                  <strong>Reset Starter Tasks</strong>
                  <p className="action-subtext">Restore the original 5 sample tasks</p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handlePromptResetSample}
                >
                  <RotateCcw size={14} />
                  <span>Reset Sample Data</span>
                </button>
              </div>

              <div className="data-action-item danger-item">
                <div>
                  <strong className="text-danger">Clear All Tasks</strong>
                  <p className="action-subtext">Permanently wipe all tasks from LocalStorage</p>
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handlePromptClearAll}
                >
                  <Trash2 size={14} />
                  <span>Clear All Tasks</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

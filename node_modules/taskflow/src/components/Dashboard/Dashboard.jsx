import React from 'react';
import { PlusCircle, ArrowRight, CheckCircle2, Clock, Calendar, Flag } from 'lucide-react';
import StatsCards from '../StatsCards/StatsCards';
import ProductivityChart from '../ProductivityChart/ProductivityChart';
import TaskForm from '../TaskForm/TaskForm';
import TaskCard from '../TaskCard/TaskCard';
import { useTasks } from '../../hooks/useTasks';
import { getGreeting } from '../../utils/dateUtils';

export default function Dashboard() {
  const { tasks, setCurrentView, setIsQuickAddOpen } = useTasks();

  const greeting = getGreeting();

  // Get top 4 priority / active tasks for quick dashboard preview
  const urgentTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      const weights = { High: 3, Medium: 2, Low: 1 };
      return (weights[b.priority] || 0) - (weights[a.priority] || 0);
    })
    .slice(0, 4);

  return (
    <div className="dashboard-view-wrapper">
      {/* Welcome Header */}
      <div className="dashboard-welcome-header">
        <div className="welcome-text-group">
          <h1 className="welcome-greeting">{greeting} 👋</h1>
          <p className="welcome-sub">Here&apos;s your personal productivity overview.</p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-add-header"
          onClick={() => setIsQuickAddOpen(true)}
        >
          <PlusCircle size={16} />
          <span>New Task</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <StatsCards />

      {/* Productivity Progress Section */}
      <ProductivityChart />

      {/* Dual Column: Quick Add Card & Priority Tasks Focus */}
      <div className="dashboard-lower-grid">
        {/* Left: Quick Inline Task Creator */}
        <div className="dashboard-creator-card">
          <div className="creator-card-header">
            <h3 className="creator-card-title">Quick Add Task</h3>
            <span className="creator-hint">Fast track a new item</span>
          </div>
          <TaskForm isModal={false} />
        </div>

        {/* Right: Urgent & Priority Workloads */}
        <div className="dashboard-urgent-card">
          <div className="urgent-card-header">
            <div>
              <h3 className="urgent-card-title">Priority Focus</h3>
              <p className="urgent-card-subtitle">Active tasks that need attention</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost-primary btn-sm"
              onClick={() => setCurrentView('tasks')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="urgent-tasks-list">
            {urgentTasks.length === 0 ? (
              <div className="urgent-empty-note">
                <CheckCircle2 size={24} className="text-success" />
                <p>No high-urgency tasks pending! Great job staying ahead.</p>
              </div>
            ) : (
              urgentTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDragStart={() => {}}
                  onDragOver={() => {}}
                  onDrop={() => {}}
                  onDragEnd={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

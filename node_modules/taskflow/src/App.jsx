import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { useTasks } from './hooks/useTasks';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import FilterBar from './components/FilterBar/FilterBar';
import TaskList from './components/TaskList/TaskList';
import ProgressChart from './components/ProgressChart/ProgressChart';
import ProductivityChart from './components/ProductivityChart/ProductivityChart';
import SettingsView from './components/Settings/SettingsView';

// Modals & Overlays
import QuickAddModal from './components/TaskForm/QuickAddModal';
import EditTaskModal from './components/EditTaskModal/EditTaskModal';
import TaskDetailsModal from './components/TaskCard/TaskDetailsModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import ToastContainer from './components/Toast/ToastContainer';

import './App.css';

function TaskFlowMain() {
  const {
    currentView,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    setIsQuickAddOpen,
    deletingTask,
    setDeletingTask,
    deleteTask,
    confirmModalConfig,
    setConfirmModalConfig,
    setEditingTask,
    setDetailsTask
  } = useTasks();

  // Global Keyboard Shortcuts (N, /, Esc)
  useKeyboardShortcuts({
    onNewTask: () => setIsQuickAddOpen(true),
    onSearchFocus: () => {
      const searchInp = document.querySelector('.search-bar-input');
      searchInp?.focus();
    },
    onEscape: () => {
      setIsQuickAddOpen(false);
      setEditingTask(null);
      setDetailsTask(null);
      setDeletingTask(null);
      setConfirmModalConfig(null);
      setIsMobileDrawerOpen(false);
    }
  });

  // Render view based on active sidebar tab
  const renderViewContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;

      case 'tasks':
      case 'today':
      case 'upcoming':
      case 'completed':
        return (
          <div className="task-view-container">
            <FilterBar />
            <TaskList />
          </div>
        );

      case 'analytics':
        return (
          <div className="analytics-view-container">
            <ProductivityChart />
            <ProgressChart />
          </div>
        );

      case 'settings':
        return <SettingsView />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="taskflow-layout-root">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Mobile Slide-out Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="taskflow-main-area">
        <Navbar />

        <main className="taskflow-scrollable-content">
          <div className="view-content-wrapper">{renderViewContent()}</div>
        </main>
      </div>

      {/* Global Modals */}
      <QuickAddModal />
      <EditTaskModal />
      <TaskDetailsModal />

      {/* Task Deletion Confirmation Dialog */}
      <ConfirmModal
        isOpen={Boolean(deletingTask)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        itemName={deletingTask?.title}
        confirmText="Delete Task"
        danger={true}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => {
          if (deletingTask) {
            deleteTask(deletingTask.id);
            setDeletingTask(null);
          }
        }}
      />

      {/* Generic Confirmation Dialog (e.g. for clearing data) */}
      <ConfirmModal
        isOpen={Boolean(confirmModalConfig)}
        title={confirmModalConfig?.title || 'Confirm Action'}
        message={confirmModalConfig?.message || 'Are you sure?'}
        confirmText={confirmModalConfig?.confirmText || 'Confirm'}
        danger={confirmModalConfig?.danger ?? true}
        onClose={() => setConfirmModalConfig(null)}
        onConfirm={() => {
          confirmModalConfig?.onConfirm?.();
          setConfirmModalConfig(null);
        }}
      />

      {/* Lightweight Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskFlowMain />
      </TaskProvider>
    </ThemeProvider>
  );
}

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  INITIAL_SAMPLE_TASKS,
  filterTasks,
  sortTasks,
  calculateStats
} from '../utils/taskUtils';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  // 1. Tasks state with localStorage persistence
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', () => {
    // If empty or non-array, seed initial 5 sample tasks
    return INITIAL_SAMPLE_TASKS;
  });

  // 2. Preferences state
  const [preferences, setPreferences] = useLocalStorage('taskflow_preferences', {
    defaultPriority: 'Medium',
    defaultCategory: 'Project'
  });

  // 3. Navigation / View State
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // 4. Search, Filter, and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // 5. Modals State
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [detailsTask, setDetailsTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [confirmModalConfig, setConfirmModalConfig] = useState(null);

  // 6. Toast notifications state
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 7. CRUD Operations
  const addTask = useCallback(
    ({ title, description = '', priority = preferences.defaultPriority || 'Medium', category = preferences.defaultCategory || 'Project', dueDate = '' }) => {
      const now = new Date().toISOString();
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        dueDate,
        completed: false,
        createdAt: now,
        updatedAt: now
      };

      setTasks((prev) => [newTask, ...prev]);
      showToast('✓ Task created successfully', 'success');
      return newTask;
    },
    [preferences, setTasks, showToast]
  );

  const editTask = useCallback(
    (updatedTask) => {
      const now = new Date().toISOString();
      setTasks((prev) =>
        prev.map((t) =>
          t.id === updatedTask.id
            ? { ...updatedTask, updatedAt: now }
            : t
        )
      );
      if (detailsTask && detailsTask.id === updatedTask.id) {
        setDetailsTask({ ...updatedTask, updatedAt: now });
      }
      showToast('✓ Task updated', 'success');
    },
    [detailsTask, setTasks, showToast]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (detailsTask && detailsTask.id === id) {
        setDetailsTask(null);
      }
      showToast('✓ Task deleted', 'info');
    },
    [detailsTask, setTasks, showToast]
  );

  const toggleComplete = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            const nextCompleted = !t.completed;
            showToast(
              nextCompleted ? '✓ Task completed' : 'Task marked as in progress',
              nextCompleted ? 'success' : 'info'
            );
            const updated = {
              ...t,
              completed: nextCompleted,
              updatedAt: new Date().toISOString()
            };
            if (detailsTask && detailsTask.id === id) {
              setDetailsTask(updated);
            }
            return updated;
          }
          return t;
        })
      );
    },
    [detailsTask, setTasks, showToast]
  );

  const duplicateTask = useCallback(
    (taskToDuplicate) => {
      const now = new Date().toISOString();
      const clone = {
        ...taskToDuplicate,
        id: Date.now(),
        title: `${taskToDuplicate.title} (Copy)`,
        completed: false,
        createdAt: now,
        updatedAt: now
      };

      setTasks((prev) => [clone, ...prev]);
      showToast('✓ Task duplicated', 'success');
    },
    [setTasks, showToast]
  );

  // Drag and Drop Task Reordering (HTML5 DND)
  const reorderTasks = useCallback(
    (sourceIndex, destinationIndex) => {
      if (sourceIndex === destinationIndex) return;
      setTasks((prev) => {
        const result = Array.from(prev);
        const [removed] = result.splice(sourceIndex, 1);
        result.splice(destinationIndex, 0, removed);
        return result;
      });
      showToast('Task order updated', 'info');
    },
    [setTasks, showToast]
  );

  const clearAllTasks = useCallback(() => {
    setTasks([]);
    setDetailsTask(null);
    showToast('All tasks have been cleared', 'info');
  }, [setTasks, showToast]);

  const resetToSampleData = useCallback(() => {
    setTasks(INITIAL_SAMPLE_TASKS);
    setDetailsTask(null);
    showToast('Reset to sample tasks', 'success');
  }, [setTasks, showToast]);

  // Reset Filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  }, []);

  // Compute Statistics
  const stats = useMemo(() => calculateStats(tasks), [tasks]);

  // Compute Filtered & Sorted Tasks
  // When in a dedicated view like 'today', 'upcoming', 'completed', align the effective status
  const effectiveStatusFilter = useMemo(() => {
    if (currentView === 'today') return 'today';
    if (currentView === 'upcoming') return 'upcoming';
    if (currentView === 'completed') return 'completed';
    return statusFilter;
  }, [currentView, statusFilter]);

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, {
      searchQuery,
      statusFilter: effectiveStatusFilter,
      priorityFilter,
      categoryFilter
    });
    return sortTasks(filtered, sortBy);
  }, [tasks, searchQuery, effectiveStatusFilter, priorityFilter, categoryFilter, sortBy]);

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      statusFilter !== 'all' ||
      priorityFilter !== 'all' ||
      categoryFilter !== 'all' ||
      sortBy !== 'newest'
    );
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  const value = {
    // State
    tasks,
    setTasks,
    preferences,
    setPreferences,
    currentView,
    setCurrentView,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    // Modals
    isQuickAddOpen,
    setIsQuickAddOpen,
    editingTask,
    setEditingTask,
    detailsTask,
    setDetailsTask,
    deletingTask,
    setDeletingTask,
    confirmModalConfig,
    setConfirmModalConfig,
    // Toasts
    toasts,
    showToast,
    removeToast,
    // CRUD & operations
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    duplicateTask,
    reorderTasks,
    clearAllTasks,
    resetToSampleData,
    resetFilters,
    // Computed
    stats,
    filteredTasks,
    hasActiveFilters,
    effectiveStatusFilter
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export const useTasks = useTaskContext;

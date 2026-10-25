import React from 'react';
import { Menu, Plus, Sun, Moon, Sparkles } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import SearchBar from '../SearchBar/SearchBar';

export default function Navbar() {
  const { currentView, setIsMobileDrawerOpen, setIsQuickAddOpen } = useTasks();
  const { theme, toggleTheme, isDark } = useTheme();

  const getPageTitle = (view) => {
    switch (view) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'tasks':
        return 'My Tasks';
      case 'today':
        return 'Today’s Priorities';
      case 'upcoming':
        return 'Upcoming Schedule';
      case 'completed':
        return 'Completed Archive';
      case 'analytics':
        return 'Productivity Analytics';
      case 'settings':
        return 'Settings & Data';
      default:
        return 'TaskFlow';
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-trigger-btn"
          onClick={() => setIsMobileDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-page-title-box">
          <h2 className="navbar-page-title">{getPageTitle(currentView)}</h2>
        </div>
      </div>

      <div className="navbar-center">
        {currentView !== 'settings' && currentView !== 'analytics' && <SearchBar />}
      </div>

      <div className="navbar-right">
        {/* Quick Add Button */}
        <button
          type="button"
          className="btn btn-primary btn-navbar-add"
          onClick={() => setIsQuickAddOpen(true)}
          title="Create task (Shortcut: N)"
        >
          <Plus size={16} />
          <span className="btn-text">Add Task</span>
          <kbd className="nav-shortcut-kbd">N</kbd>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          className="navbar-theme-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} className="sun-icon-spin" /> : <Moon size={18} className="moon-icon-tilt" />}
        </button>
      </div>
    </header>
  );
}

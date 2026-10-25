import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export default function Sidebar({ isMobile = false }) {
  const {
    currentView,
    setCurrentView,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    stats
  } = useTasks();

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (isMobile) {
      setIsMobileDrawerOpen(false);
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: <CheckSquare size={18} />,
      badge: stats.inProgress
    },
    {
      id: 'today',
      label: 'Today',
      icon: <Calendar size={18} />,
      badge: stats.todayTasks,
      badgeHighlight: stats.todayTasks > 0
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: <Clock size={18} />
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 size={18} />,
      badge: stats.completed
    }
  ];

  const secondaryNav = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={18} />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={18} />
    }
  ];

  return (
    <aside
      className={`sidebar-component ${isSidebarOpen ? 'expanded' : 'collapsed'} ${isMobile ? 'mobile-drawer' : ''}`}
      aria-label="Navigation Sidebar"
    >
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand-group" onClick={() => handleNavClick('dashboard')}>
          <div className="brand-logo-gem">
            <Sparkles size={18} className="logo-sparkle" />
          </div>
          {isSidebarOpen && (
            <div className="brand-titles">
              <span className="brand-name">TaskFlow</span>
              <span className="brand-version">Pro</span>
            </div>
          )}
        </div>

        {isMobile ? (
          <button
            type="button"
            className="sidebar-close-mobile-btn"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="sidebar-collapse-toggle-btn"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      {/* Main Nav Items */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">{isSidebarOpen && <span>OVERVIEW</span>}</div>
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isSidebarOpen && <span className="nav-label">{item.label}</span>}
                  {isSidebarOpen && item.badge !== undefined && (
                    <span className={`nav-badge ${item.badgeHighlight ? 'badge-urgent' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="sidebar-divider" />

        <div className="nav-section-label">{isSidebarOpen && <span>INSIGHTS &amp; CONFIG</span>}</div>
        <ul className="nav-list">
          {secondaryNav.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isSidebarOpen && <span className="nav-label">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer info */}
      {isSidebarOpen && (
        <div className="sidebar-footer">
          <div className="sidebar-footer-card">
            <span className="footer-card-title">TaskFlow v2.0</span>
            <span className="footer-card-sub">React 18 &bull; Context API</span>
          </div>
        </div>
      )}
    </aside>
  );
}

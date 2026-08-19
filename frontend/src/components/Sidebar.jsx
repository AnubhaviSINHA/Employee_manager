import React from 'react';
import { LayoutDashboard, Users, Building2, History, FileSpreadsheet, LogOut, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employee Directory', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'audit-logs', label: 'Audit Logs', icon: History },
    { id: 'reports', label: 'Reports Export', icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-purple-500/10 min-h-screen flex flex-col justify-between p-4 relative z-20">
      <div>
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-purple-500/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-wide">EMS Portal</h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-semibold">Enterprise v1.0</span>
          </div>
        </div>

        {/* Profile Welcome Card */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-950/40 to-slate-900/60 border border-purple-500/20 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-purple-400/30">
              {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate">Hello, {currentUser?.username === 'admin' ? 'Admin' : currentUser?.username} 👋</h4>
              <p className="text-[11px] text-purple-300/80 truncate">Welcome back to EMS</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white shadow-md shadow-purple-500/20 border border-purple-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="pt-4 border-t border-purple-500/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

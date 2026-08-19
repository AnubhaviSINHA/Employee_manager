import React from 'react';
import { Search, Bell, Shield } from 'lucide-react';

export default function Navbar({ currentUser, activeTab }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Executive Analytics Dashboard';
      case 'employees': return 'Employee Directory & Records';
      case 'departments': return 'Department Architecture';
      case 'audit-logs': return 'System Activity Audit Logs';
      case 'reports': return 'Report Exporting & Analytics';
      default: return 'EMS Control Center';
    }
  };

  return (
    <header className="h-16 glass-panel border-b border-purple-500/10 px-6 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-base font-semibold text-white tracking-wide">{getTabTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          <span>ROLE: {currentUser?.role || 'ADMIN'}</span>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>System Live</span>
        </div>
      </div>
    </header>
  );
}

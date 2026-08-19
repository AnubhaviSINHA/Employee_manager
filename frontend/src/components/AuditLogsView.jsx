import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, Shield, Clock, Info, User, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function AuditLogsView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/audit-logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
      case 'UPDATE':
      case 'UPDATE_PHOTO':
      case 'UPLOAD_RESUME':
        return 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300';
      case 'SOFT_DELETE':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'RESTORE':
        return 'bg-teal-500/15 border-teal-500/30 text-teal-300';
      case 'PERMANENT_DELETE':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
      default:
        return 'bg-purple-500/15 border-purple-500/30 text-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">System Audit Log History</h2>
          <p className="text-slate-400 text-xs mt-0.5">Immutable audit trail of corporate entity modifications and user actions</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <History className="w-4 h-4 text-purple-400" />
          <span>{logs.length} Recorded Log Events</span>
        </div>
      </div>

      {/* Timeline View */}
      {loading ? (
        <div className="flex justify-center py-12 text-purple-400">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      ) : logs.length === 0 ? (
        <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-sm">
          No audit logs recorded yet.
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-500/20">
          {logs.map((log, idx) => (
            <motion.div
              key={log.id || idx}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative glass-panel p-4 rounded-2xl border border-purple-500/20 glass-panel-hover"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[27px] top-4 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-[#080413]"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold font-mono ${getActionBadge(log.action)}`}>
                    {log.action}
                  </span>
                  <span className="text-xs font-bold text-white">Target: {log.entityName} ({log.entityId || 'N/A'})</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-400" /> {log.username}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs mt-1 bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/10 font-mono">
                {log.details}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

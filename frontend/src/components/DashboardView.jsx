import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Building2, DollarSign, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function DashboardView({ onNavigate }) {
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalDepartments: 0,
    averageSalary: 0,
    departmentDistribution: {},
    designationDistribution: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get('/api/dashboard/metrics');
      setMetrics(res.data);
    } catch (err) {
      console.error('Failed to load metrics', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  const deptChartData = Object.entries(metrics.departmentDistribution || {}).map(([name, value]) => ({
    name, value
  }));

  const desigChartData = Object.entries(metrics.designationDistribution || {}).map(([name, value]) => ({
    name, value
  }));

  const statCards = [
    { title: 'Total Staff', count: metrics.totalEmployees, icon: Users, color: 'from-purple-500/20 to-indigo-500/20', textColor: 'text-purple-300', borderColor: 'border-purple-500/30' },
    { title: 'Active Staff', count: metrics.activeEmployees, icon: UserCheck, color: 'from-emerald-500/20 to-teal-500/20', textColor: 'text-emerald-300', borderColor: 'border-emerald-500/30' },
    { title: 'Inactive Staff', count: metrics.inactiveEmployees, icon: UserX, color: 'from-rose-500/20 to-pink-500/20', textColor: 'text-rose-300', borderColor: 'border-rose-500/30' },
    { title: 'Departments', count: metrics.totalDepartments, icon: Building2, color: 'from-amber-500/20 to-orange-500/20', textColor: 'text-amber-300', borderColor: 'border-amber-500/30' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-purple-400">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-slate-950/60 border border-purple-500/20"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" /> EMS System Real-time Analytics
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">System Performance Overview</h2>
            <p className="text-slate-400 text-sm mt-1">Real-time metrics, staffing counts, and department distributions.</p>
          </div>

          <div className="glass-panel px-5 py-3 rounded-2xl border border-purple-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Average Salary</span>
              <h3 className="text-xl font-bold text-white">${metrics.averageSalary?.toLocaleString() || '0'}</h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel p-5 rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.color} glass-panel-hover`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.title}</span>
                  <h3 className={`text-3xl font-extrabold mt-1.5 ${card.textColor}`}>{card.count}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center ${card.textColor} shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown Doughnut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span>Department Distribution</span>
            </h3>
            <button onClick={() => onNavigate('departments')} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f0926', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Designation Breakdown Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Designation Breakdown</span>
            </h3>
            <button onClick={() => onNavigate('employees')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer">
              Manage Staff <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={desigChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f0926', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

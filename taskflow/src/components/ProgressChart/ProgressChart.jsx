import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import {
  getWeeklyCompletionData,
  getPriorityDistributionData,
  getStatusDistributionData,
  getCategoryDistributionData
} from '../../utils/taskUtils';

// Custom Minimal Tooltip for Recharts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip">
        {label && <p className="tooltip-label">{label}</p>}
        {payload.map((item, idx) => (
          <p key={idx} className="tooltip-entry" style={{ color: item.color || item.fill }}>
            <span className="tooltip-dot" style={{ backgroundColor: item.color || item.fill }} />
            <span>{item.name}: </span>
            <strong>{item.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function ProgressChart() {
  const { tasks } = useTasks();
  const { isDark } = useTheme();

  // Dynamic calculations with useMemo for high performance
  const weeklyData = useMemo(() => getWeeklyCompletionData(tasks), [tasks]);
  const priorityData = useMemo(() => getPriorityDistributionData(tasks), [tasks]);
  const statusData = useMemo(() => getStatusDistributionData(tasks), [tasks]);
  const categoryData = useMemo(() => getCategoryDistributionData(tasks), [tasks]);

  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <h3 className="analytics-title">Task Analytics &amp; Distribution</h3>
        <p className="analytics-subtitle">Real-time breakdown of workload, completion, and priorities</p>
      </div>

      <div className="charts-grid-analytics">
        {/* Chart 1: Task Completion (Mon - Sun) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-icon-badge">
              <BarChart3 size={16} />
            </div>
            <div>
              <h4 className="chart-card-title">Daily Activity (Mon - Sun)</h4>
              <p className="chart-card-subtitle">Completed vs pending tasks across days</p>
            </div>
          </div>

          <div className="chart-container-box">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke={textColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis
                  stroke={textColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Priority Distribution (Donut Chart) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-icon-badge">
              <PieChartIcon size={16} />
            </div>
            <div>
              <h4 className="chart-card-title">Priority Breakdown</h4>
              <p className="chart-card-subtitle">Distribution by urgency level</p>
            </div>
          </div>

          <div className="chart-container-box flex-center-chart">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Task Status Overview (Pie/Donut) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-icon-badge">
              <Activity size={16} />
            </div>
            <div>
              <h4 className="chart-card-title">Task Status Breakdown</h4>
              <p className="chart-card-subtitle">Completed, In Progress &amp; Overdue</p>
            </div>
          </div>

          <div className="chart-container-box flex-center-chart">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-status-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

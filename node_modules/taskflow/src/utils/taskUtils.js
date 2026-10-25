import { isPastDate, isToday, isFutureDate, getRelativeDateString } from './dateUtils';

export const CATEGORIES = ['Work', 'Study', 'Personal', 'Project', 'Other'];
export const PRIORITIES = ['Low', 'Medium', 'High'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' }
];

export const INITIAL_SAMPLE_TASKS = [
  {
    id: 1729850000001,
    title: 'Complete React Project',
    description: 'Build TaskFlow dashboard with Recharts, Drag & Drop, Context API, and polished SaaS UI.',
    priority: 'High',
    category: 'Project',
    dueDate: getRelativeDateString(3),
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 1729850000002,
    title: 'Practice DSA',
    description: 'Solve LeetCode Top Interview questions on Binary Trees and Dynamic Programming.',
    priority: 'Medium',
    category: 'Study',
    dueDate: getRelativeDateString(5),
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 1729850000003,
    title: 'Prepare Resume',
    description: 'Update technical skills with React 18, Vite, Context API, and modern SaaS dashboards.',
    priority: 'Low',
    category: 'Work',
    dueDate: getRelativeDateString(-1),
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 1729850000004,
    title: 'Study JavaScript',
    description: 'Deep dive into Closures, Event Loop, Promises, Microtasks, and Prototypes.',
    priority: 'High',
    category: 'Study',
    dueDate: getRelativeDateString(0),
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 1729850000005,
    title: 'Finish Project Documentation',
    description: 'Write comprehensive documentation detailing React architecture, custom hooks, and Recharts.',
    priority: 'Medium',
    category: 'Project',
    dueDate: getRelativeDateString(1),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function filterTasks(tasks, { searchQuery = '', statusFilter = 'all', priorityFilter = 'all', categoryFilter = 'all' }) {
  return tasks.filter((task) => {
    // 1. Status Filter
    if (statusFilter === 'active' && task.completed) return false;
    if (statusFilter === 'completed' && !task.completed) return false;
    if (statusFilter === 'today') {
      if (!isToday(task.dueDate)) return false;
    }
    if (statusFilter === 'overdue') {
      if (task.completed || !isPastDate(task.dueDate)) return false;
    }
    if (statusFilter === 'upcoming') {
      if (task.completed || !isFutureDate(task.dueDate)) return false;
    }

    // 2. Priority Filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    // 3. Category Filter
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

    // 4. Search Query (matches title, description, category, or priority)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = task.title?.toLowerCase().includes(q);
      const matchDesc = task.description?.toLowerCase().includes(q);
      const matchCategory = task.category?.toLowerCase().includes(q);
      const matchPriority = task.priority?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory && !matchPriority) return false;
    }

    return true;
  });
}

export function sortTasks(tasks, sortBy = 'newest') {
  const list = [...tasks];
  switch (sortBy) {
    case 'oldest':
      return list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    case 'dueDate':
      return list.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'priority': {
      const weights = { High: 3, Medium: 2, Low: 1 };
      return list.sort((a, b) => (weights[b.priority] || 0) - (weights[a.priority] || 0));
    }
    case 'alphabetical':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    default:
      return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }
}

export function calculateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const inProgress = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter((t) => !t.completed && isPastDate(t.dueDate)).length;
  const todayTasks = tasks.filter((t) => isToday(t.dueDate)).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    overdue,
    todayTasks,
    completionRate
  };
}

/**
 * Calculates completed vs total tasks for Mon - Sun for the bar chart
 */
export function getWeeklyCompletionData(tasks) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayCounts = {
    Mon: { day: 'Mon', completed: 0, pending: 0 },
    Tue: { day: 'Tue', completed: 0, pending: 0 },
    Wed: { day: 'Wed', completed: 0, pending: 0 },
    Thu: { day: 'Thu', completed: 0, pending: 0 },
    Fri: { day: 'Fri', completed: 0, pending: 0 },
    Sat: { day: 'Sat', completed: 0, pending: 0 },
    Sun: { day: 'Sun', completed: 0, pending: 0 }
  };

  tasks.forEach((task) => {
    const dateRef = task.dueDate || task.createdAt;
    if (dateRef) {
      const d = new Date(dateRef);
      if (!isNaN(d.getTime())) {
        // In JS: 0=Sun, 1=Mon, ..., 6=Sat
        const jsDay = d.getDay();
        const mapDay = jsDay === 0 ? 'Sun' : days[jsDay - 1];
        if (dayCounts[mapDay]) {
          if (task.completed) {
            dayCounts[mapDay].completed += 1;
          } else {
            dayCounts[mapDay].pending += 1;
          }
        }
      }
    }
  });

  return days.map((day) => dayCounts[day]);
}

/**
 * Calculates priority distribution for the donut/pie chart
 */
export function getPriorityDistributionData(tasks) {
  const counts = { High: 0, Medium: 0, Low: 0 };
  tasks.forEach((t) => {
    if (counts[t.priority] !== undefined) {
      counts[t.priority] += 1;
    } else {
      counts.Medium += 1;
    }
  });

  return [
    { name: 'High', value: counts.High, color: '#ef4444' },
    { name: 'Medium', value: counts.Medium, color: '#f59e0b' },
    { name: 'Low', value: counts.Low, color: '#10b981' }
  ];
}

/**
 * Calculates task status distribution
 */
export function getStatusDistributionData(tasks) {
  const stats = calculateStats(tasks);
  return [
    { name: 'Completed', value: stats.completed, color: '#10b981' },
    { name: 'Active', value: stats.inProgress - stats.overdue > 0 ? stats.inProgress - stats.overdue : 0, color: '#6366f1' },
    { name: 'Overdue', value: stats.overdue, color: '#ef4444' }
  ];
}

/**
 * Calculates category distribution
 */
export function getCategoryDistributionData(tasks) {
  const categoryCounts = {};
  CATEGORIES.forEach((cat) => (categoryCounts[cat] = 0));

  tasks.forEach((t) => {
    const cat = t.category || 'Other';
    if (categoryCounts[cat] !== undefined) {
      categoryCounts[cat] += 1;
    } else {
      categoryCounts.Other = (categoryCounts.Other || 0) + 1;
    }
  });

  const colors = {
    Work: '#3b82f6',
    Study: '#8b5cf6',
    Personal: '#ec4899',
    Project: '#10b981',
    Other: '#64748b'
  };

  return CATEGORIES.map((cat) => ({
    name: cat,
    value: categoryCounts[cat] || 0,
    color: colors[cat] || '#64748b'
  }));
}

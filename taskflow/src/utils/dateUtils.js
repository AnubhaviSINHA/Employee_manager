/**
 * Date utility functions for TaskFlow smart due dates and greetings
 */

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, parseInt(month, 10) - 1, day);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(isoStr) {
  if (!isoStr) return '';
  try {
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoStr;
  }
}

export function isToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return dateStr === todayStr;
}

export function isPastDate(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateStr.split('-');
  const target = new Date(year, parseInt(month, 10) - 1, day);
  target.setHours(0, 0, 0, 0);

  return target.getTime() < today.getTime();
}

export function isFutureDate(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateStr.split('-');
  const target = new Date(year, parseInt(month, 10) - 1, day);
  target.setHours(0, 0, 0, 0);

  return target.getTime() > today.getTime();
}

export function getDueDateStatus(dateStr, completed = false) {
  if (!dateStr || completed) return null;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dateStr.split('-');
    const taskDate = new Date(year, parseInt(month, 10) - 1, day);
    taskDate.setHours(0, 0, 0, 0);

    const diffMs = taskDate.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const days = Math.abs(diffDays);
      return {
        type: 'overdue',
        label: `⚠ Overdue by ${days} ${days === 1 ? 'day' : 'days'}`,
        badgeClass: 'badge-overdue'
      };
    }

    if (diffDays === 0) {
      return {
        type: 'today',
        label: 'Due Today',
        badgeClass: 'badge-today'
      };
    }

    if (diffDays === 1) {
      return {
        type: 'tomorrow',
        label: 'Due Tomorrow',
        badgeClass: 'badge-upcoming'
      };
    }

    if (diffDays <= 7) {
      return {
        type: 'upcoming',
        label: `Due in ${diffDays} days`,
        badgeClass: 'badge-upcoming'
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Returns a date string YYYY-MM-DD offset from today by daysOffset
 */
export function getRelativeDateString(daysOffset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

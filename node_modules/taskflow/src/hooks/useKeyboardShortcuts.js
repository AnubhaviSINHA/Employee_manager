import { useEffect } from 'react';

/**
 * Custom React Hook for managing global keyboard shortcuts
 *
 * Shortcuts:
 * - 'n' or 'N' -> Trigger new task modal
 * - '/'        -> Focus search input
 * - 'Escape'   -> Dismiss any active modal
 */
export function useKeyboardShortcuts({ onNewTask, onSearchFocus, onEscape }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is currently typing in an input, textarea, or select
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (isInput) return;

      if ((e.key === 'n' || e.key === 'N') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onNewTask?.();
      }

      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onSearchFocus?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewTask, onSearchFocus, onEscape]);
}

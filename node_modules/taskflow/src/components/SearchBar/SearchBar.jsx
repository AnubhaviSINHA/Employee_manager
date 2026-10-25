import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useTasks();
  const searchInputRef = useRef(null);

  // Keyboard shortcut: Pressing '/' focuses search input unless user is already typing in an input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA' &&
        document.activeElement.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-bar-wrapper">
      <Search size={16} className="search-bar-icon" />
      <input
        ref={searchInputRef}
        type="text"
        className="search-bar-input"
        placeholder="Search tasks by title, category, priority, or notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search tasks"
      />
      {searchQuery ? (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => setSearchQuery('')}
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      ) : (
        <div className="search-shortcut-hint" title="Press / to search">
          <kbd>/</kbd>
        </div>
      )}
    </div>
  );
}

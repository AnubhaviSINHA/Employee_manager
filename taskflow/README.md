# TaskFlow Pro &mdash; Advanced React.js Task Management Dashboard

**TaskFlow Pro** is an interview-grade personal productivity dashboard built with **React 18**, **Vite**, **JavaScript ES6+**, and **pure vanilla CSS3**. It incorporates advanced React architecture patterns, **React Context API**, custom hooks, **Recharts** data visualizations, **Lucide React** iconography, and native HTML5 Drag-and-Drop organization.

---

## 🏗️ Advanced React Architecture

### 1. State Management & React Context API
- **`TaskContext.jsx`**: Centralized, decoupled state machine managing tasks, active view, search filters, modal states, drag-and-drop reordering, and toast notifications.
- **`ThemeContext.jsx`**: Global theme provider synchronizing `:root` CSS custom properties with persistent `localStorage`.
- **Zero Global State Bloat**: Encapsulated state management using React Context instead of bulky Redux.

### 2. Custom React Hooks
- **`useTasks()`**: Provides type-safe consumer access to tasks, CRUD operations, dynamic stats, and filter actions.
- **`useTheme()`**: Clean hook exposing `theme`, `toggleTheme`, and `isDark`.
- **`useLocalStorage(key, initialValue)`**: Robust persistence hook with fallback and exception safety.
- **`useKeyboardShortcuts({ onNewTask, onSearchFocus, onEscape })`**: Global keyboard shortcut listener (`N` for new task, `/` for search focus, `Esc` to dismiss modals).

### 3. Performance Optimization
- **`useMemo()`**: Applied to:
  - Multi-condition task filtering (search query, status, priority, category)
  - Sorting algorithms (Newest, Oldest, Due Date, Priority, Alphabetical)
  - Statistical calculations (total, completed, in-progress, overdue, today)
  - Recharts dataset aggregations (daily completion, priority distribution, status breakdown)
- **`useCallback()`**: Memoized event handlers (`addTask`, `editTask`, `deleteTask`, `toggleComplete`, `reorderTasks`) to prevent child re-renders.

---

## 🌟 Comprehensive Features

### 📊 1. Dashboard & Productivity Overview
- **Dynamic Greeting**: Time-aware greeting ("Good morning / afternoon / evening 👋") with subtitle.
- **4 Real-Time Metric Cards**: Total Tasks, Completed, In Progress, and Overdue with visual trends.
- **Weekly Productivity Card**: Real-time progress bar (`18 of 23 tasks completed`, `78%`) with encouragement messages.
- **Priority Focus Preview**: Displays top urgent active tasks directly on the dashboard.

### 📈 2. Real-Time Analytics with Recharts
- **Chart 1 (Daily Activity Bar Chart)**: Real-time completion velocity across Mon - Sun.
- **Chart 2 (Priority Donut Chart)**: Distribution of High, Medium, and Low priority tasks.
- **Chart 3 (Task Status Breakdown)**: Distribution across Completed, Active, and Overdue workloads.

### 📁 3. Task Management & Advanced Task Model
- Full Task Model: `{ id, title, description, priority, category, dueDate, completed, createdAt, updatedAt }`
- Categories: `Work`, `Study`, `Personal`, `Project`, `Other`
- Priorities: `Low`, `Medium`, `High`
- Actions: Create, Edit, Delete (with confirmation), Complete / Reopen, Duplicate.
- **Task Details Modal**: Deep-dive inspection showing full description, metadata cards, due date urgency, and direct action buttons.

### 🖐️ 4. Native HTML5 Drag and Drop
- Drag-and-drop reordering of tasks.
- Order is saved automatically in `localStorage`.
- Zero external drag-and-drop library dependency.

### 📅 5. Smart Due Date System
- Automatic urgency tags:
  - 🔴 `⚠ Overdue by X days`
  - 🟡 `Due Today`
  - 🔵 `Due Tomorrow` / `Due in X days`

### 🔍 6. Multi-Factor Search & Filtering
- Instant search across **Title**, **Description**, **Category**, and **Priority**.
- Combined Status (`All`, `Active`, `Completed`, `Overdue`, `Today`), Priority, and Category filters.
- Sorting options: `Newest First`, `Oldest First`, `Due Date`, `Priority`, `Alphabetical`.

### 🔔 7. Lightweight Toast Notifications
- Reusable auto-dismissing toast alerts for all task operations (`Task created`, `Task updated`, `Task completed`, `Task deleted`, `Task duplicated`).

### ⚙️ 8. Settings & Storage Control
- Theme switcher (Light / Dark).
- Default creation preferences (Default Priority & Category).
- Sample data reset & "Clear All Data" with safety confirmation dialog.

---

## 📂 Project Directory Layout

```text
src/
├── components/
│   ├── Navbar/               # Top app header with search, quick add & theme toggle
│   ├── Sidebar/              # Collapsible sidebar & mobile drawer navigation
│   ├── Dashboard/            # Greeting, stats, productivity & priority focus
│   ├── StatsCards/           # 4 interactive dynamic KPI metric cards
│   ├── TaskForm/             # Controlled task creation form & QuickAddModal
│   ├── TaskCard/             # Task item with drag handle, badges & TaskDetailsModal
│   ├── TaskList/             # Drag-and-drop reorderable task stack
│   ├── SearchBar/            # Instant search input with '/' keyboard shortcut
│   ├── FilterBar/            # Status tabs, priority/category/sort selectors
│   ├── EditTaskModal/        # Accessible task editing modal
│   ├── ConfirmModal/         # Reusable confirmation dialog for critical actions
│   ├── ProgressChart/        # Recharts analytics charts (BarChart, PieChart)
│   ├── ProductivityChart/    # Dynamic progress bar & completion velocity
│   ├── EmptyState/           # Context-aware empty state illustrations
│   ├── Toast/                # Toast notification system
│   └── Settings/             # Preferences & storage control
│
├── context/
│   ├── TaskContext.jsx       # Task management & filter context provider
│   └── ThemeContext.jsx      # Theme provider with CSS variables
│
├── hooks/
│   ├── useTasks.js           # Task state & operations hook
│   ├── useLocalStorage.js    # Persistent storage hook
│   ├── useTheme.js           # Theme state hook
│   └── useKeyboardShortcuts.js # Global keyboard shortcuts hook
│
├── utils/
│   ├── taskUtils.js          # Sample data, filter, sort & chart aggregations
│   └── dateUtils.js          # Date formatting, smart due dates & greetings
│
├── App.jsx                   # Root application layout shell
├── App.css                   # SaaS dashboard styles, animations & responsive queries
├── main.jsx                  # React DOM root mounting
└── index.css                 # Design tokens & CSS theme variables
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server will run at **`http://localhost:5173/`**.

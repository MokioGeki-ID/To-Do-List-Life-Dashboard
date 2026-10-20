# Design: Focus Dashboard

## Architecture Overview

A single-page application with vanilla JavaScript managing all interactions and Local Storage for data persistence. The app follows a modular design pattern where each feature is self-contained.

---

## File Structure

```
focus-dashboard/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # All styles, CSS variables, theming
└── js/
    └── script.js      # All JavaScript logic
```

---

## HTML Structure (index.html)

### Layout
```
<body data-theme="light">
  <header>
    <h1>Focus Dashboard</h1>
    <button id="themeToggle">🌙/☀️</button>
  </header>
  
  <main class="container">
    <section class="greeting">
      <!-- Time, date, and personalized greeting -->
    </section>
    
    <div class="dashboard-grid">
      <section class="focus-timer">
        <!-- Timer display and controls -->
      </section>
      
      <section class="todo-list">
        <!-- Task input and list -->
      </section>
      
      <section class="quick-links">
        <!-- Link buttons and add form -->
      </section>
    </div>
  </main>
</body>
```

### Grid Layout
- Desktop: 2 columns (timer + todo on left, links on right)
- Mobile: 1 column (stacked)

---

## CSS Design (css/style.css)

### Theme System
Use CSS variables with `data-theme` attribute:

```css
:root[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #333333;
  --card-bg: #f5f5f5;
  --border-color: #dddddd;
  --accent-color: #4a90e2;
  /* ... more variables */
}

:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --card-bg: #2d2d2d;
  --border-color: #404040;
  --accent-color: #64b5f6;
  /* ... more variables */
}
```

### Component Styles
- Cards with subtle shadows/borders
- Button styles (primary, secondary, delete)
- Input field styles
- Checkbox styles for tasks
- Responsive breakpoint at 768px

---

## JavaScript Architecture (js/script.js)

### Module Organization

```javascript
// 1. Constants & Configuration
const STORAGE_KEYS = { ... }
const DEFAULT_LINKS = [ ... ]

// 2. State Management
let timerInterval = null
let remainingTime = 0

// 3. Utility Functions
function getFromStorage(key) { ... }
function saveToStorage(key, value) { ... }

// 4. Feature Modules
// - Greeting Module
// - Timer Module
// - Todo Module
// - Links Module
// - Theme Module

// 5. Initialization
function init() { ... }
document.addEventListener('DOMContentLoaded', init)
```

### Key Functions by Feature

#### Greeting Module
- `updateTime()` - Update clock every second
- `updateGreeting()` - Set greeting based on hour
- `loadUserName()` - Load from Local Storage
- `saveUserName()` - Save to Local Storage
- `enableNameEdit()` - Make name editable inline

#### Timer Module
- `startTimer()` - Begin countdown
- `stopTimer()` - Pause countdown
- `resetTimer()` - Reset to configured duration
- `updateTimerDisplay()` - Update MM:SS display
- `loadTimerDuration()` - Load custom duration
- `saveTimerDuration()` - Save custom duration
- `handleTimerComplete()` - Show "Time's up!" message

#### Todo Module
- `loadTodos()` - Load tasks from Local Storage
- `saveTodos()` - Save tasks to Local Storage
- `renderTodos()` - Render task list
- `addTodo()` - Add new task
- `toggleTodo()` - Mark task as done/undone
- `deleteTodo()` - Remove task
- `editTodo()` - Edit task text inline
- `showEmptyState()` - Show message when no tasks

#### Links Module
- `loadLinks()` - Load from Local Storage
- `saveLinks()` - Save to Local Storage
- `renderLinks()` - Render link buttons
- `addLink()` - Add new link
- `deleteLink()` - Remove link
- `normalizeUrl()` - Auto-prepend https://
- `initializeDefaultLinks()` - Set defaults on first run

#### Theme Module
- `loadTheme()` - Load theme or detect system preference
- `saveTheme()` - Save to Local Storage
- `toggleTheme()` - Switch between light/dark
- `applyTheme()` - Apply data-theme attribute
- `detectSystemTheme()` - Check prefers-color-scheme

---

## Local Storage Schema

### Storage Keys
```javascript
STORAGE_KEYS = {
  USER_NAME: 'focusDashboard_userName',
  TIMER_DURATION: 'focusDashboard_timerDuration',
  TODOS: 'focusDashboard_todos',
  LINKS: 'focusDashboard_links',
  THEME: 'focusDashboard_theme',
  LINKS_INITIALIZED: 'focusDashboard_linksInit'
}
```

### Data Structures

**userName** (string)
```json
"Alex"
```

**timerDuration** (number, in seconds)
```json
1500
```

**todos** (array)
```json
[
  { "id": 1634567890123, "text": "Study JavaScript", "done": false },
  { "id": 1634567891234, "text": "Read Chapter 5", "done": true }
]
```

**links** (array)
```json
[
  { "id": 1634567890123, "name": "Google", "url": "https://google.com" },
  { "id": 1634567891234, "name": "GitHub", "url": "https://github.com" }
]
```

**theme** (string)
```json
"dark"
```

**linksInitialized** (boolean)
```json
true
```

---

## User Interactions

### Editable Name
- Click name text to edit
- Input field appears inline
- Blur or Enter saves
- Escape cancels

### Timer Controls
- Start: begins countdown, disables Start, enables Stop
- Stop: pauses, enables Start
- Reset: stops and resets to configured duration
- Custom duration input with validation (1-120)

### Todo Interactions
- Enter or click Add button to create task
- Click checkbox to toggle done state
- Click task text to edit inline
- Click delete icon to remove

### Link Interactions
- Click link button to open in new tab
- Fill name + URL fields and click Add
- Click delete icon to remove link

### Theme Toggle
- Click sun/moon icon to switch
- Icon changes based on current theme

---

## Responsive Behavior

### Desktop (>768px)
```
[Header: Title + Theme Toggle]

[Greeting Section - Full Width]

[Timer]    [Links]
[Todo ]    [     ]
```

### Mobile (≤768px)
```
[Header: Title + Theme Toggle]

[Greeting Section]

[Timer]

[Todo]

[Links]
```

---

## Error Handling

- Validate timer duration range (1-120 minutes)
- Ignore empty task submissions
- Handle Local Storage quota errors gracefully
- Validate URLs (auto-fix missing protocol)
- Handle JSON parse errors for corrupted data

---

## Initialization Flow

1. DOM Content Loaded
2. Load theme (or detect system preference)
3. Apply theme
4. Load user name (default: "Friend")
5. Start clock interval
6. Load timer duration (default: 25 min)
7. Load and render todos
8. Load and render links (initialize defaults if first run)
9. Attach all event listeners
10. Set focus to first interactive element

---

## Performance Considerations

- Debounce inline edit saves
- Use event delegation for dynamic lists
- Single clock interval (don't create multiple)
- Minimize DOM reflows
- Cache DOM element references

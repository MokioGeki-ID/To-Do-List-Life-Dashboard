# Requirements: Focus Dashboard

## 1. Personalized Greeting

### User Story
As a student, I want to see a personalized greeting with the current time so that I feel welcomed and oriented when I start my session.

### Acceptance Criteria
- [ ] Display current time in HH:MM:SS format (24-hour clock)
- [ ] Time updates every second automatically
- [ ] Display full date (e.g., "Tuesday, October 20, 2026")
- [ ] Show contextual greeting based on time of day:
  - 05:00-11:59: "Good Morning"
  - 12:00-16:59: "Good Afternoon"
  - 17:00-20:59: "Good Evening"
  - 21:00-04:59: "Good Night"
- [ ] Display custom name in greeting (e.g., "Good Morning, Alex")
- [ ] Default name is "Friend" on first visit
- [ ] User can click/edit name inline
- [ ] Custom name is saved to Local Storage
- [ ] Custom name persists across browser sessions

---

## 2. Focus Timer (Pomodoro)

### User Story
As a student, I want a focus timer to structure my study sessions and take appropriate breaks.

### Acceptance Criteria
- [ ] Display timer in MM:SS format (e.g., "25:00")
- [ ] Default duration is 25 minutes
- [ ] Provide Start, Stop, and Reset buttons
- [ ] Start button begins countdown
- [ ] Stop button pauses countdown
- [ ] Reset button returns to configured duration
- [ ] When timer reaches 00:00, display "Time's up!" message
- [ ] User can set custom duration (1-120 minutes)
- [ ] Custom duration input validates range
- [ ] Custom duration is saved to Local Storage
- [ ] Custom duration persists and becomes new default

---

## 3. To-Do List

### User Story
As a student, I want to manage my daily tasks so that I can track what I need to accomplish.

### Acceptance Criteria
- [ ] Input field to add new tasks
- [ ] "Add Task" button or Enter key adds task
- [ ] Ignore empty tasks (no blank entries)
- [ ] Display list of all tasks
- [ ] Each task shows checkbox and delete button
- [ ] Click checkbox to mark task as done (strikethrough style)
- [ ] Click task text to edit inline
- [ ] Click delete button to remove task
- [ ] All tasks saved to Local Storage
- [ ] Tasks persist across browser sessions
- [ ] Show friendly empty-state message when no tasks exist
- [ ] Empty state message: "No tasks yet. Add one to get started!"

---

## 4. Quick Links

### User Story
As a student, I want quick access to my frequently visited websites so that I can navigate efficiently during study sessions.

### Acceptance Criteria
- [ ] Display list of quick link buttons
- [ ] Each button shows link name
- [ ] Click button to open website in new tab
- [ ] Input fields to add new link (name + URL)
- [ ] "Add Link" button creates new quick link
- [ ] Auto-prepend "https://" if protocol is missing
- [ ] Each link has a delete button
- [ ] Links saved to Local Storage
- [ ] Links persist across browser sessions
- [ ] Default links on first run only:
  - Google (https://google.com)
  - GitHub (https://github.com)
  - YouTube (https://youtube.com)
- [ ] Defaults only appear once (not on every reset)

---

## 5. Light/Dark Mode

### User Story
As a student, I want to switch between light and dark themes so that I can use the app comfortably in different lighting conditions.

### Acceptance Criteria
- [ ] Toggle button to switch themes
- [ ] Light mode: light background, dark text
- [ ] Dark mode: dark background, light text
- [ ] Use CSS variables for all theme colors
- [ ] Apply theme using `data-theme` attribute on root element
- [ ] Theme preference saved to Local Storage
- [ ] Theme persists across browser sessions
- [ ] On first visit, detect and use system preference
- [ ] System preference detected via `prefers-color-scheme` media query

---

## Non-Functional Requirements

### Performance
- Page must load in under 1 second on standard broadband
- No external network requests (all assets local)
- Smooth interactions with no lag

### Design
- Clean, minimal interface
- Clear visual hierarchy
- Consistent spacing and alignment
- Readable typography

### Responsive Design
- Desktop (>768px): two-column layout
- Mobile (≤768px): single-column layout, stacked components
- All features fully functional on mobile

### Accessibility
- Sufficient color contrast in both themes
- Clickable elements have adequate size
- Clear focus indicators for keyboard navigation

### Data Persistence
- All user data stored in Local Storage
- Graceful handling of storage errors
- No data loss on page refresh

# Tasks: Focus Dashboard

## Setup & Structure

- [ ] **T1**: Create project folder structure (index.html, css/style.css, js/script.js)
- [ ] **T2**: Set up basic HTML structure with semantic elements and sections
- [ ] **T3**: Link CSS and JavaScript files in HTML

---

## Theme System

- [ ] **T4**: Define CSS variables for light theme colors
- [ ] **T5**: Define CSS variables for dark theme colors
- [ ] **T6**: Create base styles with CSS variables
- [ ] **T7**: Add theme toggle button to header
- [ ] **T8**: Implement theme detection from system preference
- [ ] **T9**: Implement theme loading from Local Storage
- [ ] **T10**: Implement theme toggle functionality
- [ ] **T11**: Implement theme save to Local Storage

---

## Greeting Section

- [ ] **T12**: Create HTML structure for greeting section (time, date, name)
- [ ] **T13**: Style greeting section
- [ ] **T14**: Implement clock update function (HH:MM:SS)
- [ ] **T15**: Implement date display (full day and date)
- [ ] **T16**: Implement greeting logic based on time of day (Morning/Afternoon/Evening/Night)
- [ ] **T17**: Implement name loading from Local Storage (default "Friend")
- [ ] **T18**: Implement name display in greeting
- [ ] **T19**: Implement inline name editing functionality
- [ ] **T20**: Implement name save to Local Storage

---

## Focus Timer

- [ ] **T21**: Create HTML structure for timer (display, controls, custom duration input)
- [ ] **T22**: Style timer section
- [ ] **T23**: Implement timer display formatting (MM:SS)
- [ ] **T24**: Implement timer duration loading from Local Storage (default 25 minutes)
- [ ] **T25**: Implement Start button functionality
- [ ] **T26**: Implement Stop button functionality
- [ ] **T27**: Implement Reset button functionality
- [ ] **T28**: Implement countdown logic with setInterval
- [ ] **T29**: Implement "Time's up!" message at 00:00
- [ ] **T30**: Implement custom duration input (1-120 minutes validation)
- [ ] **T31**: Implement custom duration save to Local Storage
- [ ] **T32**: Update button states (disable/enable) based on timer state

---

## To-Do List

- [ ] **T33**: Create HTML structure for todo section (input, add button, list container)
- [ ] **T34**: Style todo section and task items
- [ ] **T35**: Style empty state message
- [ ] **T36**: Implement todos loading from Local Storage
- [ ] **T37**: Implement todos save to Local Storage
- [ ] **T38**: Implement render todos function
- [ ] **T39**: Implement add todo functionality
- [ ] **T40**: Ignore empty task submissions
- [ ] **T41**: Implement toggle todo (mark as done/undone)
- [ ] **T42**: Implement delete todo functionality
- [ ] **T43**: Implement inline edit todo functionality
- [ ] **T44**: Implement empty state display ("No tasks yet. Add one to get started!")
- [ ] **T45**: Add Enter key support for adding tasks

---

## Quick Links

- [ ] **T46**: Create HTML structure for links section (buttons container, add form)
- [ ] **T47**: Style links section and link buttons
- [ ] **T48**: Define default links (Google, GitHub, YouTube)
- [ ] **T49**: Implement links loading from Local Storage
- [ ] **T50**: Implement links save to Local Storage
- [ ] **T51**: Implement default links initialization (first run only)
- [ ] **T52**: Implement render links function
- [ ] **T53**: Implement add link functionality
- [ ] **T54**: Implement URL normalization (auto-prepend https://)
- [ ] **T55**: Implement delete link functionality
- [ ] **T56**: Implement link button click to open in new tab

---

## Responsive Design

- [ ] **T57**: Implement mobile styles (single column, ≤768px)
- [ ] **T58**: Implement desktop grid layout (two columns, >768px)
- [ ] **T59**: Ensure all interactive elements are touch-friendly
- [ ] **T60**: Test responsive behavior at various breakpoints

---

## Polish & Finalization

- [ ] **T61**: Add consistent spacing and padding across components
- [ ] **T62**: Add hover states for all interactive elements
- [ ] **T63**: Add focus indicators for keyboard navigation
- [ ] **T64**: Verify color contrast meets accessibility standards
- [ ] **T65**: Add smooth transitions for theme switching
- [ ] **T66**: Add card shadows/borders for visual hierarchy
- [ ] **T67**: Test all features in Chrome
- [ ] **T68**: Test all features in Firefox
- [ ] **T69**: Test all features in Edge
- [ ] **T70**: Test all features in Safari
- [ ] **T71**: Verify all data persists correctly across browser sessions
- [ ] **T72**: Add code comments for complex logic
- [ ] **T73**: Final code cleanup and formatting

---

## Task Execution Order

Tasks are ordered to build the app incrementally:
1. Setup & structure first
2. Theme system (affects everything)
3. Features one by one (Greeting → Timer → Todo → Links)
4. Responsive design
5. Polish and cross-browser testing

Each task should be small enough to complete in one focused session.

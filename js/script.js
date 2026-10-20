/* ============================================================
   script.js — Life Dashboard
   ============================================================ */

/* ============================================================
   1. CONSTANTS & LOCAL STORAGE KEYS
   ============================================================ */
const KEYS = {
  theme:         'dashboard_theme',
  userName:      'dashboard_name',
  timerDuration: 'dashboard_timer_duration',
  todos:         'dashboard_todos',
  links:         'dashboard_links',
};

const DEFAULT_LINKS = [
  { id: uid(), name: 'Google',  url: 'https://www.google.com'  },
  { id: uid(), name: 'GitHub',  url: 'https://github.com'      },
  { id: uid(), name: 'YouTube', url: 'https://www.youtube.com' },
];

/* ============================================================
   1b. SVG ICON LIBRARY
   Hardcoded path data only — never mixed with user content.
   These strings are inserted into OUR controlled elements only.
   ============================================================ */
const SVG_PATHS = {
  moon:         '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun:          '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  edit:         '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>',
  trash:        '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  externalLink: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
};

/* Returns a complete, self-contained SVG element string */
function icon(name, size, extraClass) {
  var s  = size || 16;
  var cl = extraClass ? ' class="' + extraClass + '"' : '';
  return '<svg' + cl + ' xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
    ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    SVG_PATHS[name] + '</svg>';
}

/* ============================================================
   2. STORAGE HELPERS
   ============================================================ */
function storageGet(key, fallback) {
  if (fallback === undefined) fallback = null;
  try {
    var raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* Silently ignore quota errors */ }
}

/* Tiny collision-resistant ID */
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/* Zero-pad a number to 2 digits */
function pad2(n) {
  return String(n).padStart(2, '0');
}

/* ============================================================
   3. THEME
   ============================================================ */
var themeToggleBtn = document.getElementById('theme-toggle');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  /* Safe: SVG is our own hardcoded string, not user input */
  themeToggleBtn.innerHTML = theme === 'dark' ? icon('sun', 18) : icon('moon', 18);
  themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function initTheme() {
  applyTheme(getCurrentTheme());

  themeToggleBtn.addEventListener('click', function () {
    var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storageSet(KEYS.theme, next);
  });
}

/* ============================================================
   4. GREETING & CLOCK
   ============================================================ */
var clockTimeEl   = document.getElementById('clock-time');
var clockDateEl   = document.getElementById('clock-date');
var greetingEl    = document.getElementById('greeting-text');
var nameDisplayEl = document.getElementById('name-display');
var nameEditBtn   = document.getElementById('name-edit-btn');
var nameForm      = document.getElementById('name-form');
var nameInput     = document.getElementById('name-input');
var nameSaveBtn   = document.getElementById('name-save-btn');
var nameCancelBtn = document.getElementById('name-cancel-btn');

var DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

function updateClock() {
  var now  = new Date();
  var h    = now.getHours();
  var name = storageGet(KEYS.userName, '');

  clockTimeEl.textContent = pad2(h) + ':' + pad2(now.getMinutes()) + ':' + pad2(now.getSeconds());
  clockDateEl.textContent = now.toLocaleDateString(undefined, DATE_FORMAT_OPTIONS);

  var greeting = getGreeting(h);
  greetingEl.textContent = name ? greeting + ', ' + name : greeting;
}

function renderNameDisplay() {
  var name = storageGet(KEYS.userName, '');
  /* textContent for user data (safe); icon() is hardcoded SVG (safe) */
  nameDisplayEl.textContent = name || '';
  nameEditBtn.innerHTML = icon('edit', 15, 'btn-svg') + (name ? ' Edit name' : ' Set your name');
}

function showNameForm(visible) {
  nameForm.classList.toggle('hidden', !visible);
  if (visible) {
    nameInput.value = storageGet(KEYS.userName, '');
    nameInput.focus();
  }
}

function saveName() {
  var name = nameInput.value.trim();
  storageSet(KEYS.userName, name);
  renderNameDisplay();
  updateClock();
  showNameForm(false);
}

function initGreeting() {
  renderNameDisplay();
  updateClock();
  setInterval(updateClock, 1000);

  nameEditBtn.addEventListener('click',   function () { showNameForm(true); });
  nameCancelBtn.addEventListener('click', function () { showNameForm(false); });
  nameSaveBtn.addEventListener('click',   saveName);
  nameInput.addEventListener('keydown',   function (e) { if (e.key === 'Enter') saveName(); });
}

/* ============================================================
   5. FOCUS TIMER (POMODORO)
   ============================================================ */
var timerDisplayEl     = document.getElementById('timer-display');
var timerMessageEl     = document.getElementById('timer-message');
var timerStartBtn      = document.getElementById('timer-start');
var timerStopBtn       = document.getElementById('timer-stop');
var timerResetBtn      = document.getElementById('timer-reset');
var timerDurationInput = document.getElementById('timer-duration-input');
var timerSetBtn        = document.getElementById('timer-set-btn');

var timerState = {
  totalSeconds: 25 * 60,
  remaining:    25 * 60,
  intervalId:   null,
  running:      false,
};

function formatTime(seconds) {
  return pad2(Math.floor(seconds / 60)) + ':' + pad2(seconds % 60);
}

function updateTimerDisplay() {
  timerDisplayEl.textContent = formatTime(timerState.remaining);
}

function showTimerMessage(visible) {
  timerMessageEl.classList.toggle('hidden', !visible);
}

function timerTick() {
  if (timerState.remaining <= 0) {
    clearInterval(timerState.intervalId);
    timerState.running    = false;
    timerState.intervalId = null;
    updateTimerDisplay();
    showTimerMessage(true);
    return;
  }
  timerState.remaining -= 1;
  updateTimerDisplay();
}

function startTimer() {
  if (timerState.running) return;
  showTimerMessage(false);
  timerState.running    = true;
  timerState.intervalId = setInterval(timerTick, 1000);
}

function stopTimer() {
  clearInterval(timerState.intervalId);
  timerState.intervalId = null;
  timerState.running    = false;
}

function resetTimer() {
  stopTimer();
  timerState.remaining = timerState.totalSeconds;
  updateTimerDisplay();
  showTimerMessage(false);
}

function setTimerDuration() {
  var raw = parseInt(timerDurationInput.value, 10);
  if (!Number.isFinite(raw) || raw < 1 || raw > 120) return;  /* Ignore invalid */
  timerState.totalSeconds = raw * 60;
  storageSet(KEYS.timerDuration, raw);
  stopTimer();
  timerState.remaining = timerState.totalSeconds;
  updateTimerDisplay();
  showTimerMessage(false);
}

function initTimer() {
  var saved   = storageGet(KEYS.timerDuration, 25);
  var minutes = (saved >= 1 && saved <= 120) ? saved : 25;
  timerState.totalSeconds = minutes * 60;
  timerState.remaining    = timerState.totalSeconds;
  timerDurationInput.value = minutes;
  updateTimerDisplay();

  timerStartBtn.addEventListener('click',    startTimer);
  timerStopBtn.addEventListener('click',     stopTimer);
  timerResetBtn.addEventListener('click',    resetTimer);
  timerSetBtn.addEventListener('click',      setTimerDuration);
  timerDurationInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') setTimerDuration(); });
}

/* ============================================================
   6. TO-DO LIST
   ============================================================ */
var todoInput   = document.getElementById('todo-input');
var todoAddBtn  = document.getElementById('todo-add-btn');
var todoListEl  = document.getElementById('todo-list');
var todoEmptyEl = document.getElementById('todo-empty');

/* Todo item shape: { id, text, done } */

function loadTodos() { return storageGet(KEYS.todos, []); }
function saveTodos(todos) { storageSet(KEYS.todos, todos); }

function refreshTodoEmpty(todos) {
  todoEmptyEl.classList.toggle('hidden', todos.length > 0);
}

function createTodoElement(todo) {
  var li = document.createElement('li');
  li.className  = 'todo-item' + (todo.done ? ' done' : '');
  li.dataset.id = todo.id;

  /* Checkbox */
  var checkbox = document.createElement('input');
  checkbox.type      = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked   = todo.done;
  checkbox.setAttribute('aria-label', 'Mark "' + todo.text + '" as ' + (todo.done ? 'incomplete' : 'done'));

  /* Text span — always textContent, never innerHTML */
  var textSpan = document.createElement('span');
  textSpan.className   = 'todo-text';
  textSpan.textContent = todo.text;

  /* Action buttons */
  var actions = document.createElement('div');
  actions.className = 'todo-actions';

  var editBtn = document.createElement('button');
  editBtn.className = 'btn btn-ghost btn-sm';
  editBtn.innerHTML  = icon('edit', 14, 'btn-svg');   /* Safe: hardcoded SVG */
  editBtn.setAttribute('aria-label', 'Edit task: ' + todo.text);

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.innerHTML  = icon('trash', 14, 'btn-svg');  /* Safe: hardcoded SVG */
  deleteBtn.setAttribute('aria-label', 'Delete task: ' + todo.text);

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(actions);

  /* --- Events --- */

  checkbox.addEventListener('change', function () {
    var list = loadTodos();
    var item = list.find(function (t) { return t.id === todo.id; });
    if (item) { item.done = checkbox.checked; saveTodos(list); }
    li.classList.toggle('done', checkbox.checked);
    checkbox.setAttribute('aria-label', 'Mark "' + todo.text + '" as ' + (checkbox.checked ? 'incomplete' : 'done'));
  });

  editBtn.addEventListener('click', function () {
    var editInput = document.createElement('input');
    editInput.className = 'todo-edit-input';
    editInput.value     = todo.text;
    editInput.setAttribute('aria-label', 'Edit task text');
    li.replaceChild(editInput, textSpan);
    editInput.focus();
    editInput.select();

    function finishEdit() {
      var newText = editInput.value.trim();
      if (newText && newText !== todo.text) {
        var list = loadTodos();
        var item = list.find(function (t) { return t.id === todo.id; });
        if (item) { item.text = newText; todo.text = newText; saveTodos(list); }
      }
      textSpan.textContent = todo.text;
      li.replaceChild(textSpan, editInput);
      editBtn.setAttribute('aria-label', 'Edit task: ' + todo.text);
      deleteBtn.setAttribute('aria-label', 'Delete task: ' + todo.text);
    }

    editInput.addEventListener('blur', finishEdit);
    editInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter')  { editInput.blur(); }
      if (e.key === 'Escape') { editInput.value = todo.text; editInput.blur(); }
    });
  });

  deleteBtn.addEventListener('click', function () {
    var list = loadTodos().filter(function (t) { return t.id !== todo.id; });
    saveTodos(list);
    li.remove();
    refreshTodoEmpty(list);
  });

  return li;
}

function renderTodos() {
  var todos = loadTodos();
  todoListEl.innerHTML = '';
  todos.forEach(function (todo) { todoListEl.appendChild(createTodoElement(todo)); });
  refreshTodoEmpty(todos);
}

function addTodo() {
  var text = todoInput.value.trim();
  if (!text) return;
  var todos = loadTodos();
  todos.unshift({ id: uid(), text: text, done: false });
  saveTodos(todos);
  todoInput.value = '';
  renderTodos();
}

function initTodos() {
  renderTodos();
  todoAddBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') addTodo(); });
}

/* ============================================================
   7. QUICK LINKS
   ============================================================ */
var linksListEl   = document.getElementById('links-list');
var linksEmptyEl  = document.getElementById('links-empty');
var linkNameInput = document.getElementById('link-name-input');
var linkUrlInput  = document.getElementById('link-url-input');
var linkAddBtn    = document.getElementById('link-add-btn');

/* Link shape: { id, name, url } */

function loadLinks() { return storageGet(KEYS.links, null); }
function saveLinks(links) { storageSet(KEYS.links, links); }

function ensureProtocol(url) {
  var trimmed = url.trim();
  if (!trimmed) return '';
  if (/^[a-z][a-z\d+\-.]*:/i.test(trimmed)) return trimmed;
  return 'https://' + trimmed;
}

function isValidUrl(url) {
  try { new URL(url); return true; } catch (e) { return false; }
}

function refreshLinksEmpty(links) {
  linksEmptyEl.classList.toggle('hidden', links.length > 0);
}

function createLinkElement(link) {
  var div = document.createElement('div');
  div.className = 'link-item';

  var anchor = document.createElement('a');
  anchor.className = 'link-anchor';
  anchor.href      = link.url;
  anchor.target    = '_blank';
  anchor.rel       = 'noopener noreferrer';
  anchor.title     = link.url;
  /* SVG icon is hardcoded (safe); link name is a text node (safe) */
  anchor.innerHTML = icon('externalLink', 14, 'link-icon');
  anchor.appendChild(document.createTextNode(link.name));

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.innerHTML  = icon('trash', 14, 'btn-svg');   /* Safe: hardcoded SVG */
  deleteBtn.setAttribute('aria-label', 'Delete link: ' + link.name);

  deleteBtn.addEventListener('click', function () {
    var links = loadLinks().filter(function (l) { return l.id !== link.id; });
    saveLinks(links);
    div.remove();
    refreshLinksEmpty(links);
  });

  div.appendChild(anchor);
  div.appendChild(deleteBtn);
  return div;
}

function renderLinks() {
  var links = loadLinks();
  linksListEl.innerHTML = '';
  links.forEach(function (link) { linksListEl.appendChild(createLinkElement(link)); });
  refreshLinksEmpty(links);
}

function addLink() {
  var name   = linkNameInput.value.trim();
  var rawUrl = linkUrlInput.value.trim();
  if (!name || !rawUrl) return;
  var url = ensureProtocol(rawUrl);
  if (!isValidUrl(url)) return;

  var links = loadLinks();
  links.push({ id: uid(), name: name, url: url });
  saveLinks(links);
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  renderLinks();
}

function initLinks() {
  if (loadLinks() === null) { saveLinks(DEFAULT_LINKS); }
  renderLinks();
  linkAddBtn.addEventListener('click', addLink);
  linkUrlInput.addEventListener('keydown',  function (e) { if (e.key === 'Enter') addLink(); });
  linkNameInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') addLink(); });
}

/* ============================================================
   8. INIT — wire everything up after DOM is ready
   ============================================================ */
function init() {
  initTheme();
  initGreeting();
  initTimer();
  initTodos();
  initLinks();
}

document.addEventListener('DOMContentLoaded', init);
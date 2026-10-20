# Project Structure

## Folder Structure

The project must follow this exact structure:

```
focus-dashboard/
├── index.html          (single HTML file)
├── css/
│   └── style.css      (single CSS file)
└── js/
    └── script.js      (single JavaScript file)
```

## File Organization Rules

### HTML (index.html)
- Single page application
- Semantic HTML5 elements
- All content in one file
- No inline styles or scripts

### CSS (css/style.css)
- **One file only** - all styles must be in style.css
- Use CSS variables for theming
- Mobile-first approach
- Organized by component sections

### JavaScript (js/script.js)
- **One file only** - all logic must be in script.js
- Organized by feature modules
- Event listeners grouped together
- Local Storage functions clearly separated

## Code Organization

Keep code clean and readable:
- Group related functions together
- Use clear section comments
- Maintain logical flow from top to bottom
- Initialize app in a clear startup function

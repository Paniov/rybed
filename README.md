# Daily Bible Reading App

A light, static web app for displaying daily Bible readings. Works perfectly with GitHub Pages.

## Features

- **Live Date**: Shows current date with day of week, updated fresh on every page load (no caching)
- **Navigation**: Previous/Next buttons to browse readings by date
- **Dual Reading Plan**: Displays Old Testament and New Testament portions side by side
- **Leap Year Support**: Automatically detects leap years and uses appropriate reading schedule
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Backend Required**: 100% static content, perfect for GitHub Pages

## Files

- `index.html` - Main page structure
- `style.css` - Light, centered styling with gradients
- `script.js` - App logic, date handling, and reading plan parsing
- `Bibile Reading Plan of the year for AI Context` - Static resource file with all daily readings (replace with new plans as needed)
- `.nojekyll` - Configuration for GitHub Pages to serve as static content

## How It Works

1. The app loads the `Bible-Reading-Plan-before-AI-Fix` file on startup
2. It parses the file to extract readings for both leap and non-leap years
3. Every time the page loads, it gets the **fresh current date** (not cached)
4. Automatically detects if it's a leap year and uses the correct reading schedule
5. Users can navigate to any date using the Previous/Next buttons

## Deployment to GitHub Pages

1. Create a GitHub repository named `username.github.io`
2. Clone it locally
3. Copy all files from this project to the repository
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial Daily Bible Reading App"
   git push origin main
   ```
5. Your app will be live at `https://username.github.io`

Or, to deploy as a project site:
1. Push this folder to any repository as a subdirectory
2. In repository settings, enable GitHub Pages with `main` branch (or `docs` folder)
3. Access at `https://username.github.io/repository-name`

## Customizing the Reading Plan

To use a different Bible reading plan:

1. Replace the `Bible-Reading-Plan-before-AI-Fix` file with your new reading plan
2. Ensure the file follows the same format:
   ```
   Non-Leap Year New Testament Daily Reading Plan:
   January 1 — Matthew 1
   January 2 — Matthew 2
   ...
   
   Non-leap Year Old Testament Daily Reading Plan:
   January 1 — Genesis 1
   January 2 — Genesis 2
   ...
   
   Leap Year New Testament Daily Reading Plan:
   ...
   
   Leap Year Old Testament Daily Reading Plan:
   ...
   ```
3. The app will automatically parse and use the new readings

## Design

- **Centered Layout**: All content is vertically and horizontally centered
- **Color-Coded Sections**: OT section (warm gold), NT section (cool blue)
- **Light Theme**: Clean white card on subtle gradient background
- **Responsive**: Adapts to all screen sizes with optimized padding and font sizes

## Browser Support

Works on all modern browsers that support:
- Fetch API
- ES6 JavaScript
- Flexbox CSS
- Local Date APIs

## No Server Required

This is a 100% static site. No server, no database, no backend processing. Perfect for GitHub Pages' free hosting plan.

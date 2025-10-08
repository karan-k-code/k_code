# Blog React Frontend

This folder is a Vite + React scaffold to help convert your static site into a React app.

How to run

1. Open a terminal in `frontend/`.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.

Migration notes

- Copy images from `../public/image/` into `public/image/` inside this folder or reference them from the existing `public/` via relative paths when serving both projects.
- Move the HTML content from files like `index.html`, `pages/login.html`, `pages/post.html`, etc. into the components under `src/pages/`.
- Convert client-side scripts in `scripts/` into React hooks or utility modules in `src/`.
- Use `react-router-dom` for navigation; routes are defined in `src/App.jsx`.

Next steps (recommended)

- Convert forms to controlled components and move fetch/XHR code into `src/utils`.
- Add a context or state management (React Context or Redux) for auth state.
- Implement protected routes for pages that require authentication.

# Blog React Frontend

This project is the frontend for a blog application, built with React and Vite. It provides a dynamic and interactive user experience for reading, writing, and managing blog posts.

## Tech Stack

*   **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
*   **[Vite](https://vitejs.dev/)**: A fast build tool and development server for modern web projects.
*   **[React Router](https://reactrouter.com/)**: For declarative routing in the React application.

## Getting Started

To get the frontend running locally, follow these steps:

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the project's dependencies:
    ```sh
    npm install
    ```

3.  **Start the development server:**
    This command will start the Vite development server, and you can view the application in your browser at `http://localhost:5173`.
    ```sh
    npm run dev
    ```

## Available Scripts

In the `package.json` file, you will find the following scripts:

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production to the `dist` folder.
*   `npm run preview`: Serves the production build locally for previewing.

## Project Structure

```
frontend/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components for different routes
│   ├── styles/          # CSS files for styling
│   ├── App.jsx          # Main application component with routing
│   └── main.jsx         # Entry point of the application
├── .gitignore           # Files and folders to be ignored by Git
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration file
```

## Dependencies

### Main Dependencies
*   `@google/genai`: Google GenAI for AI features.
*   `react`: Core React library.
*   `react-dom`: For rendering React components in the DOM.
*   `react-router-dom`: For routing within the React application.

### Development Dependencies
*   `@vitejs/plugin-react`: Vite plugin for React.
*   `vite`: The build tool and development server.

## Build

To create a production build of the application, run the following command:

```sh
npm run build
```

This will create a `dist` directory with the optimized and minified production-ready files.

## Vite Configuration (`vite.config.js`)

The Vite configuration file is set up with the following key options:

*   `base: "./"`: Ensures that asset paths are relative, allowing the built `dist/index.html` to be opened directly from the filesystem (`file://`).
*   `plugins: [react()]`: Enables React support in Vite.
*   `server.port: 5173`: Sets the development server to run on port 5173.
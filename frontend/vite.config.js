import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use relative asset paths so the built `dist/index.html` works when opened
  // directly from the filesystem (file://). If you serve the site from a
  // server, you can remove or change this to the appropriate base path.
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  // base: isProd ? "/se_project_react/" : "/",
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    browser: "chrome",
  },
});

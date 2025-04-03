import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: [
      {
        find: "@data",
        replacement: path.resolve(__dirname, "./data/"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "./stylesheets/"),
      },
      {
        find: "@src",
        replacement: path.resolve(__dirname, "./src/"),
      },
      {
        find: "@public",
        replacement: path.resolve(__dirname, "./public/"),
      },
      {
        find: "@stories",
        replacement: path.resolve(__dirname, "./stories/"),
      },
    ],
  },
  plugins: [react()],
})

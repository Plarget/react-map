import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  server: {
    middlewareMode: false,
    fs: {
      strict: true,
    },
  },
});

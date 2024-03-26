import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {},
    port: 3000,
  },
  plugins: [
    react(),
    basicSsl({
      name: "webforum",
      domains: ["localhost"],
      certDir: "./src/assets/cert",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

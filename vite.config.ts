import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      routes: "/src/routes",
      helpers: "/src/helpers",
      hooks: "/src/hooks",
      state: "/src/state",
      types: "/src/types",
    },
  },
});

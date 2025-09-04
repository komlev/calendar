import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

// @ts-expect-error This is fine
const hasAnalyzer = process.env.ANALYZE;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: true,
      enabled: hasAnalyzer,
    }),
  ],
});

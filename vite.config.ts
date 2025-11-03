import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import pack from "./package.json";

const hasAnalyzer = process.env.ANALYZE;

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      return html.replace(/APP_VERSION/, pack.version);
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: true,
      enabled: !!hasAnalyzer,
    }),
    htmlPlugin(),
  ],
});

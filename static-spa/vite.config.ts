// → remplace vite.config.ts à la racine du projet statique
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Décommentez si le site est servi depuis un sous-dossier de httpdocs :
  // base: "/mon-sous-dossier/",
});

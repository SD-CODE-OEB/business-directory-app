import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import type { ManifestOptions } from "vite-plugin-pwa";

// Inline PWA manifest to avoid TypeScript module declaration issues
const pwaManifest: Partial<ManifestOptions> = {
  name: "Local Business Directory",
  short_name: "BizzFinder",
  theme_color: "#6435ffff",
  background_color: "#ccc",
  start_url: "/",
  scope: "/",
  id: "BizzFinder",
  display: "standalone",
  description:
    "BizzFinder helps you discover local businesses and services with ease.",
  icons: [
    {
      purpose: "any maskable",
      sizes: "192x192",
      src: "bzlogo.jpg",
      type: "image/jpeg",
    },
    {
      purpose: "any maskable",
      sizes: "512x512",
      src: "bzlogo.jpg",
      type: "image/jpeg",
    },
  ],
  screenshots: [
    {
      src: "shot1.png",
      type: "image/png",
      sizes: "1080x1920",
      form_factor: "narrow",
    },
    {
      src: "shot2.png",
      type: "image/png",
      sizes: "1080x1920",
      form_factor: "narrow",
    },
  ],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      injectRegister: "auto", // we'll register '/sw.js' manually in Client.tsx
      manifestFilename: "manifest.webmanifest", // standard filename with correct MIME on most hosts
      includeAssets: ["bzlogo.jpg", "shot1.png", "shot2.png"],
      manifest: pwaManifest,
    }),
  ],
});

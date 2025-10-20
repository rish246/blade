import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        // VitePWA({
        //     registerType: "autoUpdate",
        //     workbox: {
        //         globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        //         navigateFallback: null,
        //         navigateFallbackDenylist: [/^\/api/],
        //         runtimeCaching: [
        //             {
        //                 urlPattern: /^\/api\/.*/,
        //                 handler: "NetworkFirst",
        //                 options: {
        //                     cacheName: "api-cache",
        //                     networkTimeoutSeconds: 10,
        //                 },
        //             },
        //         ],
        //     },
        // }),
    ],
});

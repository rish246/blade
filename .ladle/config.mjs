/** @type {import('@ladle/react').Config} */

// Optional: helpful for debugging paths
// console.log(new URL("./packages/ui", import.meta.url).pathname);

const config = {
    // ✅ include stories from both ui and state packages
    stories: [
        "./packages/ui/stories/**/*.@(tsx|ts|jsx|js|mdx)",
        "./packages/state/stories/**/*.@(tsx|ts|jsx|js|mdx)",
    ],

    // Optional Ladle settings (add these if you want)
    // defaultStory: "index",
    // port: 61000,
    // viteConfig: { ... } // custom vite overrides
};

export default config;

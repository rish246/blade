/** @type {import('@ladle/react').Config} */

const config = {
    stories: [
        "./packages/ui/stories/**/*.@(tsx|ts|jsx|js|mdx)",
        "./packages/state/stories/**/*.@(tsx|ts|jsx|js|mdx)",
    ],
};

export default config;

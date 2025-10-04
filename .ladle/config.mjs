/** @type {import('@ladle/react').Config} */
console.log(new URL("./packages/ui", import.meta.url).pathname);
const config = {
    stories: ["./packages/ui/components/stories/**/*.@(tsx|ts|jsx|js|mdx)"],
};

export default config;

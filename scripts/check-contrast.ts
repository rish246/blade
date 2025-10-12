import { tokens } from "../packages/ui/tokens/tokens";
// ---------- Utils ----------
function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    if (h.length === 3) {
        return [
            parseInt(h[0] + h[0], 16),
            parseInt(h[1] + h[1], 16),
            parseInt(h[2] + h[2], 16),
        ];
    }
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ];
}

function luminance([r, g, b]: [number, number, number]): number {
    const srgb = [r, g, b].map((c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(a: string, b: string): number {
    const lum1 = luminance(hexToRgb(a));
    const lum2 = luminance(hexToRgb(b));
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

// ---------- Checks ----------
const pairs: [string, string, string, number][] = [
    ["text", tokens.colors.text, tokens.colors.bg, 4.5],
    ["muted", tokens.colors.muted, tokens.colors.bg, 3],
    ["accent on bg", tokens.colors.accent, tokens.colors.bg, 4.5],
];

let failed = false;

pairs.forEach(([name, fg, bg, min]) => {
    const ratio = contrastRatio(fg, bg);
    const status = ratio >= min ? "✅ PASS" : "❌ FAIL";
    console.log(`${status} ${name}: ${ratio.toFixed(2)} (needs >= ${min})`);
    if (ratio < min) failed = true;
});

if (failed) {
    console.error("✖ Some contrast checks failed.");
    process.exit(1);
} else {
    console.log("✅ All contrast checks passed.");
    process.exit(0);
}

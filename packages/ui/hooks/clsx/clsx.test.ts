import { expect, describe, it } from "vitest";
import { clsx } from ".";

describe("clsx", () => {
    // Basic functionality
    it("should merge a list of strings to space separated name", () => {
        const merged = clsx("class1", "class2", "class3");
        expect(merged).toBe("class1 class2 class3");
    });

    it("should handle conditional classes", () => {
        const shouldAddClass2 = false;
        const shouldAddClass3 = true;
        const merged = clsx(
            "class1",
            shouldAddClass2 && "class2",
            shouldAddClass3 && "class3",
        );
        expect(merged).toBe("class1 class3");
    });

    it("should handle object keys", () => {
        const shouldAddClass2 = true;
        const num = 2;
        const merged = clsx("class-1", {
            "class-2": shouldAddClass2,
            "class-3": num > 3,
            "class-4": false,
        });

        expect(merged).toBe("class-1 class-2");
    });

    it("should handle array classes", () => {
        const shouldAddClass2 = true;
        const num = 2;
        const merged = clsx("class-1", [
            "class-2",
            shouldAddClass2 && "class-3",
            null,
            num > 3 && true,
        ]);

        expect(merged).toBe("class-1 class-2 class-3");
    });

    it("should handle mixed types", () => {
        const variant = "primary";
        const isActive = false;
        const size = "sm";
        const className = "default";

        const merged = clsx(
            "btn",
            `btn-${variant}`,
            { "btn-active": isActive },
            ["btn-large", `btn-${size}`],
            className,
        );

        expect(merged).toBe("btn btn-primary btn-large btn-sm default");
    });

    // Edge Cases - Falsy Values
    it("should filter out false values", () => {
        const merged = clsx("class1", false, "class2", false);
        expect(merged).toBe("class1 class2");
    });

    it("should filter out null values", () => {
        const merged = clsx("class1", null, "class2", null);
        expect(merged).toBe("class1 class2");
    });

    it("should filter out undefined values", () => {
        const merged = clsx("class1", undefined, "class2", undefined);
        expect(merged).toBe("class1 class2");
    });

    it("should filter out empty strings", () => {
        const merged = clsx("class1", "", "class2", "");
        expect(merged).toBe("class1 class2");
    });

    it("should filter out 0 (zero)", () => {
        const merged = clsx("class1", 0, "class2");
        expect(merged).toBe("class1 class2");
    });

    it("should filter out NaN", () => {
        const merged = clsx("class1", NaN, "class2");
        expect(merged).toBe("class1 class2");
    });

    it("should handle all falsy values together", () => {
        const merged = clsx(
            "class1",
            false,
            null,
            undefined,
            "",
            0,
            NaN,
            "class2",
        );
        expect(merged).toBe("class1 class2");
    });

    // Edge Cases - Empty Inputs
    it("should return empty string when no arguments", () => {
        const merged = clsx();
        expect(merged).toBe("");
    });

    it("should return empty string when all values are falsy", () => {
        const merged = clsx(false, null, undefined, "", 0);
        expect(merged).toBe("");
    });

    it("should handle empty array", () => {
        const merged = clsx([]);
        expect(merged).toBe("");
    });

    it("should handle empty object", () => {
        const merged = clsx({});
        expect(merged).toBe("");
    });

    it("should handle object with all false values", () => {
        const merged = clsx({
            class1: false,
            class2: false,
            class3: false,
        });
        expect(merged).toBe("");
    });

    // Edge Cases - Numbers
    it("should handle positive numbers as strings", () => {
        const merged = clsx("class1", 123, "class2");
        expect(merged).toBe("class1 123 class2");
    });

    it("should handle negative numbers as strings", () => {
        const merged = clsx("class1", -456, "class2");
        expect(merged).toBe("class1 -456 class2");
    });

    it("should handle decimal numbers as strings", () => {
        const merged = clsx("class1", 3.14, "class2");
        expect(merged).toBe("class1 3.14 class2");
    });

    // Edge Cases - Nested Arrays
    it("should handle nested arrays", () => {
        const merged = clsx("class1", ["class2", ["class3", "class4"]]);
        expect(merged).toBe("class1 class2 class3 class4");
    });

    it("should handle deeply nested arrays", () => {
        const merged = clsx("class1", [
            "class2",
            ["class3", ["class4", ["class5"]]],
        ]);
        expect(merged).toBe("class1 class2 class3 class4 class5");
    });

    it("should filter falsy values in nested arrays", () => {
        const merged = clsx("class1", [
            "class2",
            false,
            ["class3", null, "class4"],
        ]);
        expect(merged).toBe("class1 class2 class3 class4");
    });

    // Edge Cases - Complex Objects
    it("should handle objects with numeric keys", () => {
        const merged = clsx({
            class1: true,
            123: true,
            class2: false,
        });
        expect(merged).toBe("123 class1");
    });

    it("should handle objects with special characters in keys", () => {
        const merged = clsx({
            "class-with-dash": true,
            class_with_underscore: true,
            "class.with.dot": true,
            "class:with:colon": false,
        });
        expect(merged).toBe(
            "class-with-dash class_with_underscore class.with.dot",
        );
    });

    it("should handle object with truthy non-boolean values", () => {
        const merged = clsx({
            class1: 1,
            class2: "yes",
            class3: [],
            class4: {},
            class5: false,
        });
        expect(merged).toBe("class1 class2 class3 class4");
    });

    // Edge Cases - Mixed Nested Structures
    it("should handle arrays containing objects", () => {
        const merged = clsx("class1", [
            { class2: true, class3: false },
            "class4",
        ]);
        expect(merged).toBe("class1 class2 class4");
    });

    it("should handle complex nested structures", () => {
        const merged = clsx(
            "base",
            ["variant-primary", { active: true, disabled: false }],
            {
                large: true,
                small: false,
            },
            [["nested", "classes"]],
            "custom",
        );
        expect(merged).toBe(
            "base variant-primary active large nested classes custom",
        );
    });

    // Edge Cases - Whitespace
    it("should handle classes with multiple spaces", () => {
        const merged = clsx("class1", "  class2  ", "class3");
        expect(merged).toBe("class1   class2   class3");
    });

    it("should not trim whitespace from class names", () => {
        const merged = clsx(" class1 ", " class2 ");
        expect(merged).toBe(" class1   class2 ");
    });

    // Edge Cases - Duplicate Classes
    it("should not deduplicate classes", () => {
        const merged = clsx("class1", "class1", "class2", "class1");
        expect(merged).toBe("class1 class1 class2 class1");
    });

    it("should not deduplicate classes from different sources", () => {
        const merged = clsx("btn", { btn: true }, ["btn"]);
        expect(merged).toBe("btn btn btn");
    });

    // Real-World Scenarios
    it("should handle typical button component classes", () => {
        const variant = "primary";
        const size = "lg";
        const disabled = false;
        const loading = true;

        const merged = clsx("btn", `btn-${variant}`, `btn-${size}`, {
            "btn-disabled": disabled,
            "btn-loading": loading,
        });

        expect(merged).toBe("btn btn-primary btn-lg btn-loading");
    });

    it("should handle Tailwind-style utility classes", () => {
        const merged = clsx(
            "px-4 py-2 rounded",
            {
                "bg-blue-500 text-white": true,
                "hover:bg-blue-600": true,
                "disabled:opacity-50": false,
            },
            "font-semibold",
        );

        expect(merged).toBe(
            "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 font-semibold",
        );
    });

    it("should handle form input states", () => {
        const hasError = true;
        const hasSuccess = false;
        const isFocused = true;

        const merged = clsx("input", {
            "input-error": hasError,
            "input-success": hasSuccess,
            "input-focused": isFocused,
        });

        expect(merged).toBe("input input-error input-focused");
    });

    it("should handle modal states", () => {
        const isOpen = true;
        const isClosing = false;
        const size = "md";

        const merged = clsx("modal", `modal-${size}`, {
            "modal-open": isOpen,
            "modal-closing": isClosing,
        });

        expect(merged).toBe("modal modal-md modal-open");
    });

    // Performance Test
    it("should handle large number of classes efficiently", () => {
        const classes = Array.from({ length: 100 }, (_, i) => `class${i}`);
        const merged = clsx(...classes);

        expect(merged.split(" ").length).toBe(100);
        expect(merged).toContain("class0");
        expect(merged).toContain("class99");
    });

    // Type Safety Tests (these ensure the function accepts various types)
    it("should accept string literals", () => {
        const merged = clsx("literal");
        expect(merged).toBe("literal");
    });

    it("should accept template literals", () => {
        const variant = "primary";
        const merged = clsx(`btn-${variant}`);
        expect(merged).toBe("btn-primary");
    });

    it("should accept boolean expressions", () => {
        const merged = clsx(true && "class1", false && "class2");
        expect(merged).toBe("class1");
    });

    it("should accept ternary expressions", () => {
        const isPrimary = true;
        const merged = clsx(isPrimary ? "primary" : "secondary");
        expect(merged).toBe("primary");
    });

    // Edge Case - Single Argument of Each Type
    it("should handle single string", () => {
        expect(clsx("class")).toBe("class");
    });

    it("should handle single object", () => {
        expect(clsx({ class1: true, class2: false })).toBe("class1");
    });

    it("should handle single array", () => {
        expect(clsx(["class1", "class2"])).toBe("class1 class2");
    });

    it("should handle single number", () => {
        expect(clsx(42)).toBe("42");
    });

    it("should handle single boolean (false)", () => {
        expect(clsx(false)).toBe("");
    });
});

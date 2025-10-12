type ClassName =
    | string
    | boolean
    | Record<string, unknown>
    | null
    | undefined
    | number
    | ClassName[];

export const clsx = (...classes: Array<ClassName>): string => {
    return classes
        .map((cls) => {
            if (cls == null) {
                return cls;
            }

            if (typeof cls === "boolean") {
                return "";
            }

            if (Array.isArray(cls)) {
                return clsx(...cls);
            }

            if (typeof cls === "object") {
                const classesToApply = Object.keys(cls).map((key) => {
                    if (Boolean(cls[key])) {
                        return key;
                    }
                    return "";
                });
                return clsx(...classesToApply);
            }

            return cls;
        })
        .filter((cls) => {
            return Boolean(cls);
        })
        .join(" ");
};

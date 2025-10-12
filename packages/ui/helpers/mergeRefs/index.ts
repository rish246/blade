import { Ref, RefCallback } from "react";

export const mergeRefs = <T>(...refs: Array<Ref<T | null>>): RefCallback<T> => {
    return (node: T) => {
        for (let ref of refs) {
            // ref can either be RefObject or RefCallback
            if (typeof ref === "function") {
                ref(node);
            } else if (ref != null) {
                ref.current = node;
            }
        }
    };
};

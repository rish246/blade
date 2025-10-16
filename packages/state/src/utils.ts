// TODO: Later we can optimize it and create a treewalker type algorithm
export const deepEqualObject = (first: Object, second: Object): boolean => {
    return JSON.stringify(first) === JSON.stringify(second);
};

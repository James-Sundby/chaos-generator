export function randomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("randomElement expects a non-empty array.");
    }

    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
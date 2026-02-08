export function randomElement(array, rng = Math.random) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("randomElement expects a non-empty array.");
    }

    const index = Math.floor(rng() * array.length);
    return array[index];
}
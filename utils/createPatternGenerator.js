import "server-only";

import { randomElement } from "@/utils/randomElement";

export function createPatternGenerator({
    patterns,
    excludedByColourMode = {},
}) {
    return (settings, { rng = Math.random } = {}) => {
        const colourMode = settings?.colourMode ?? "default";
        const excluded = excludedByColourMode[colourMode] ?? new Set();

        const filtered = patterns.filter((pattern) => !excluded.has(pattern));
        const allowed = filtered.length ? filtered : patterns;

        return randomElement(allowed, rng);
    };
}
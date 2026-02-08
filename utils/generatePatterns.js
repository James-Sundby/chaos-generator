import "server-only";

import { randomElement } from "@/utils/randomElement";
import { chaosPatterns, patterns as loyalistPatterns } from "@/lib/armourPatterns";

const NON_CONTRAST_LOYALIST_PATTERNS = new Set([
    "Half", "Quarter"
]);

const NON_CONTRAST_CHAOS_PATTERNS = new Set([
    "Half", "Quarter", "Alternating",
]);

function filterPatterns(list, bannedSet) {
    const filtered = list.filter((p) => !bannedSet.has(p));
    return filtered.length ? filtered : list;
}

function getLoyalistPatterns(settings) {
    const mode = settings?.colourMode ?? "default";

    if (mode === "contrast") {
        return filterPatterns(loyalistPatterns, NON_CONTRAST_LOYALIST_PATTERNS);
    }

    return loyalistPatterns;
}

function getChaosPatterns(settings) {
    const mode = settings?.colourMode ?? "default";

    if (mode === "contrast") {
        return filterPatterns(chaosPatterns, NON_CONTRAST_CHAOS_PATTERNS);
    }

    return chaosPatterns;
}

export function generateLoyalistPattern(settings) {
    return randomElement(getLoyalistPatterns(settings));
}

export function generateChaosPattern(settings) {
    return randomElement(getChaosPatterns(settings));
}
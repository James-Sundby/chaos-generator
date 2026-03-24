import "server-only";

import { randomElement } from "@/utils/randomElement";
import { chaosPatterns, patterns as loyalistPatterns, eldarPatterns, sistersPatterns } from "@/lib/data/armourPatterns";

const NON_CONTRAST_LOYALIST_PATTERNS = new Set([
    "Half", "Quarter"
]);

const NON_CONTRAST_CHAOS_PATTERNS = new Set([
    "Half", "Quarter", "Alternating",
]);

const NON_CONTRAST_ELDAR_PATTERNS = new Set([
    "5", "8"
]);

const NON_CONTRAST_SISTERS_PATTERNS = new Set();

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

function getEldarPatterns(settings) {
    const mode = settings?.colourMode ?? "default";

    if (mode === "contrast") {
        return filterPatterns(eldarPatterns, NON_CONTRAST_ELDAR_PATTERNS);
    }

    return eldarPatterns;
}

function getSistersPatterns(settings) {
    const mode = settings?.colourMode ?? "default";

    return sistersPatterns;
}

export function generateLoyalistPattern(settings) {
    return randomElement(getLoyalistPatterns(settings));
}

export function generateChaosPattern(settings) {
    return randomElement(getChaosPatterns(settings));
}

export function generateEldarPattern(settings) {
    return randomElement(getEldarPatterns(settings));
}

export function generateSistersPattern(settings) {
    return randomElement(getSistersPatterns(settings));
}
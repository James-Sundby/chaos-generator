import "server-only";

import { colourList } from "@/lib/data/colours";
import { generateChapterSchemeColours, generateChaosSchemeColours, generateEldarSchemeColours, generateSistersSchemeColours } from "./colourTools";

function prepPool(list) {
    const metallic = [];
    const nonMetallic = [];
    const accentCandidates = [];

    for (const c of list) {
        if (c.type === "Metallic") {
            metallic.push(c);
        } else {
            nonMetallic.push(c);

            if (c.s > 30 && c.l > 30) {
                accentCandidates.push(c);
            }
        }
    }

    return Object.freeze({
        all: list,
        metallic,
        nonMetallic,
        accentCandidates,
    });
}

const POOLS = {
    default: prepPool(colourList.filter((c) => c.type !== "Contrast")),
    contrast: prepPool(colourList.filter((c) => c.type === "Contrast")),
    sm2: prepPool(colourList.filter((c) => c.inSM2)),
};

function getPool(settings) {
    const mode = settings?.colourMode ?? "default";
    return POOLS[mode] ?? POOLS.default;
}

function weightedRandomSelect(strategies, rng = Math.random) {
    const totalWeight = strategies.reduce((sum, s) => sum + s.weight, 0);
    const roll = rng() * totalWeight;

    let cumulative = 0;
    for (const strategy of strategies) {
        cumulative += strategy.weight;
        if (roll < cumulative) return strategy;
    }
    return strategies[strategies.length - 1];
}

function schemeGenerator(strategies) {
    return (settings, { rng = Math.random } = {}) => {
        const pool = getPool(settings);
        const strategy = weightedRandomSelect(strategies, rng);
        const colours = strategy.fn(pool, rng);
        return { colours, mode: strategy.mode };
    };
}

const chaosStrategies = [
    { mode: "random", weight: 2, fn: (pool, rng) => generateChaosSchemeColours("random", { pool, rng }) },
    { mode: "complementary", weight: 3, fn: (pool, rng) => generateChaosSchemeColours("complementary", { pool, rng }) },
    { mode: "splitcomplementary", weight: 4, fn: (pool, rng) => generateChaosSchemeColours("splitcomplementary", { pool, rng }) },
    { mode: "triadic", weight: 1, fn: (pool, rng) => generateChaosSchemeColours("triadic", { pool, rng }) },
    { mode: "tetradic", weight: 1, fn: (pool, rng) => generateChaosSchemeColours("tetradic", { pool, rng }) },
    { mode: "analogous", weight: 2, fn: (pool, rng) => generateChaosSchemeColours("analogous", { pool, rng }) },
];

const chapterStrategies = [
    { mode: "random", weight: 2, fn: (pool, rng) => generateChapterSchemeColours("random", { pool, rng }) },
    { mode: "complementary", weight: 3, fn: (pool, rng) => generateChapterSchemeColours("complementary", { pool, rng }) },
    { mode: "splitcomplementary", weight: 1, fn: (pool, rng) => generateChapterSchemeColours("splitcomplementary", { pool, rng }) },
    { mode: "triadic", weight: 1, fn: (pool, rng) => generateChapterSchemeColours("triadic", { pool, rng }) },
    { mode: "analogous", weight: 2, fn: (pool, rng) => generateChapterSchemeColours("analogous", { pool, rng }) },
];

const eldarStrategies = [
    { mode: "random", weight: 2, fn: (pool, rng) => generateEldarSchemeColours("random", { pool, rng }) },
    { mode: "complementary", weight: 3, fn: (pool, rng) => generateEldarSchemeColours("complementary", { pool, rng }) },
    { mode: "analogous", weight: 2, fn: (pool, rng) => generateEldarSchemeColours("analogous", { pool, rng }) },
];

const sistersStrategies = [
    { mode: "random", weight: 1, fn: (pool, rng) => generateSistersSchemeColours("random", { pool, rng }) },
    { mode: "complementary", weight: 4, fn: (pool, rng) => generateSistersSchemeColours("complementary", { pool, rng }) },
    { mode: "analogous", weight: 3, fn: (pool, rng) => generateSistersSchemeColours("analogous", { pool, rng }) },
];


export const generateWarbandScheme = schemeGenerator(chaosStrategies);
export const generateChapterScheme = schemeGenerator(chapterStrategies);
export const generateEldarScheme = schemeGenerator(eldarStrategies);
export const generateSistersScheme = schemeGenerator(sistersStrategies);
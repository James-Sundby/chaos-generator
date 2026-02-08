import "server-only";

import { colourList } from "@/lib/colours";
import {
    generateComplementaryColours,
    generateSplitComplementaryColours,
    generateTriadicColours,
    generateTetradicColours,
    generateAnalogousColours,
    generateFullyRandomColours
} from "@/utils/colourTools";

function prepPool(list) {
    const metallic = [];
    const accentCandidates = [];

    for (const c of list) {
        if (c.type === "Metallic") metallic.push(c);
        if (c.type !== "Metallic" && c.s > 30 && c.l > 30) accentCandidates.push(c);
    }

    return Object.freeze({
        all: list,
        metallic,
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
    { mode: "random", weight: 2, fn: (pool, rng) => generateFullyRandomColours(4, { pool, rng }) },
    { mode: "complementary", weight: 3, fn: (pool, rng) => generateComplementaryColours({ pool, rng }) },
    { mode: "splitcomplementary", weight: 4, fn: (pool, rng) => generateSplitComplementaryColours({ pool, rng }) },
    { mode: "triadic", weight: 1, fn: (pool, rng) => generateTriadicColours({ pool, rng }) },
    { mode: "tetradic", weight: 1, fn: (pool, rng) => generateTetradicColours({ pool, rng }) },
    { mode: "analogous", weight: 2, fn: (pool, rng) => generateAnalogousColours({ pool, rng }) },
];

export const generateWarbandScheme = schemeGenerator(chaosStrategies);

const loyalistStrategies = [
    { mode: "random", weight: 2, fn: (pool, rng) => generateFullyRandomColours(3, { pool, rng }) },
    { mode: "complementary", weight: 3, fn: (pool, rng) => generateComplementaryColours({ withAccent: false, pool, rng }) },
    { mode: "splitcomplementary", weight: 1, fn: (pool, rng) => generateSplitComplementaryColours({ withAccent: false, pool, rng }) },
    { mode: "triadic", weight: 1, fn: (pool, rng) => generateTriadicColours({ withAccent: false, pool, rng }) },
    { mode: "analogous", weight: 2, fn: (pool, rng) => generateAnalogousColours({ withAccent: false, pool, rng }) },
];

export const generateChapterScheme = schemeGenerator(loyalistStrategies);
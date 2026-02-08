import "server-only";

import {
    generateComplementaryColours,
    generateSplitComplementaryColours,
    generateTriadicColours,
    generateTetradicColours,
    generateAnalogousColours,
    generateFullyRandomColours
} from "@/utils/colourTools";

import { colourList } from "@/lib/colours";

function getPool(settings) {
    const mode = settings?.colourMode ?? "default";

    if (mode === "default") {
        return colourList.filter(colour => colour.type !== "Contrast");
    }
    if (mode === "contrast") {
        return colourList.filter(colour => colour.type === "Contrast");
    }
    if (mode === "sm2") {
        return colourList.filter(colour => colour.inSM2);
    }
    return colourList;
}


function schemeGenerator(strategies) {
    return (settings) => {
        const pool = getPool(settings);

        const bound = strategies.map(s => ({
            ...s,
            fn: () => s.fn(pool),
        }));

        return generateColours(bound);
    };
}

function generateColours(strategies) {
    const strategy = weightedRandomSelect(strategies);
    const colours = strategy.fn();
    return { colours, mode: strategy.mode };
}

function weightedRandomSelect(strategies) {
    const totalWeight = strategies.reduce((sum, s) => sum + s.weight, 0);
    const roll = Math.random() * totalWeight;
    let cumulative = 0;

    for (const strategy of strategies) {
        cumulative += strategy.weight;
        if (roll < cumulative) return strategy;
    }

    return strategies[strategies.length - 1];
}

const chaosStrategies = [
    { mode: "random", weight: 2, fn: (pool) => generateFullyRandomColours(4, { pool }) },
    { mode: "complementary", weight: 3, fn: (pool) => generateComplementaryColours({ pool }) },
    { mode: "splitcomplementary", weight: 4, fn: (pool) => generateSplitComplementaryColours({ pool }) },
    { mode: "triadic", weight: 1, fn: (pool) => generateTriadicColours({ pool }) },
    { mode: "tetradic", weight: 1, fn: (pool) => generateTetradicColours({ pool }) },
    { mode: "analogous", weight: 2, fn: (pool) => generateAnalogousColours({ pool }) },
];

export const generateWarbandScheme = schemeGenerator(chaosStrategies);

const loyalistStrategies = [
    { mode: "random", weight: 2, fn: (pool) => generateFullyRandomColours(3, { pool }) },
    { mode: "complementary", weight: 3, fn: (pool) => generateComplementaryColours({ withAccent: false, pool }) },
    { mode: "splitcomplementary", weight: 1, fn: (pool) => generateSplitComplementaryColours({ withAccent: false, pool }) },
    { mode: "triadic", weight: 1, fn: (pool) => generateTriadicColours({ withAccent: false, pool }) },
    { mode: "analogous", weight: 2, fn: (pool) => generateAnalogousColours({ withAccent: false, pool }) },
];

export const generateChapterScheme = schemeGenerator(loyalistStrategies);
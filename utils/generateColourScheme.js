import {
    generateComplementaryColours,
    generateSplitComplementaryColours,
    generateTriadicColours,
    generateTetradicColours,
    generateAnalogousColours,
    generateFullyRandomColours
} from "@/utils/colourTools";

function schemeGenerator(strategies) {
    return () => generateColours(strategies);
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
    { mode: "random", weight: 2, fn: () => generateFullyRandomColours(4) },
    { mode: "complementary", weight: 3, fn: () => generateComplementaryColours() },
    { mode: "splitcomplementary", weight: 4, fn: () => generateSplitComplementaryColours() },
    { mode: "triadic", weight: 1, fn: () => generateTriadicColours() },
    { mode: "tetradic", weight: 1, fn: () => generateTetradicColours() },
    { mode: "analogous", weight: 2, fn: () => generateAnalogousColours() },
];

export const generateWarbandScheme = schemeGenerator(chaosStrategies);


const loyalistStrategies = [
    { mode: "random", weight: 2, fn: () => generateFullyRandomColours(3) },
    { mode: "complementary", weight: 3, fn: () => generateComplementaryColours({ withAccent: false }) },
    { mode: "splitcomplementary", weight: 1, fn: () => generateSplitComplementaryColours({ withAccent: false }) },
    { mode: "triadic", weight: 1, fn: () => generateTriadicColours({ withAccent: false }) },
    { mode: "analogous", weight: 2, fn: () => generateAnalogousColours({ withAccent: false }) },
];

export const generateChapterScheme = schemeGenerator(loyalistStrategies);
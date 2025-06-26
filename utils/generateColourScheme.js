import {
    generateComplementaryColours,
    generateSplitComplementaryColours,
    generateTriadicColours,
    generateTetradicColours,
    generateAnalogousColours,
    generateFullyRandomColours
} from "@/utils/generateColours";

const generationStrategies = [
    { mode: "random", weight: 2, fn: generateFullyRandomColours },
    { mode: "complementary", weight: 3, fn: generateComplementaryColours },
    { mode: "split-complementary", weight: 4, fn: generateSplitComplementaryColours },
    { mode: "triadic", weight: 1, fn: generateTriadicColours },
    { mode: "tetradic", weight: 1, fn: generateTetradicColours },
    { mode: "analogous", weight: 2, fn: generateAnalogousColours },
];

export function weightedRandomSelect(strategies) {
    const totalWeight = strategies.reduce((sum, s) => sum + s.weight, 0);
    const roll = Math.random() * totalWeight;
    let cumulative = 0;

    for (const strategy of strategies) {
        cumulative += strategy.weight;
        if (roll < cumulative) return strategy;
    }
}

export function generateRandomColours() {
    const strategy = weightedRandomSelect(generationStrategies);
    const colours = strategy.fn();
    return { colours, mode: strategy.mode };
}
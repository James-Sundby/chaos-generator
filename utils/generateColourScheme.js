import {
    generateComplementaryColors,
    generateSplitComplementaryColors,
    generateTriadicColors,
    generateTetradicColors,
    generateAnalogousColors,
    generateFullyRandomColors
} from "@/utils/generateColours";

const generationStrategies = [
    { mode: "random", weight: 2, fn: generateFullyRandomColors },
    { mode: "complementary", weight: 3, fn: generateComplementaryColors },
    { mode: "split-complementary", weight: 4, fn: generateSplitComplementaryColors },
    { mode: "triadic", weight: 1, fn: generateTriadicColors },
    { mode: "tetradic", weight: 1, fn: generateTetradicColors },
    { mode: "analogous", weight: 2, fn: generateAnalogousColors },
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

export function generateRandomColors() {
    const strategy = weightedRandomSelect(generationStrategies);
    const colors = strategy.fn();
    return { colors, mode: strategy.mode };
}
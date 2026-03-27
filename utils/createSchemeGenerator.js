import "server-only";

import { colourList } from "@/lib/data/colours";

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

export function createSchemeGenerator(strategies) {
    return (settings, { rng = Math.random } = {}) => {
        const pool = getPool(settings);
        const strategy = weightedRandomSelect(strategies, rng);
        const colours = strategy.fn(pool, rng);

        return {
            colours,
            mode: strategy.mode,
        };
    };
}
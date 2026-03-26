import "server-only";

import { createSchemeGenerator } from "@/utils/createSchemeGenerator";
import { makeUsedSet, getMetalColour, getAccentColour, resolvePool, getAnchorsByHarmony } from "@/utils/colourTools";
import { factionModes } from "./modes";

function generateChaosSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;

    switch (harmony) {
        case "complementary": {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            const accent = getAccentColour(p, [primary, secondary, metal]);
            return [primary, secondary, metal, accent];
        }

        case "splitcomplementary":
        case "triadic":
        case "analogous": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        case "tetradic": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = anchors[3] ?? getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        case "random": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        default: {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            const accent = getAccentColour(p, [primary, secondary, metal]);
            return [primary, secondary, metal, accent];
        }
    }
}

const weightsByMode = {
    random: 2,
    complementary: 3,
    splitcomplementary: 4,
    triadic: 1,
    tetradic: 1,
    analogous: 2,
};

const strategies = factionModes.map((mode) => ({
    mode,
    weight: weightsByMode[mode],
    fn: (pool, rng) => generateChaosSchemeColours(mode, { pool, rng }),
}));

export const generateScheme = createSchemeGenerator(strategies);
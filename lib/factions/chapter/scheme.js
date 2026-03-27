import "server-only";

import { createSchemeGenerator } from "@/utils/createSchemeGenerator";
import { resolvePool, getAnchorsByHarmony, makeUsedSet, getMetalColour } from "@/utils/colourTools";
import { factionModes } from "./modes";

function generateChapterSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;

    switch (harmony) {
        case "random":
        case "complementary": {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            return [primary, secondary, metal];
        }

        case "splitcomplementary":
        case "triadic":
        case "analogous": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            return [primary, secondary, tertiary];
        }

        default: {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            return [primary, secondary, metal];
        }
    }
}

const weightsByMode = {
    random: 2,
    complementary: 3,
    splitcomplementary: 1,
    triadic: 1,
    analogous: 2,
};

const strategies = factionModes.map((mode) => ({
    mode,
    weight: weightsByMode[mode],
    fn: (pool, rng) => generateChapterSchemeColours(mode, { pool, rng }),
}));

export const generateScheme = createSchemeGenerator(strategies);
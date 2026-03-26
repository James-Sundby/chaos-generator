import "server-only";

import { createSchemeGenerator } from "@/utils/createSchemeGenerator";
import { resolvePool, getAnchorsByHarmony, getAccentColour } from "@/utils/colourTools";
import { factionModes } from "./modes";

function generateEldarSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;
    const accent = getAccentColour(p, [primary, secondary]);

    return [primary, secondary, accent];
}

const weightsByMode = {
    random: 2,
    complementary: 3,
    analogous: 2,
};

const strategies = factionModes.map((mode) => ({
    mode,
    weight: weightsByMode[mode],
    fn: (pool, rng) => generateEldarSchemeColours(mode, { pool, rng }),
}));


export const generateScheme = createSchemeGenerator(strategies);
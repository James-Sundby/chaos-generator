import { meta as chapterMeta } from "./chapter/meta";
import { patterns as chapterPatterns } from "./chapter/patternOptions";
import { factionModes as chapterModes } from "./chapter/modes";

import { meta as chaosMeta } from "./chaos/meta";
import { patterns as chaosPatterns } from "./chaos/patternOptions";
import { factionModes as chaosModes } from "./chaos/modes";

import { meta as eldarMeta } from "./eldar/meta";
import { patterns as eldarPatterns } from "./eldar/patternOptions";
import { factionModes as eldarModes } from "./eldar/modes";

import { meta as sistersMeta } from "./sisters/meta";
import { patterns as sistersPatterns } from "./sisters/patternOptions";
import { factionModes as sistersModes } from "./sisters/modes";

export const publicFactionRegistry = {
    chapter: {
        meta: chapterMeta,
        patterns: chapterPatterns,
        modes: chapterModes,
    },

    chaos: {
        meta: chaosMeta,
        patterns: chaosPatterns,
        modes: chaosModes,
    },

    eldar: {
        meta: eldarMeta,
        patterns: eldarPatterns,
        modes: eldarModes,
    },

    sisters: {
        meta: sistersMeta,
        patterns: sistersPatterns,
        modes: sistersModes,
    },
};

export function getPublicFaction(faction) {
    const entry = publicFactionRegistry[faction];

    if (!entry) {
        throw new Error("bad-faction");
    }

    return entry;
}

export const factionMeta = Object.fromEntries(
    Object.entries(publicFactionRegistry).map(([key, value]) => [key, value.meta])
);

export function getFactionMeta(faction) {
    return getPublicFaction(faction).meta;
}
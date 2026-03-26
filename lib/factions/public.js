import { meta as chapterMeta } from "./chapter/meta";
import { modelConfig as chapterModelConfig } from "./chapter/model";
import { patterns as chapterPatterns } from "./chapter/patternOptions";
import { factionModes as chapterModes } from "./chapter/modes";

import { meta as chaosMeta } from "./chaos/meta";
import { modelConfig as chaosModelConfig } from "./chaos/model";
import { patterns as chaosPatterns } from "./chaos/patternOptions";
import { factionModes as chaosModes } from "./chaos/modes";

import { meta as eldarMeta } from "./eldar/meta";
import { modelConfig as eldarModelConfig } from "./eldar/model";
import { patterns as eldarPatterns } from "./eldar/patternOptions";
import { factionModes as eldarModes } from "./eldar/modes";

import { meta as sistersMeta } from "./sisters/meta";
import { modelConfig as sistersModelConfig } from "./sisters/model";
import { patterns as sistersPatterns } from "./sisters/patternOptions";
import { factionModes as sistersModes } from "./sisters/modes";

export const publicFactionRegistry = {
    chapter: {
        meta: chapterMeta,
        modelConfig: chapterModelConfig,
        patterns: chapterPatterns,
        modes: chapterModes,
    },
    chaos: {
        meta: chaosMeta,
        modelConfig: chaosModelConfig,
        patterns: chaosPatterns,
        modes: chaosModes,
    },
    eldar: {
        meta: eldarMeta,
        modelConfig: eldarModelConfig,
        patterns: eldarPatterns,
        modes: eldarModes,
    },
    sisters: {
        meta: sistersMeta,
        modelConfig: sistersModelConfig,
        patterns: sistersPatterns,
        modes: sistersModes,
    },
};

export function getPublicFaction(faction) {
    const entry = publicFactionRegistry[faction];
    if (!entry) throw new Error("bad-faction");
    return entry;
}
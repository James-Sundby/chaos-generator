import "server-only";

import { meta as chapterMeta } from "./chapter/meta";
import { generateName as generateChapterName } from "./chapter/names";
import { patterns as chapterPatterns } from "./chapter/patternOptions";
import { generatePattern as generateChapterPattern } from "./chapter/patterns";
import { generateScheme as generateChapterScheme } from "./chapter/scheme";
import { factionModes as chapterModes } from "./chapter/modes";

import { meta as chaosMeta } from "./chaos/meta";
import { generateName as generateChaosName } from "./chaos/names";
import { patterns as chaosPatterns } from "./chaos/patternOptions";
import { generatePattern as generateChaosPattern } from "./chaos/patterns";
import { generateScheme as generateChaosScheme } from "./chaos/scheme";
import { factionModes as chaosModes } from "./chaos/modes";

import { meta as eldarMeta } from "./eldar/meta";
import { generateName as generateEldarName } from "./eldar/names";
import { patterns as eldarPatterns } from "./eldar/patternOptions";
import { generatePattern as generateEldarPattern } from "./eldar/patterns";
import { generateScheme as generateEldarScheme } from "./eldar/scheme";
import { factionModes as eldarModes } from "./eldar/modes";

import { meta as sistersMeta } from "./sisters/meta";
import { generateName as generateSistersName } from "./sisters/names";
import { patterns as sistersPatterns } from "./sisters/patternOptions";
import { generatePattern as generateSistersPattern } from "./sisters/patterns";
import { generateScheme as generateSistersScheme } from "./sisters/scheme";
import { factionModes as sistersModes } from "./sisters/modes";

export const factionRegistry = {
    chapter: {
        meta: chapterMeta,
        patterns: chapterPatterns,
        modes: chapterModes,
        generateName: generateChapterName,
        generatePattern: generateChapterPattern,
        generateScheme: generateChapterScheme,
    },

    chaos: {
        meta: chaosMeta,
        patterns: chaosPatterns,
        modes: chaosModes,
        generateName: generateChaosName,
        generatePattern: generateChaosPattern,
        generateScheme: generateChaosScheme,
    },

    eldar: {
        meta: eldarMeta,
        patterns: eldarPatterns,
        modes: eldarModes,
        generateName: generateEldarName,
        generatePattern: generateEldarPattern,
        generateScheme: generateEldarScheme,
    },

    sisters: {
        meta: sistersMeta,
        patterns: sistersPatterns,
        modes: sistersModes,
        generateName: generateSistersName,
        generatePattern: generateSistersPattern,
        generateScheme: generateSistersScheme,
    },
};

export function getServerFaction(faction) {
    const entry = factionRegistry[faction];

    if (!entry) {
        throw new Error("bad-faction");
    }

    return entry;
}
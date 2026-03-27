import { colourList } from "@/lib/data/colours";
import { patterns as chapterPatterns } from "@/lib/factions/chapter/patternOptions";
import { patterns as chaosPatterns } from "@/lib/factions/chaos/patternOptions";
import { patterns as sistersPatterns } from "@/lib/factions/sisters/patternOptions";
import { patterns as eldarPatterns } from "@/lib/factions/eldar/patternOptions";

import {
    groupedColors,
    nonMetallics,
    nonMetallicPool,
} from "@/lib/customizers/paletteConfig";

export const customizerRegistry = {
    chapter: {
        patterns: chapterPatterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: () => groupedColors,
        randomPoolForIndex: () => colourList,
    },

    chaos: {
        patterns: chaosPatterns,
        hideSecondaryWhenBasic: true,
        paletteOptionsForIndex: (i) => (i === 3 ? nonMetallics : groupedColors),
        randomPoolForIndex: (i) => (i === 3 ? nonMetallicPool : colourList),
    },

    sisters: {
        patterns: sistersPatterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: (i) =>
            i === 1 || i === 3 ? nonMetallics : groupedColors,
        randomPoolForIndex: (i) =>
            i === 1 || i === 3 ? nonMetallicPool : colourList,
    },

    eldar: {
        patterns: eldarPatterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: (i) => (i === 2 ? nonMetallics : groupedColors),
        randomPoolForIndex: (i) => (i === 2 ? nonMetallicPool : colourList),
    },
};
import { patterns, chaosPatterns, sistersPatterns, eldarPatterns } from "@/lib/data/armourPatterns";
import { colourList } from "@/lib/data/colours";

import {
    groupedColors,
    nonMetallics,
    nonMetallicPool,
} from "@/lib/customizers/paletteConfig";


export const customizerRegistry = {
    chapter: {
        patterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: () => groupedColors,
        randomPoolForIndex: () => colourList,
    },

    chaos: {
        patterns: chaosPatterns,
        hideSecondaryWhenBasic: true,
        paletteOptionsForIndex: (i) => (i === 3 ? nonMetallics : groupedColors),
        randomPoolForIndex: (i) =>
            i === 3 ? nonMetallicPool : colourList,
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
        randomPoolForIndex: (i) =>
            i === 2 ? nonMetallicPool : colourList,
    },
};
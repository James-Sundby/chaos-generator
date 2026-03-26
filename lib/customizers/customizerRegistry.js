import { colourList } from "@/lib/data/colours";
import { publicFactionRegistry } from "@/lib/factions/public";

import {
    groupedColors,
    nonMetallics,
    nonMetallicPool,
} from "@/lib/customizers/paletteConfig";

const { chapter, chaos, sisters, eldar } = publicFactionRegistry;

export const customizerRegistry = {
    chapter: {
        patterns: chapter.patterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: () => groupedColors,
        randomPoolForIndex: () => colourList,
    },

    chaos: {
        patterns: chaos.patterns,
        hideSecondaryWhenBasic: true,
        paletteOptionsForIndex: (i) => (i === 3 ? nonMetallics : groupedColors),
        randomPoolForIndex: (i) => (i === 3 ? nonMetallicPool : colourList),
    },

    sisters: {
        patterns: sisters.patterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: (i) =>
            i === 1 || i === 3 ? nonMetallics : groupedColors,
        randomPoolForIndex: (i) =>
            i === 1 || i === 3 ? nonMetallicPool : colourList,
    },

    eldar: {
        patterns: eldar.patterns,
        hideSecondaryWhenBasic: false,
        paletteOptionsForIndex: (i) => (i === 2 ? nonMetallics : groupedColors),
        randomPoolForIndex: (i) => (i === 2 ? nonMetallicPool : colourList),
    },
};
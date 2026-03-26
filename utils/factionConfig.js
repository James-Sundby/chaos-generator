import "server-only";
import { cache } from "react";
import { colourList } from "@/lib/data/colours";
import { patterns as loyalistPatterns, chaosPatterns, eldarPatterns, sistersPatterns } from "@/lib/data/armourPatterns";
import { chapterModes, chaosModes, eldarModes, sistersModes } from "@/lib/data/modes";
import { generateChapterName, generateWarbandName, generateEldarName, generateSistersName } from "@/utils/generateNames";
import { generateChapterScheme, generateWarbandScheme, generateEldarScheme, generateSistersScheme } from "@/utils/generateColourScheme";
import { generateLoyalistPattern, generateChaosPattern, generateEldarPattern, generateSistersPattern } from "@/utils/generatePatterns";

const getColourMap = cache(() =>
    Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]))
);

export const getFactionConfig = cache(() => {
    const colourMap = getColourMap();

    return {
        chapter: {
            slug: "chapter",
            colourCount: 3,
            patternsSet: new Set(loyalistPatterns.map(p => p.toLowerCase())),
            modesSet: new Set(chapterModes.map(m => m.toLowerCase())),
            generateName: generateChapterName,
            generateScheme: generateChapterScheme,
            generatePattern: generateLoyalistPattern,
            resultKey: "chapter",
            displayNameKey: "name",
            colourMap,
        },
        chaos: {
            slug: "chaos",
            colourCount: 4,
            patternsSet: new Set(chaosPatterns.map(p => p.toLowerCase())),
            modesSet: new Set(chaosModes.map(m => m.toLowerCase())),
            generateName: generateWarbandName,
            generateScheme: generateWarbandScheme,
            generatePattern: generateChaosPattern,
            resultKey: "chaos",
            displayNameKey: "name",
            colourMap,
        },
        eldar: {
            slug: "eldar",
            colourCount: 3,
            patternsSet: new Set(eldarPatterns.map(p => p.toLowerCase())),
            modesSet: new Set(eldarModes.map(m => m.toLowerCase())),
            generateName: generateEldarName,
            generateScheme: generateEldarScheme,
            generatePattern: generateEldarPattern,
            resultKey: "eldar",
            displayNameKey: "name",
            colourMap,
        },

        sisters: {
            slug: "sisters",
            colourCount: 4,
            patternsSet: new Set(sistersPatterns.map((p) => p.toLowerCase())),
            modesSet: new Set(sistersModes.map((m) => m.toLowerCase())),
            generateName: generateSistersName,
            generateScheme: generateSistersScheme,
            generatePattern: generateSistersPattern,
            resultKey: "sisters",
            displayNameKey: "name",
            colourMap,
        },
    };
});
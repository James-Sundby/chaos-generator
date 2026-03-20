import "server-only";
import { cache } from "react";
import { colourList } from "@/lib/colours";
import { patterns as loyalistPatterns, chaosPatterns, eldarPatterns } from "@/lib/armourPatterns";
import { chapterModes, chaosModes, eldarModes } from "@/lib/modes";
import { generateChapterName, generateWarbandName, generateEldarName } from "@/utils/generateNames";
import { generateChapterScheme, generateWarbandScheme, generateEldarScheme } from "@/utils/generateColourScheme";
import { generateLoyalistPattern, generateChaosPattern, generateEldarPattern } from "@/utils/generatePatterns";

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
            displayNameKey: "warbandName",
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
            resultKey: "band",
            displayNameKey: "warbandName",
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
            resultKey: "warhost",
            displayNameKey: "warbandName",
            colourMap,
        },
    };
});
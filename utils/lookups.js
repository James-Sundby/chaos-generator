import "server-only";
import { cache } from "react";
import { colourList } from "@/lib/colours";
import { patterns as loyalistPatterns, chaosPatterns } from "@/lib/armourPatterns";
import { chapterModes, chaosModes } from "@/lib/modes";

export const getLoyalistLookups = cache(() => {
    const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
    const patternsSet = new Set(loyalistPatterns.map(p => p.toLowerCase()));
    const modesSet = new Set(chapterModes.map(m => m.toLowerCase()));
    return { colourMap, patternsSet, modesSet };
});

export const getChaosLookups = cache(() => {
    const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
    const patternsSet = new Set(chaosPatterns.map(p => p.toLowerCase()));
    const modesSet = new Set(chaosModes.map(m => m.toLowerCase()));
    return { colourMap, patternsSet, modesSet };
});

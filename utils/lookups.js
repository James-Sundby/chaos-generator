import "server-only";
import { cache } from "react";
import { colourList } from "@/lib/colours";
import { patterns as loyalistPatterns, chaosPatterns, eldarPatterns } from "@/lib/armourPatterns";
import { chapterModes, chaosModes, eldarModes } from "@/lib/modes";

const getColourMap = cache(() =>
    Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]))
);

export const getLoyalistLookups = cache(() => {
    const colourMap = getColourMap();
    const patternsSet = new Set(loyalistPatterns.map(p => p.toLowerCase()));
    const modesSet = new Set(chapterModes.map(m => m.toLowerCase()));
    return { colourMap, patternsSet, modesSet };
});

export const getChaosLookups = cache(() => {
    const colourMap = getColourMap();
    const patternsSet = new Set(chaosPatterns.map(p => p.toLowerCase()));
    const modesSet = new Set(chaosModes.map(m => m.toLowerCase()));
    return { colourMap, patternsSet, modesSet };
});

export const getEldarLookups = cache(() => {
    const colourMap = getColourMap();
    const patternsSet = new Set(eldarPatterns.map(p => p.toLowerCase()));
    const modesSet = new Set(eldarModes.map(m => m.toLowerCase()));
    return { colourMap, patternsSet, modesSet };
});
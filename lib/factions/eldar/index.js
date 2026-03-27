import { meta } from "./meta";
import { patterns, generatePattern } from "./patterns";
import { factionModes, generateScheme } from "./scheme";
import { generateName } from "./names";
import { modelConfig } from "./model";


export const eldarFaction = {
    meta,
    patterns,
    modes: factionModes,
    generatePattern,
    generateScheme,
    generateName,
    modelConfig
};
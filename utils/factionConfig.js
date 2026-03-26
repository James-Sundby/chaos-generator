import "server-only";
import { cache } from "react";
import { colourList } from "@/lib/data/colours";
import { factionRegistry } from "@/lib/factions/server";

const getColourMap = cache(() =>
    Object.fromEntries(colourList.map((c) => [c.hex.toLowerCase(), c]))
);

export const getFactionConfig = cache(() => {
    const colourMap = getColourMap();

    return Object.fromEntries(
        Object.entries(factionRegistry).map(([key, faction]) => [
            key,
            {
                ...faction.meta,
                slug: faction.meta.key,
                resultKey: faction.meta.key,
                displayNameKey: "name",
                patternsSet: new Set(faction.patterns.map((p) => p.toLowerCase())),
                modesSet: new Set(faction.modes.map((m) => m.toLowerCase())),
                generateName: faction.generateName,
                generateScheme: faction.generateScheme,
                generatePattern: faction.generatePattern,
                colourMap,
            },
        ])
    );
});

export function getFactionEntry(faction) {
    const entry = getFactionConfig()[faction];
    if (!entry) {
        throw new Error("bad-faction");
    }
    return entry;
}
import "server-only";
import { getChaosLookups } from "./lookups";
import { generateWarbandName } from "@/utils/generateNames";
import { generateWarbandScheme } from "@/utils/generateColourScheme";
import { generateChaosPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChaosSlug } from "@/utils/parseSlugs";

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createWarband(settings) {
    const name = generateWarbandName();
    const { colours, mode } = generateWarbandScheme(settings);
    const pattern = generateChaosPattern(settings);
    const slug = generateSlug(name, colours, pattern, mode);
    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");
    const { colourMap, patternsSet, modesSet } = getChaosLookups();
    const { name, colours, pattern, mode } = parseChaosSlug(slug, colourMap, patternsSet, modesSet);
    const canonical = generateSlug(name, colours, pattern, mode);
    return {
        band: { warbandName: name, colors: colours, pattern, slug: canonical, mode: mode },
        canonical,
    };
}

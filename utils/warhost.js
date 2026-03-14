import "server-only";
import { getEldarLookups } from "@/utils/lookups";
import { generateEldarName } from "@/utils/generateNames";
import { generateEldarScheme } from "@/utils/generateColourScheme";
import { generateEldarPattern } from "@/utils/generatePatterns";
import { generateSlug, parseEldarSlug } from "@/utils/parseSlugs";

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createWarhost(settings) {
    const name = generateEldarName();
    const { colours, mode } = generateEldarScheme(settings);
    const pattern = generateEldarPattern(settings);
    const slug = generateSlug(name, colours, pattern, mode);

    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseWarhostFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");

    const { colourMap, patternsSet, modesSet } = getEldarLookups();
    const { name, colours, pattern, mode } = parseEldarSlug(slug, colourMap, patternsSet, modesSet);
    const canonical = generateSlug(name, colours, pattern, mode);

    return {
        warhost: { warbandName: name, colors: colours, pattern, slug: canonical, mode: mode, },
        canonical,
    };
}

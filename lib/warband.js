import { generateWarbandName } from "@/utils/generateNames";
import { generateWarbandScheme } from "@/utils/generateColourScheme";
import { generateChaosPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChaosSlug } from "@/utils/parseSlugs";
import { colourList } from "@/lib/colours";
import { chaosPatterns } from "@/lib/armourPatterns";

const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
const patternsSet = new Set(chaosPatterns.map(p => p.toLowerCase()));
const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createWarband() {
    const name = generateWarbandName();
    const { colours, mode } = generateWarbandScheme();
    const pattern = generateChaosPattern();
    const slug = generateSlug(name, colours, pattern);
    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");
    const { name, colours, pattern } = parseChaosSlug(slug, colourMap, patternsSet);
    const canonical = generateSlug(name, colours, pattern);
    return {
        band: { warbandName: name, colors: colours, pattern, slug: canonical },
        canonical,
    };
}

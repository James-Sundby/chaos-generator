import { generateWarbandName } from "@/utils/generateNames";
import { generateWarbandScheme } from "@/utils/generateColourScheme";
import { generateChaosPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChaosSlug } from "@/utils/parseSlugs";
import { colourList } from "@/lib/colours";
import { chaosPatterns } from "@/lib/armourPatterns";
import { chaosModes } from "@/lib/modes";

const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
const patternsSet = new Set(chaosPatterns.map(p => p.toLowerCase()));
const modesSet = new Set(chaosModes.map(m => m.toLowerCase()));

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createWarband() {
    const name = generateWarbandName();
    const { colours, mode } = generateWarbandScheme();
    const pattern = generateChaosPattern();
    const slug = generateSlug(name, colours, pattern, mode);
    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");
    const { name, colours, pattern, mode } = parseChaosSlug(slug, colourMap, patternsSet, modesSet);
    const canonical = generateSlug(name, colours, pattern, mode);
    return {
        band: { warbandName: name, colors: colours, pattern, slug: canonical, mode: mode },
        canonical,
    };
}

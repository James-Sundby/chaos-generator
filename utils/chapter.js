import "server-only";
import { getLoyalistLookups } from "@/utils/lookups";
import { generateChapterName } from "@/utils/generateNames";
import { generateChapterScheme } from "@/utils/generateColourScheme";
import { generateLoyalistPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChapterSlug } from "@/utils/parseSlugs";

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createChapter(settings) {
    const name = generateChapterName();
    const { colours, mode } = generateChapterScheme(settings);
    const pattern = generateLoyalistPattern(settings);
    const slug = generateSlug(name, colours, pattern, mode);
    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");
    const { colourMap, patternsSet, modesSet } = getLoyalistLookups();
    const { name, colours, pattern, mode } = parseChapterSlug(slug, colourMap, patternsSet, modesSet);
    const canonical = generateSlug(name, colours, pattern, mode);
    return {
        chapter: { warbandName: name, colors: colours, pattern, slug: canonical, mode: mode },
        canonical,
    };
}

import { generateChapterName } from "@/utils/generateNames";
import { generateChapterScheme } from "@/utils/generateColourScheme";
import { generateLoyalistPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChapterSlug } from "@/utils/parseSlugs";
import { colourList } from "@/lib/colours";
import { patterns } from "@/lib/armourPatterns";
import { chapterModes } from "@/lib/modes";

const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
const patternsSet = new Set(patterns.map(p => p.toLowerCase()));
const modesSet = new Set(chapterModes.map(m => m.toLowerCase()));

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createChapter() {
    const name = generateChapterName();
    const { colours, mode } = generateChapterScheme();
    const pattern = generateLoyalistPattern();
    const slug = generateSlug(name, colours, pattern, mode);
    return { warbandName: name, colors: colours, pattern, slug, mode };
}

export function parseFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) throw new Error("bad-slug");
    const { name, colours, pattern, mode } = parseChapterSlug(slug, colourMap, patternsSet, modesSet);
    const canonical = generateSlug(name, colours, pattern, mode);
    return {
        chapter: { warbandName: name, colors: colours, pattern, slug: canonical, mode: mode },
        canonical,
    };
}

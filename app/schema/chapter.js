import { z } from "zod";
import { patterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { generateSlug, parseChapterSlug } from "@/utils/parseSlugs";
import { chapterModes } from "@/lib/modes";

const patternSet = new Set(patterns.map(p => p.toLowerCase()));
const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
const modesSet = new Set(chapterModes.map(m => m.toLowerCase()));

export const chapterSlugOnlySchema = z
    .string()
    .trim()
    .min(1, "Enter a chapter slug.")
    .max(200, "Slug is too long.")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and hyphens are allowed.")
    .transform((slug, ctx) => {
        try {
            const { name, colours, pattern, mode } =
                parseChapterSlug(slug, colourMap, patternSet, modesSet);
            return generateSlug(name, colours, pattern, mode || undefined);
        } catch (e) {
            ctx.addIssue({ code: z.custom, message: e?.message || "Invalid chapter slug." });
            return z.NEVER;
        }
    });

export const chapterSearchObjectSchema = z.object({
    q: chapterSlugOnlySchema,
});

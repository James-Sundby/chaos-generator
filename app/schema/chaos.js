import { z } from "zod";
import { chaosPatterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { generateSlug, parseChaosSlug } from "@/utils/parseSlugs";
import { chaosModes } from "@/lib/modes";

const patternsSet = new Set(chaosPatterns.map(p => p.toLowerCase()));
const colourMap = Object.fromEntries(colourList.map(c => [c.hex.toLowerCase(), c]));
const modesSet = new Set(chaosModes.map(m => m.toLowerCase()));

export const chaosSlugOnlySchema = z
    .string()
    .trim()
    .min(1, "Enter a chaos slug.")
    .max(200, "Slug is too long.")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and hyphens are allowed.")
    .transform((slug, ctx) => {
        try {
            const { name, colours, pattern, mode } =
                parseChaosSlug(slug, colourMap, patternsSet, modesSet);
            return generateSlug(name, colours, pattern, mode || undefined);
        } catch (e) {
            ctx.addIssue({ code: z.custom, message: e?.message || "Invalid chaos slug." });
            return z.NEVER;
        }
    });

export const chaosSearchObjectSchema = z.object({
    q: chaosSlugOnlySchema,
});

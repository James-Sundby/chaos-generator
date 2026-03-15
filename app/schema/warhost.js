import { z } from "zod";
import { eldarPatterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { generateSlug, parseEldarSlug } from "@/utils/parseSlugs";
import { eldarModes } from "@/lib/modes";

const patternSet = new Set(eldarPatterns.map((p) => p.toLowerCase()));
const colourMap = Object.fromEntries(
    colourList.map((c) => [c.hex.toLowerCase(), c])
);
const modesSet = new Set(eldarModes.map((m) => m.toLowerCase()));

export const warhostSlugOnlySchema = z
    .string()
    .trim()
    .min(1, "Enter a warhost slug.")
    .max(200, "Slug is too long.")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and hyphens are allowed.")
    .transform((slug, ctx) => {
        try {
            const { name, colours, pattern, mode } =
                parseEldarSlug(slug, colourMap, patternSet, modesSet);

            return generateSlug(name, colours, pattern, mode || undefined);
        } catch (e) {
            ctx.addIssue({
                code: z.custom,
                message: e?.message || "Invalid warhost slug.",
            });
            return z.NEVER;
        }
    });

export const warhostSearchObjectSchema = z.object({
    q: warhostSlugOnlySchema,
});

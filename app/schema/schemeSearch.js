import { z } from "zod";

export const schemeSlugOnlySchema = z
    .string()
    .trim()
    .min(1, "Enter a slug.")
    .max(200, "Slug is too long.")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and hyphens are allowed.");

export const schemeSearchObjectSchema = z.object({
    q: schemeSlugOnlySchema,
});
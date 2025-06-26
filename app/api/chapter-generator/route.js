export const dynamic = 'force-dynamic';

import { generateChapterName } from "@/utils/generateNames";
import { generateChapterScheme } from "@/utils/generateColourScheme";
import { generateLoyalistPattern } from "@/utils/generatePatterns";
import { generateSlug, parseChapterSlug } from "@/utils/parseSlugs";

import { colourList } from "@/lib/colours";
import { patterns } from "@/lib/armourPatterns";

const patternsSet = new Set(patterns.map((p) => p.toLowerCase()));
const colourMap = Object.fromEntries(colourList.map((color) => [color.hex.toLowerCase(), color]));

export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (slug && !slugRegex.test(slug)) {
        return new Response(JSON.stringify({ error: "Invalid slug format" }), { status: 400 });
    }

    if (slug) {
        try {
            const { name, colours, pattern } = parseChapterSlug(slug, colourMap, patternsSet)
            return new Response(JSON.stringify({
                message: "valid",
                warbandName: name,
                colors: colours,
                pattern: pattern,
                slug,
            }), { status: 200 });
        } catch (error) {
            console.warn("Invalid slug, generating a new chapter instead:");
        }
    }

    // Generate a new chapter if no slug is provided or slug is invalid
    try {
        const name = generateChapterName();
        const { colours, mode } = generateChapterScheme();
        const pattern = generateLoyalistPattern();
        const newSlug = generateSlug(name, colours, pattern);

        return new Response(JSON.stringify({
            message: "new warband",
            warbandName: name,
            colors: colours,
            pattern: pattern,
            slug: newSlug,
            mode
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: "Internal Server Error",
            message: error.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
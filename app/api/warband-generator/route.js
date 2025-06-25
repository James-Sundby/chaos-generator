export const dynamic = 'force-dynamic';

import { generateWarbandName } from "@/utils/generateWarbandName";
import { generateRandomColors } from "@/utils/generateColourScheme";
import { generateRandomPattern } from "@/utils/generateChaosPattern";
import { generateSlug, parseSlug } from "@/utils/chaosSlugUtils";

import { colourList } from "@/lib/colours";
import { chaosPatterns } from "@/lib/armourPatterns";

const colorMap = Object.fromEntries(colourList.map((color) => [color.hex.toLowerCase(), color]));
const patternsSet = new Set(chaosPatterns.map((p) => p.toLowerCase()));

export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (slug && !slugRegex.test(slug)) {
        return new Response(JSON.stringify({ error: "Invalid slug format" }), { status: 400 });
    }

    if (slug) {
        try {
            const { warbandName, colors, pattern } = parseSlug(slug, colorMap, patternsSet);
            return new Response(JSON.stringify({
                message: "valid",
                warbandName,
                colors,
                pattern,
                slug
            }), { status: 200 });
        } catch (error) {
            console.warn("Invalid slug, generating a new warband instead:", error.message);
        }
    }

    try {
        const warbandName = generateWarbandName();
        const { colors, mode } = generateRandomColors();
        const pattern = generateRandomPattern();
        const newSlug = generateSlug(warbandName, colors, pattern);

        return new Response(JSON.stringify({
            message: "new warband",
            warbandName,
            colors,
            pattern,
            slug: newSlug,
            mode
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export const dynamic = 'force-dynamic';


import { randomElement } from "@/utils/randomElement";
import { generateChapterName } from "@/utils/generateNames";
import { generateLoyalistPattern } from "@/utils/generatePatterns";

import { findClosestColour } from "@/utils/colourTools";

import { colourList } from "@/lib/colours";
import { patterns } from "@/lib/armourPatterns";

const patternsSet = new Set(patterns.map((p) => p.toLowerCase()));
const colorMap = Object.fromEntries(colourList.map((color) => [color.hex.toLowerCase(), color]));

function generateComplementaryColors() {
    const base = randomElement(colourList);
    const target = {
        h: (base.h + 180) % 360,
        s: base.s,
        l: base.l,
    };

    const complement = findClosestColour(target, colourList, [base.hex.toLowerCase()]);

    const metallic = colourList.filter(c => c.type === "Metallic");
    const metal = randomElement(metallic);

    return [base, complement, metal];
}

function generateSplitComplementaryColors() {
    const base = randomElement(colourList);


    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colorA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colorB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    return [base, colorA, colorB];
}

function generateTriadicColors() {
    const base = randomElement(colourList);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colorA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colorB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    return [base, colorA, colorB];
}

function generateFullyRandomColors() {
    const shuffled = [...colourList].sort(() => 0.5 - Math.random());
    const baseColors = shuffled.slice(0, 2);
    const metal = shuffled.find(
        color =>
            color.type === "Metallic" &&
            !baseColors.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [...baseColors, metal];
}

const generationModes = [
    { mode: "random", weight: 2 },
    { mode: "complementary", weight: 3 },
    { mode: "split-complementary", weight: 1 },
    { mode: "triadic", weight: 1 },
];

function weightedRandomSelect(modes) {
    const totalWeight = modes.reduce((sum, m) => sum + m.weight, 0);
    const roll = Math.random() * totalWeight;
    let cumulative = 0;

    for (const m of modes) {
        cumulative += m.weight;
        if (roll < cumulative) return m.mode;
    }
}

function generateRandomColors() {
    const mode = weightedRandomSelect(generationModes);

    let colors;
    switch (mode) {
        case "complementary":
            colors = generateComplementaryColors();
            break;
        case "split-complementary":
            colors = generateSplitComplementaryColors();
            break;
        case "triadic":
            colors = generateTriadicColors();
            break;
        default:
            colors = generateFullyRandomColors();
            break;
    }
    console.log(mode);
    return { colors, mode };
}

function generateSlug(name, colors, pattern) {
    const nameSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.hex.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}`;
}

function capitalizeName(name) {
    const smallWords = ["of", "the"];
    return name
        .split(" ")
        .map((word, index) => (index === 0 || !smallWords.includes(word))
            ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            : word.toLowerCase()
        )
        .join(" ");
}

export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (slug && !slugRegex.test(slug)) {
        return new Response(JSON.stringify({ error: "Invalid slug format" }), { status: 400 });
    }

    if (slug) {
        const slugParts = slug.split("-");
        try {
            const patternCode = slugParts.pop();
            const isValidPattern = patternsSet.has(patternCode);
            if (!isValidPattern) throw new Error(`Invalid pattern code: ${patternCode}`);
            const patternCapital = capitalizeName(patternCode);

            const colorHex3 = `#${slugParts.pop()}`;
            const colorHex2 = `#${slugParts.pop()}`;
            const colorHex1 = `#${slugParts.pop()}`;

            const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
            if (!hexColorRegex.test(colorHex1) ||
                !hexColorRegex.test(colorHex2) ||
                !hexColorRegex.test(colorHex3)) {
                throw new Error("Invalid color hex code.");
            }

            const namedColors = [colorHex1, colorHex2, colorHex3].map((hex) => {
                const color = colorMap[hex.toLowerCase()];
                if (!color) throw new Error(`Color not found for hex: ${hex}`);
                return color;
            });

            const name = slugParts.join(" ").replace(/-/g, " ");
            const warbandName = capitalizeName(name);

            return new Response(
                JSON.stringify({
                    message: "valid",
                    warbandName,
                    colors: namedColors,
                    pattern: patternCapital,
                    slug,
                }),
                { status: 200 }
            );
        } catch (error) {
            console.warn("Invalid slug, generating a new chapter instead:");
        }
    }

    // Generate a new warband if no slug is provided or slug is invalid
    try {
        const warbandName = generateChapterName();
        const { colors, mode } = generateRandomColors();
        const pattern = generateLoyalistPattern();
        const newSlug = generateSlug(warbandName, colors, pattern);

        return new Response(
            JSON.stringify({ message: "new warband", warbandName, colors, pattern, slug: newSlug, mode }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error generating Chapter data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
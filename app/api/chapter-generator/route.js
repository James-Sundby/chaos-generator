export const dynamic = 'force-dynamic';

import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";
import { virtues, warriorTerms, placesOrEntities, adjectives, animals } from "@/lib/loyalData";
import { metals } from "@/lib/metals";

function generateChapterName() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const formulas = [
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(warriorTerms)} of ${randomElement(virtues)}`,
        () => `${randomElement(warriorTerms)} of ${randomElement(placesOrEntities)}`,
        () => `The ${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(adjectives)} ${randomElement(animals)}`,
        () => `${randomElement(animals)} of ${randomElement(placesOrEntities)}`,
    ];
    return randomElement(formulas)();
}

function generateRandomColors() {
    const selectedColors = [];
    const usedIndices = new Set();

    while (selectedColors.length < 2) {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        if (!usedIndices.has(randomIndex)) {
            // selectedColors.push(colorList[randomIndex].hex);
            selectedColors.push(colorList[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    return selectedColors;
}

function generateRandomPattern() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    return `${randomElement(patterns)}`
}

function generateRandomMetal() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    return randomElement(metals)
}

function generateSlug(name, colors, pattern, metal) {
    const nameSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.hex.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();
    const metalSlug = metal.code.toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}-${metalSlug}`;
}

function capitalizeName(name) {
    const smallWords = ["of", "the"];
    return name
        .split(" ")
        .map((word, index) => {
            if (index === 0 || !smallWords.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word.toLowerCase();
        })
        .join(" ");
}

export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
        try {
            const slugParts = slug.split("-");

            const metalCode = slugParts.pop();
            const metal = metals.find((m) => m.code.toLowerCase() === metalCode);

            const patternCode = slugParts.pop();
            const pattern = patterns.find((p) => p.toLowerCase() === patternCode);

            const colorHex2 = `#${slugParts.pop()}`;
            const colorHex1 = `#${slugParts.pop()}`;
            const namedColors = [colorHex1, colorHex2].map((hex) => {
                const color = colorList.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
                if (!color) {
                    throw new Error(`Color not found for hex: ${hex}`);
                }
                return color;
            });

            const name = slugParts.join(" ").replace(/-/g, " ");
            const warbandName = capitalizeName(name);

            if (warbandName && namedColors.length === 2 && pattern && metal) {
                return new Response(
                    JSON.stringify({
                        message: "valid",
                        warbandName,
                        colors: namedColors,
                        pattern,
                        slug,
                        metal,
                    }),
                    { status: 200 }
                );
            } else {
                throw new Error("Invalid slug components");
            }
        } catch (error) {
            console.warn("Invalid slug, generating a new warband instead:");
        }
    }

    // Generate a new warband if no slug is provided or slug is invalid
    try {
        const warbandName = generateChapterName();
        const colors = generateRandomColors();
        const pattern = generateRandomPattern();
        const metal = generateRandomMetal();
        const newSlug = generateSlug(warbandName, colors, pattern, metal);

        return new Response(
            JSON.stringify({ message: "new warband", warbandName, colors, pattern, slug: newSlug, metal }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            }
        );
    } catch (error) {
        console.error("Error generating Chapter data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
export const dynamic = 'force-dynamic';

import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";
import { virtues, warriorTerms, placesOrEntities, adjectives, animals } from "@/lib/loyalData";
import { metals } from "@/lib/metals";

function generateChapterName() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const formulas = [
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(warriorTerms)} of ${randomElement(virtues)} `,
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
            selectedColors.push(colorList[randomIndex].hex);
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
    const colorSlug = colors.map(color => color.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();
    const metalSlug = metal.code.toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}-${metalSlug}`;
}

export async function GET() {
    try {
        const warbandName = generateChapterName();
        const colors = generateRandomColors();
        const pattern = generateRandomPattern();
        const metal = generateRandomMetal();
        const slug = generateSlug(warbandName, colors, pattern, metal);

        return new Response(
            JSON.stringify({ warbandName, colors, pattern, slug, metal }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            }
        );
    } catch (error) {
        console.error("Error generating Chapter data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

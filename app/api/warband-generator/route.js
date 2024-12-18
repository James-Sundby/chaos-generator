export const dynamic = 'force-dynamic';

import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives } from "@/lib/chaosData";
import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";

function generateWarbandName() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const formulas = [
        () => `${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(abstractNouns)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(abstractNouns)} of ${randomElement([...darkEntities, ...chaoticDescriptors])}`,
        () => `The ${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `Children of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
        () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`

    ];
    return randomElement(formulas)();
}

function generateRandomColors() {
    const selectedColors = [];
    const usedIndices = new Set();

    while (selectedColors.length < 3) {
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

function generateSlug(name, colors, pattern) {
    const nameSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.replace("#", "")).join("-");
    const patternSlug = pattern.split("/").pop().split(".")[0].toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}`;
}

export async function GET() {
    try {
        const warbandName = generateWarbandName();
        const colors = generateRandomColors();
        const pattern = generateRandomPattern();
        const slug = generateSlug(warbandName, colors, pattern);

        return new Response(
            JSON.stringify({ warbandName, colors, pattern, slug }),
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
        console.error("Error generating Warband data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

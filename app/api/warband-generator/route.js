export const dynamic = 'force-dynamic';

import { colorList } from "@/lib/colors2";
import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives } from "@/lib/chaosData";

const colorMap = Object.fromEntries(colorList.map((color) => [color.hex.toLowerCase(), color]));

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateWarbandName() {
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
    const shuffled = [...colorList].sort(() => 0.5 - Math.random());

    const baseColors = shuffled.slice(0, 2);

    const nonMetal = shuffled.find(
        color =>
            color.type !== "Metallic" &&
            !baseColors.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [
        ...baseColors,
        nonMetal ?? { name: "White Scar", hex: "#FFFFFF", type: "Base", brand: "Citadel" }
    ];
}

function generateSlug(name, colors) {
    const nameSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.hex.replace("#", "")).join("-");

    return `${nameSlug}-${colorSlug}`;
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

    if (slug) {
        const slugParts = slug.split("-");
        try {
            const colorHex3 = `#${slugParts.pop()}`;
            const colorHex2 = `#${slugParts.pop()}`;
            const colorHex1 = `#${slugParts.pop()}`;
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
                    slug,
                }),
                { status: 200 }
            );
        } catch (error) {
            console.warn("Invalid slug, generating a new warband instead:");
        }
    }

    // Generate a new warband if no slug is provided or slug is invalid
    try {
        const warbandName = generateWarbandName();
        const colors = generateRandomColors();
        const newSlug = generateSlug(warbandName, colors);

        return new Response(
            JSON.stringify({ message: "new warband", warbandName, colors, slug: newSlug }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        //console.error("Error generating Chapter data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
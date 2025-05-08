export const dynamic = 'force-dynamic';

import { colorList } from "@/lib/colors2";
import { patterns } from "@/lib/armourPatterns";

import { virtues, warriorTerms, placesOrEntities, adjectives, animals } from "@/lib/loyalData";

const patternsSet = new Set(patterns.map((p) => p.toLowerCase()));
const colorMap = Object.fromEntries(colorList.map((color) => [color.hex.toLowerCase(), color]));

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateChapterName() {
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
    const shuffled = [...colorList].sort(() => 0.5 - Math.random());
    const baseColors = shuffled.slice(0, 2);
    const metal = shuffled.find(
        color =>
            color.type === "Metallic" &&
            !baseColors.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [
        ...baseColors,
        metal ?? { name: "Retributor Armour", hex: "#ebb854", type: "Metallic", brand: "Citadel" }
    ];
}

function generateRandomPattern() {
    return randomElement(patterns);
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
        const colors = generateRandomColors();
        const pattern = generateRandomPattern();
        const newSlug = generateSlug(warbandName, colors, pattern);

        return new Response(
            JSON.stringify({ message: "new warband", warbandName, colors, pattern, slug: newSlug }),
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
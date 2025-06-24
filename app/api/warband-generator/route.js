export const dynamic = 'force-dynamic';

import { colorList } from "@/lib/colors2";
import { chaosPatterns } from "@/lib/armourPatterns";
import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives } from "@/lib/chaosData";

const colorMap = Object.fromEntries(colorList.map((color) => [color.hex.toLowerCase(), color]));
const patternsSet = new Set(chaosPatterns.map((p) => p.toLowerCase()));

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
        () => `Children of the ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
        () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`

    ];
    return randomElement(formulas)();
}

function hueDistance(a, b) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
}

function findClosestColor(target, excludeHexes = []) {
    const cleanedExcludes = excludeHexes.map(h => h.toLowerCase());
    const eligibleColors = colorList.filter(c =>
        // c.type !== "Metallic" &&
        !cleanedExcludes.includes(c.hex.toLowerCase())
    );

    let bestMatch = null;
    let bestScore = Infinity;

    for (const color of eligibleColors) {
        const hueDiff = hueDistance(color.h, target.h);
        const satDiff = Math.abs(color.s - target.s);
        const lightDiff = Math.abs(color.l - target.l);

        const score = hueDiff * 1 + satDiff * 0.5 + lightDiff * 0.5;

        if (score < bestScore) {
            bestScore = score;
            bestMatch = color;
        }
    }

    return bestMatch;
}

function generateComplementaryColors() {
    const base = randomElement(colorList);

    const target = {
        h: (base.h + 180) % 360,
        s: base.s,
        l: base.l,
    };
    const complement = findClosestColor(target, [base.hex.toLowerCase()]);

    const metallic = colorList.filter(c => c.type === "Metallic");
    const metal = randomElement(metallic);

    const accentPool = colorList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, complement, metal].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColor([base, complement, metal], accentPool);

    return [base, complement, metal, accent];
}

function generateSplitComplementaryColors() {
    const base = randomElement(colorList);

    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colorA = findClosestColor(targetA, [base.hex.toLowerCase()]);
    const colorB = findClosestColor(targetB, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    const accentPool = colorList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colorA, colorB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColor([base, colorA, colorB], accentPool);

    return [base, colorA, colorB, accent];
}

function generateTriadicColors() {
    const base = randomElement(colorList);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colorA = findClosestColor(targetA, [base.hex.toLowerCase()]);
    const colorB = findClosestColor(targetB, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    const accentPool = colorList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colorA, colorB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColor([base, colorA, colorB], accentPool);

    return [base, colorA, colorB, accent];
}

function findAccentColor(existingColors, candidatePool) {
    let bestAccent = null;
    let bestMinDistance = -1;

    for (const candidate of candidatePool) {
        const distances = existingColors.map(c => hueDistance(candidate.h, c.h));
        const minDistance = Math.min(...distances);

        if (minDistance > bestMinDistance) {
            bestMinDistance = minDistance;
            bestAccent = candidate;
        }
    }

    return bestAccent;
}

function generateFullyRandomColors() {
    const shuffled = [...colorList].sort(() => 0.5 - Math.random());
    const baseColors = shuffled.slice(0, 3);
    const nonMetal = shuffled.find(
        color =>
            color.type !== "Metallic" &&
            !baseColors.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [...baseColors, nonMetal];
}

const generationModes = [
    { mode: "random", weight: 1 },
    { mode: "complementary", weight: 1 },
    { mode: "split-complementary", weight: 2 },
    { mode: "triadic", weight: 2 },
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

    if (mode === "complementary") {
        //console.log("Complementary");
        return generateComplementaryColors();
    }
    if (mode === "split-complementary") {
        //console.log("Split-Complementary");
        return generateSplitComplementaryColors();
    }
    if (mode === "triadic") {
        //console.log("Triadic");
        return generateTriadicColors();
    }

    //console.log("Fallback to fully random");
    return generateFullyRandomColors();
}

function generateRandomPattern() {
    return randomElement(chaosPatterns);
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

            const colorHex4 = `#${slugParts.pop()}`;
            const colorHex3 = `#${slugParts.pop()}`;
            const colorHex2 = `#${slugParts.pop()}`;
            const colorHex1 = `#${slugParts.pop()}`;

            const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
            if (!hexColorRegex.test(colorHex1) ||
                !hexColorRegex.test(colorHex2) ||
                !hexColorRegex.test(colorHex3) ||
                !hexColorRegex.test(colorHex4)) {
                throw new Error("Invalid color hex code.");
            }

            const namedColors = [colorHex1, colorHex2, colorHex3, colorHex4].map((hex) => {
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
            console.warn("Invalid slug, generating a new warband instead:");
        }
    }

    // Generate a new warband if no slug is provided or slug is invalid
    try {
        const warbandName = generateWarbandName();
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
        //console.error("Error generating Chapter data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", message: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
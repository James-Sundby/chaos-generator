import { colourList } from "@/lib/colours";

import { randomElement } from "@/utils/randomElement";

export function hueDistance(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("hueDistance expects two numeric hue values.");
    }

    const diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
}

export function findClosestColour(target, colourPool, excludeHexes = []) {
    const weights = { hue: 1, sat: 0.5, light: 0.5 };

    if (
        typeof target !== "object" ||
        typeof target.h !== "number" ||
        typeof target.s !== "number" ||
        typeof target.l !== "number"
    ) {
        throw new Error("findClosestColour: target must be an object with h, s, and l values.");
    }
    if (!Array.isArray(colourPool) || colourPool.length === 0) {
        throw new Error("findClosestColour: colourPool must be a non-empty array.");
    }
    if (!Array.isArray(excludeHexes)) {
        throw new Error("findClosestColour: excludeHexes must be an array.");
    }

    const cleanedExcludes = excludeHexes.map(hex => hex.toLowerCase());
    const eligibleColours = colourPool.filter(colour =>
        !cleanedExcludes.includes(colour.hex.toLowerCase())
    );

    if (eligibleColours.length === 0) {
        console.warn("findClosestColour: No eligible colours after exclusions.");
        return null;
    }

    let bestMatch = null;
    let bestScore = Infinity;

    for (const colour of eligibleColours) {
        const hueDiff = hueDistance(colour.h, target.h);
        const satDiff = Math.abs(colour.s - target.s);
        const lightDiff = Math.abs(colour.l - target.l);

        const score =
            hueDiff * weights.hue +
            satDiff * weights.sat +
            lightDiff * weights.light;

        if (score < bestScore) {
            bestScore = score;
            bestMatch = colour;
        }
    }

    return bestMatch;
}

export function findAccentColour(existingColours, candidatePool) {
    if (!Array.isArray(existingColours) || existingColours.length === 0) {
        throw new Error("findAccentColour: existingColours must be a non-empty array.");
    }

    if (!Array.isArray(candidatePool) || candidatePool.length === 0) {
        throw new Error("findAccentColour: candidatePool must be a non-empty array.");
    }

    let bestAccent = null;
    let bestMinDistance = -1;

    for (const candidate of candidatePool) {
        const distances = existingColours.map(colour => hueDistance(candidate.h, colour.h));
        const minDistance = Math.min(...distances);

        if (minDistance > bestMinDistance) {
            bestMinDistance = minDistance;
            bestAccent = candidate;
        }
    }

    return bestAccent;
}

export function generateComplementaryColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const target = {
        h: (base.h + 180) % 360,
        s: base.s,
        l: base.l,
    };
    const complement = findClosestColour(target, colourList, [base.hex.toLowerCase()]);

    const metallic = colourList.filter(c => c.type === "Metallic");
    const metal = randomElement(metallic);

    // Ignore accent for Chapter Schemes
    if (!withAccent) return [base, complement, metal];

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, complement, metal].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, complement, metal], accentPool);

    return [base, complement, metal, accent];
}

export function generateSplitComplementaryColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colourB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colourA?.hex?.toLowerCase(),
    ]);

    // Ignore accent for Chapter Schemes
    if (!withAccent) return [base, colourA, colourB];

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colourA, colourB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}

export function generateTriadicColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colourB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colourA?.hex?.toLowerCase(),
    ]);

    // Ignore accent for Chapter Schemes
    if (!withAccent) return [base, colourA, colourB];

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colourA, colourB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}

export function generateTetradicColours() {
    const base = randomElement(colourList);

    const hue2 = (base.h + 90) % 360;
    const hue3 = (base.h + 180) % 360;
    const hue4 = (hue2 + 180) % 360;

    const target2 = { h: hue2, s: base.s, l: base.l };
    const target3 = { h: hue3, s: base.s, l: base.l };
    const target4 = { h: hue4, s: base.s, l: base.l };

    const colour2 = findClosestColour(target2, colourList, [base.hex.toLowerCase()]);
    const colour3 = findClosestColour(target3, colourList, [base.hex.toLowerCase(), colour2.hex.toLowerCase()]);
    const colour4 = findClosestColour(target4, colourList, [base.hex.toLowerCase(), colour2.hex.toLowerCase(), colour3.hex.toLowerCase()]);

    return [base, colour2, colour3, colour4];
}

export function generateAnalogousColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const hueA = (base.h + 30) % 360;
    const hueB = (base.h + 60) % 360;

    const colourA = findClosestColour({ h: hueA, s: base.s, l: base.l }, colourList, [base.hex.toLowerCase()]);
    const colourB = findClosestColour({ h: hueB, s: base.s, l: base.l }, colourList, [
        base.hex.toLowerCase(),
        colourA?.hex.toLowerCase()
    ]);

    // Ignore accent for Chapter Schemes
    if (!withAccent) return [base, colourA, colourB];

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colourA, colourB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}

export function generateFullyRandomColours(count) {
    if (typeof count !== "number" || count < 2) {
        throw new Error("generateFullyRandomScheme: 'count' must be a number ≥ 2");
    }

    const shuffled = [...colourList].sort(() => 0.5 - Math.random());
    const baseColours = shuffled.slice(0, count - 1);
    const nonMetal = shuffled.find(
        colour =>
            colour.type !== "Metallic" &&
            !baseColours.some(c => c.hex.toLowerCase() === colour.hex.toLowerCase())
    );

    return [...baseColours, nonMetal];
}
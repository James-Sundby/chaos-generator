import { colourList } from "@/lib/colours";

import { randomElement } from "@/utils/randomElement";
import { findClosestColour, findAccentColour } from "@/utils/colourTools";

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
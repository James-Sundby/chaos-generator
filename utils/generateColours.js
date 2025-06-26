import { randomElement } from "@/utils/randomElement";
import { findClosestColour, findAccentColour } from "@/utils/colourTools";

import { colourList } from "@/lib/colours";

export function generateComplementaryColours() {
    const base = randomElement(colourList);

    const target = {
        h: (base.h + 180) % 360,
        s: base.s,
        l: base.l,
    };
    const complement = findClosestColour(target, colourList, [base.hex.toLowerCase()]);

    const metallic = colourList.filter(c => c.type === "Metallic");
    const metal = randomElement(metallic);

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, complement, metal].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, complement, metal], accentPool);

    return [base, complement, metal, accent];
}

export function generateSplitComplementaryColours() {
    const base = randomElement(colourList);

    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colorA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colorB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colorA, colorB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colorA, colorB], accentPool);

    return [base, colorA, colorB, accent];
}

export function generateTriadicColours() {
    const base = randomElement(colourList);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colorA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colorB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colorA?.hex?.toLowerCase(),
    ]);

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colorA, colorB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colorA, colorB], accentPool);

    return [base, colorA, colorB, accent];
}

export function generateTetradicColours() {
    const base = randomElement(colourList);

    const hue2 = (base.h + 90) % 360;
    const hue3 = (base.h + 180) % 360;
    const hue4 = (hue2 + 180) % 360;

    const target2 = { h: hue2, s: base.s, l: base.l };
    const target3 = { h: hue3, s: base.s, l: base.l };
    const target4 = { h: hue4, s: base.s, l: base.l };

    const color2 = findClosestColour(target2, colourList, [base.hex.toLowerCase()]);
    const color3 = findClosestColour(target3, colourList, [base.hex.toLowerCase(), color2.hex.toLowerCase()]);
    const color4 = findClosestColour(target4, colourList, [base.hex.toLowerCase(), color2.hex.toLowerCase(), color3.hex.toLowerCase()]);

    return [base, color2, color3, color4];
}

export function generateAnalogousColours() {
    const base = randomElement(colourList);

    const hueA = (base.h + 30) % 360;
    const hueB = (base.h + 60) % 360;

    const colorA = findClosestColour({ h: hueA, s: base.s, l: base.l }, colourList, [base.hex.toLowerCase()]);
    const colorB = findClosestColour({ h: hueB, s: base.s, l: base.l }, colourList, [
        base.hex.toLowerCase(),
        colorA?.hex.toLowerCase()
    ]);

    const accentPool = colourList.filter(c =>
        c.type !== "Metallic" &&
        c.s > 30 &&
        c.l > 30 &&
        ![base, colorA, colorB].some(existing => existing.hex.toLowerCase() === c.hex.toLowerCase())
    );

    const accent = findAccentColour([base, colorA, colorB], accentPool);

    return [base, colorA, colorB, accent];
}

export function generateFullyRandomColours() {
    const shuffled = [...colourList].sort(() => 0.5 - Math.random());
    const baseColours = shuffled.slice(0, 3);
    const nonMetal = shuffled.find(
        color =>
            color.type !== "Metallic" &&
            !baseColours.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [...baseColours, nonMetal];
}
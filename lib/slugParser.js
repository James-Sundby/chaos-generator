import { colourList } from "@/lib/colours";
import { chaosPatterns, patterns as chapterPatterns } from "@/lib/armourPatterns";

import { capitalizeName } from "@/utils/parseSlugs";

const colourMap = Object.fromEntries(
    colourList.map((colour) => [colour.hex.toLowerCase(), colour])
);


export function parseChaosSlug(slug) {
    const parts = slug.split("-");
    const patternCode = parts.pop();
    const colourHexes = [parts.pop(), parts.pop(), parts.pop(), parts.pop()].map(
        (hex) => `#${hex}`
    );
    const namePart = parts.join(" ").replace(/-/g, " ");

    const patternSet = new Set(chaosPatterns.map((p) => p.toLowerCase()));
    if (!patternSet.has(patternCode.toLowerCase())) {
        throw new Error("Invalid chaos pattern");
    }

    if (!colourHexes.every((hex) => /^#[0-9a-f]{6}$/i.test(hex))) {
        throw new Error("Invalid hex colour in chaos slug");
    }

    const colours = colourHexes.map((hex) => {
        const colour = colourMap[hex.toLowerCase()];
        if (!colour) throw new Error(`Colour not found: ${hex}`);
        return colour;
    });

    return {
        warbandName: capitalizeName(namePart),
        colors: colours,
        pattern: capitalizeName(patternCode),
        slug,
    };
}

export function parseChapterSlug(slug) {
    const parts = slug.split("-");
    const patternCode = parts.pop();
    const colourHexes = [parts.pop(), parts.pop(), parts.pop()].map(
        (hex) => `#${hex}`
    );
    const namePart = parts.join(" ").replace(/-/g, " ");

    const patternSet = new Set(chapterPatterns.map((p) => p.toLowerCase()));
    if (!patternSet.has(patternCode.toLowerCase())) {
        throw new Error("Invalid chapter pattern");
    }

    if (!colourHexes.every((hex) => /^#[0-9a-f]{6}$/i.test(hex))) {
        throw new Error("Invalid hex colour in chapter slug");
    }

    const colours = colourHexes.map((hex) => {
        const colour = colourMap[hex.toLowerCase()];
        if (!colour) throw new Error(`Colour not found: ${hex}`);
        return colour;
    });

    return {
        chapterName: capitalizeName(namePart),
        colors: colours,
        pattern: capitalizeName(patternCode),
        slug,
    };
}

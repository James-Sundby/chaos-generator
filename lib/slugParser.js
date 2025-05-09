import { colorList } from "@/lib/colors2";
import { chaosPatterns, patterns as chapterPatterns } from "@/lib/armourPatterns";

const colorMap = Object.fromEntries(
    colorList.map((color) => [color.hex.toLowerCase(), color])
);

function capitalizeName(name) {
    const smallWords = ["of", "the"];
    return name
        .split(" ")
        .map((word, i) =>
            i === 0 || !smallWords.includes(word.toLowerCase())
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : word.toLowerCase()
        )
        .join(" ");
}

export function parseChaosSlug(slug) {
    const parts = slug.split("-");
    const patternCode = parts.pop();
    const colorHexes = [parts.pop(), parts.pop(), parts.pop(), parts.pop()].map(
        (hex) => `#${hex}`
    );
    const namePart = parts.join(" ").replace(/-/g, " ");

    const patternSet = new Set(chaosPatterns.map((p) => p.toLowerCase()));
    if (!patternSet.has(patternCode.toLowerCase())) {
        throw new Error("Invalid chaos pattern");
    }

    if (!colorHexes.every((hex) => /^#[0-9a-f]{6}$/i.test(hex))) {
        throw new Error("Invalid hex color in chaos slug");
    }

    const colors = colorHexes.map((hex) => {
        const color = colorMap[hex.toLowerCase()];
        if (!color) throw new Error(`Color not found: ${hex}`);
        return color;
    });

    return {
        warbandName: capitalizeName(namePart),
        colors,
        pattern: capitalizeName(patternCode),
        slug,
    };
}

export function parseChapterSlug(slug) {
    const parts = slug.split("-");
    const patternCode = parts.pop();
    const colorHexes = [parts.pop(), parts.pop(), parts.pop()].map(
        (hex) => `#${hex}`
    );
    const namePart = parts.join(" ").replace(/-/g, " ");

    const patternSet = new Set(chapterPatterns.map((p) => p.toLowerCase()));
    if (!patternSet.has(patternCode.toLowerCase())) {
        throw new Error("Invalid chapter pattern");
    }

    if (!colorHexes.every((hex) => /^#[0-9a-f]{6}$/i.test(hex))) {
        throw new Error("Invalid hex color in chapter slug");
    }

    const colors = colorHexes.map((hex) => {
        const color = colorMap[hex.toLowerCase()];
        if (!color) throw new Error(`Color not found: ${hex}`);
        return color;
    });

    return {
        chapterName: capitalizeName(namePart),
        colors,
        pattern: capitalizeName(patternCode),
        slug,
    };
}

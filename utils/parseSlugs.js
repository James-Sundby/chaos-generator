function slugifyName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function deslugifyName(slug) {
    return slug.replace(/-/g, " ");
}

export function generateSlug(faction, name, colours, pattern, mode) {
    const factionSlug = slugifyName(faction);
    const nameSlug = slugifyName(name);
    const colourSlug = colours.map(colour => colour.hex.replace("#", "").toLowerCase()).join("-");
    const patternSlug = String(pattern).toLowerCase();
    const modeSlug = mode ? `-${String(mode).toLowerCase()}` : "";

    return `${factionSlug}-${nameSlug}-${colourSlug}-${patternSlug}${modeSlug}`;
}

export function capitalizeName(name) {
    const smallWords = ["of", "the"];
    return name
        .split(" ")
        .map((word, index) =>
            index === 0 || !smallWords.includes(word)
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : word.toLowerCase()
        )
        .join(" ");
}

export function parseSlug(slug, factionConfig) {
    if (typeof slug !== "string" || !slug.trim()) {
        throw new Error("Slug must be a non-empty string.");
    }

    const slugParts = slug.split("-");
    const faction = slugParts[0]?.toLowerCase();

    if (!faction) {
        throw new Error("Slug does not contain a faction segment.");
    }

    const config = factionConfig[faction];
    if (!config) {
        throw new Error("Slug contains an invalid faction segment.");
    }

    const { colourCount, colourMap, patternsSet, modesSet } = config;

    if (slugParts.length < colourCount + 3) {
        throw new Error(`Slug is too short to extract ${colourCount} colours and a pattern.`);
    }

    slugParts.shift();

    let mode = null;
    const maybeMode = slugParts[slugParts.length - 1]?.toLowerCase();
    const isCustomMode = maybeMode === "custom";
    if (isCustomMode || modesSet?.has(maybeMode)) {
        mode = slugParts.pop().toLowerCase();
    }

    const pattern = slugParts.pop()?.toLowerCase();
    if (!pattern || !patternsSet.has(pattern)) {
        throw new Error(`Invalid pattern code: ${pattern ?? ""}`);
    }

    const hexColourRegex = /^[0-9a-f]{6}$/i;
    const colourHexes = [];

    for (let i = 0; i < colourCount; i++) {
        const hex = slugParts.pop();
        if (!hex || !hexColourRegex.test(hex)) {
            throw new Error(`Invalid hex value: ${hex ?? ""}`);
        }
        colourHexes.unshift(`#${hex.toLowerCase()}`);
    }

    if (slugParts.length === 0) {
        throw new Error("Slug is missing a name segment.");
    }

    const colours = colourHexes.map(hex => {
        const colour = colourMap[hex];
        if (!colour) throw new Error(`Colour not found for hex: ${hex}`);
        return colour;
    });

    const name = capitalizeName(deslugifyName(slugParts.join("-")));

    return {
        faction,
        name,
        colours,
        pattern,
        mode,
    };
}
export function generateSlug(name, colours, pattern) {
    const nameSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colourSlug = colours.map(colour => colour.hex.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();

    return `${nameSlug}-${colourSlug}-${patternSlug}`;
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

export function parseSlug(slug, colourMap, patternSet) {
    const slugParts = slug.split("-");

    if (slugParts.length < 5) {
        throw new Error("Slug is too short to extract 4 colours and a pattern.");
    }

    const patternCode = slugParts.pop();
    if (!patternSet.has(patternCode)) {
        throw new Error(`Invalid pattern code: ${patternCode}`);
    }
    const pattern = capitalizeName(patternCode);

    const colourHex4 = `#${slugParts.pop()}`;
    const colourHex3 = `#${slugParts.pop()}`;
    const colourHex2 = `#${slugParts.pop()}`;
    const colourHex1 = `#${slugParts.pop()}`;

    const hexColourRegex = /^#[0-9A-Fa-f]{6}$/;
    const allHexes = [colourHex1, colourHex2, colourHex3, colourHex4];
    if (!allHexes.every(hex => hexColourRegex.test(hex))) {
        throw new Error("One or more hex values are invalid.");
    }

    const namedColours = allHexes.map(hex => {
        const colour = colourMap[hex.toLowerCase()];
        if (!colour) {
            throw new Error(`Colour not found for hex: ${hex}`);
        }
        return colour;
    });

    const name = slugParts.join(" ").replace(/-/g, " ");
    const warbandName = capitalizeName(name);

    return { warbandName, colors: namedColours, pattern };
}

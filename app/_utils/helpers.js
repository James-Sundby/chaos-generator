import { colorList } from "@/lib/colors";

export function capitalizeName(name) {
    const smallWords = ["of", "the"];
    return name
        .split(" ")
        .map((word, index) => {
            if (index === 0 || !smallWords.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word.toLowerCase();
        })
        .join(" ");
}

export function parseSlug(slug) {
    const slugParts = slug.split("-");
    const pattern = slugParts.pop();
    const patternSrc = `/${pattern}.png`;

    // const colorHex3 = `#${slugParts.pop()}`;
    const colorHex2 = `#${slugParts.pop()}`;
    const colorHex1 = `#${slugParts.pop()}`;
    const colors = [colorHex1, colorHex2];

    const namedColors = colors.map((hex) => {
        const color = colorList.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
        return color ? { name: color.name, hex: color.hex } : { name: "Unknown", hex };
    });

    const name = slugParts.join(" ").replace(/-/g, " ");
    const warbandName = capitalizeName(name);
    const capitalizedPattern = capitalizeName(pattern)

    return {
        warbandName,
        patternSrc,
        namedColors,
        capitalizedPattern
    };
}
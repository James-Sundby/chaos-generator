import { colorList } from "@/lib/colors";
import { metals } from "@/lib/metals";

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
    const metalCode = slugParts.pop();

    const metal = metals.find(m => m.code.toLowerCase() === metalCode.toLowerCase()) || {
        name: "Unknown",
        hex1: "#000000",
        hex2: "#000000",
        hex3: "#000000",
    };

    const pattern = slugParts.pop();

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
        namedColors,
        capitalizedPattern,
        metal,
    };
}
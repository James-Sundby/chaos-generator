function hueDistance(a, b) {
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
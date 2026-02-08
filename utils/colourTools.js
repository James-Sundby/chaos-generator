import "server-only";

import { colourList } from "@/lib/colours";
import { randomElement } from "@/utils/randomElement";

function resolvePool(pool) {
    if (pool && Array.isArray(pool.all) && pool.all.length > 0) return pool;

    if (Array.isArray(pool) && pool.length > 0) return { all: pool };

    return { all: colourList };
}

export function hueDistance(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("hueDistance expects two numeric hue values.");
    }

    const diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
}

export function findClosestColour(
    target,
    colourPool,
    excludeHexes = [],
    options = {}
) {
    const weights = { hue: 1, sat: 0.5, light: 0.5, ...(options.weights || {}) };
    const k = Math.max(1, options.k || 5);
    const pick = options.pick || "uniform"; // "uniform" | "ranked"
    const rng = options.rng || Math.random; // optional deterministic RNG

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

    const excludes = new Set(excludeHexes.map((h) => String(h).toLowerCase()));

    const topK = [];

    const insertTopK = (item) => {
        let i = 0;
        while (i < topK.length && topK[i].score <= item.score) i++;
        topK.splice(i, 0, item);
        if (topK.length > k) topK.pop();
    };

    for (const c of colourPool) {
        const hexLower = String(c.hex).toLowerCase();
        if (excludes.has(hexLower)) continue;

        const hueDiff = hueDistance(c.h, target.h);
        const satDiff = Math.abs(c.s - target.s);
        const lightDiff = Math.abs(c.l - target.l);
        const score = hueDiff * weights.hue + satDiff * weights.sat + lightDiff * weights.light;

        if (topK.length < k) {
            insertTopK({ colour: c, score });
        } else if (score < topK[topK.length - 1].score) {
            insertTopK({ colour: c, score });
        }
    }

    if (topK.length === 0) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("findClosestColour: No eligible colours after exclusions.");
        }
        return null;
    }

    if (k === 1 || topK.length === 1) return topK[0].colour;

    if (pick === "ranked") {
        const weightsRank = topK.map((_, i) => 1 / (i + 1));
        const sum = weightsRank.reduce((a, b) => a + b, 0);
        let r = rng() * sum;
        for (let i = 0; i < topK.length; i++) {
            r -= weightsRank[i];
            if (r <= 0) return topK[i].colour;
        }
        return topK[topK.length - 1].colour;
    }

    const idx = Math.floor(rng() * topK.length);
    return topK[idx].colour;
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
        const distances = existingColours
            .filter(Boolean)
            .map((colour) => hueDistance(candidate.h, colour.h));
        const minDistance = Math.min(...distances);

        if (minDistance > bestMinDistance) {
            bestMinDistance = minDistance;
            bestAccent = candidate;
        }
    }

    return bestAccent;
}

function makeUsedSet(colours) {
    return new Set(colours.filter(Boolean).map((c) => String(c.hex).toLowerCase()));
}

function buildAccentPool(p, used) {
    const source = p.accentCandidates ?? p.all.filter((c) => c.type !== "Metallic" && c.s > 30 && c.l > 30);
    return source.filter((c) => !used.has(String(c.hex).toLowerCase()));
}

export function generateComplementaryColours({ withAccent = true, pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const complement = findClosestColour(
        { h: (base.h + 180) % 360, s: base.s, l: base.l },
        colours,
        [base.hex],
        { rng }
    );

    const metallic = p.metallic ?? colours.filter((c) => c.type === "Metallic");
    const metal = metallic.length ? randomElement(metallic, rng) : randomElement(colours, rng);

    if (!withAccent) return [base, complement, metal];

    const used = makeUsedSet([base, complement, metal]);
    const accentPool = buildAccentPool(p, used);
    const accent = findAccentColour([base, complement, metal], accentPool);

    return [base, complement, metal, accent];
}

export function generateSplitComplementaryColours({ withAccent = true, pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colours, [base.hex], { rng });
    const colourB = findClosestColour(targetB, colours, [base.hex, colourA?.hex], { rng });

    if (!withAccent) return [base, colourA, colourB];

    const used = makeUsedSet([base, colourA, colourB]);
    const accentPool = buildAccentPool(p, used);
    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}


export function generateTriadicColours({ withAccent = true, pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colours, [base.hex], { rng });
    const colourB = findClosestColour(targetB, colours, [base.hex, colourA?.hex], { rng });

    if (!withAccent) return [base, colourA, colourB];

    const used = makeUsedSet([base, colourA, colourB]);
    const accentPool = buildAccentPool(p, used);
    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}

export function generateTetradicColours({ pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const hue2 = (base.h + 90) % 360;
    const hue3 = (base.h + 180) % 360;
    const hue4 = (hue2 + 180) % 360;

    const colour2 = findClosestColour({ h: hue2, s: base.s, l: base.l }, colours, [base.hex], { rng });
    const colour3 = findClosestColour({ h: hue3, s: base.s, l: base.l }, colours, [base.hex, colour2?.hex], { rng });
    const colour4 = findClosestColour({ h: hue4, s: base.s, l: base.l }, colours, [base.hex, colour2?.hex, colour3?.hex], { rng });

    return [base, colour2, colour3, colour4];
}

export function generateAnalogousColours({ withAccent = true, pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const hueA = (base.h + 30) % 360;
    const hueB = (base.h + 60) % 360;

    const colourA = findClosestColour({ h: hueA, s: base.s, l: base.l }, colours, [base.hex], { rng });
    const colourB = findClosestColour({ h: hueB, s: base.s, l: base.l }, colours, [base.hex, colourA?.hex], { rng });

    if (!withAccent) return [base, colourA, colourB];

    const used = makeUsedSet([base, colourA, colourB]);
    const accentPool = buildAccentPool(p, used);
    const accent = findAccentColour([base, colourA, colourB], accentPool);

    return [base, colourA, colourB, accent];
}

function shuffleInPlace(arr, rng = Math.random) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function generateFullyRandomColours(count, { pool, rng = Math.random } = {}) {
    if (typeof count !== "number" || count < 2) {
        throw new Error("generateFullyRandomScheme: 'count' must be a number ≥ 2");
    }

    const p = resolvePool(pool);
    const colours = p.all;

    const shuffled = shuffleInPlace([...colours], rng);
    const baseColours = shuffled.slice(0, count - 1);

    const used = makeUsedSet(baseColours);

    const nonMetal =
        shuffled.find((c) => c.type !== "Metallic" && !used.has(String(c.hex).toLowerCase())) ??
        shuffled.find((c) => !used.has(String(c.hex).toLowerCase())) ??
        baseColours[baseColours.length - 1];

    return [...baseColours, nonMetal];
}
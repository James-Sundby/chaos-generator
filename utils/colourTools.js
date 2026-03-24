import "server-only";

import { colourList } from "@/lib/data/colours";
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

function getMetalColour(p, used, rng = Math.random) {
    const metallic = p.metallic ?? p.all.filter((c) => c.type === "Metallic");
    const candidates = metallic.filter((c) => !used.has(String(c.hex).toLowerCase()));

    if (candidates.length > 0) return randomElement(candidates, rng);
    if (metallic.length > 0) return randomElement(metallic, rng);

    const fallback = p.all.filter((c) => !used.has(String(c.hex).toLowerCase()));
    return fallback.length > 0 ? randomElement(fallback, rng) : null;
}

function getAccentColour(p, existingColours) {
    const used = makeUsedSet(existingColours);
    const accentPool = buildAccentPool(p, used);

    if (accentPool.length === 0) return null;
    return findAccentColour(existingColours.filter(Boolean), accentPool);
}

function getNonMetalColour(p, used, rng = Math.random) {
    const nonMetallic = p.nonMetallic ?? p.all.filter((c) => c.type !== "Metallic");
    const candidates = nonMetallic.filter((c) => !used.has(String(c.hex).toLowerCase()));

    if (candidates.length > 0) return randomElement(candidates, rng);
    if (nonMetallic.length > 0) return randomElement(nonMetallic, rng);

    const fallback = p.all.filter((c) => !used.has(String(c.hex).toLowerCase()));
    return fallback.length > 0 ? randomElement(fallback, rng) : null;
}

function findClosestNonMetalColour(
    target,
    p,
    excludeHexes = [],
    options = {}
) {
    const nonMetallic = p.nonMetallic ?? p.all.filter((c) => c.type !== "Metallic");
    return findClosestColour(target, nonMetallic, excludeHexes, options);
}

function generateComplementaryAnchors({ pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);
    const secondary = findClosestColour(
        { h: (base.h + 180) % 360, s: base.s, l: base.l },
        colours,
        [base.hex],
        { rng }
    );

    return [base, secondary];
}

function generateSplitComplementaryAnchors({ pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const targetA = { h: (base.h + 150) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 210) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colours, [base.hex], { rng });
    const colourB = findClosestColour(targetB, colours, [base.hex, colourA?.hex], { rng });

    return [base, colourA, colourB];
}

function generateTriadicAnchors({ pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const targetA = { h: (base.h + 120) % 360, s: base.s, l: base.l };
    const targetB = { h: (base.h + 240) % 360, s: base.s, l: base.l };

    const colourA = findClosestColour(targetA, colours, [base.hex], { rng });
    const colourB = findClosestColour(targetB, colours, [base.hex, colourA?.hex], { rng });

    return [base, colourA, colourB];
}

function generateTetradicAnchors({ pool, rng = Math.random } = {}) {
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

function generateAnalogousAnchors({ pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const colours = p.all;

    const base = randomElement(colours, rng);

    const hueA = (base.h + 30) % 360;
    const hueB = (base.h + 60) % 360;

    const colourA = findClosestColour({ h: hueA, s: base.s, l: base.l }, colours, [base.hex], { rng });
    const colourB = findClosestColour({ h: hueB, s: base.s, l: base.l }, colours, [base.hex, colourA?.hex], { rng });

    return [base, colourA, colourB];
}

function shuffleInPlace(arr, rng = Math.random) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateRandomAnchors(count, { pool, rng = Math.random } = {}) {
    if (typeof count !== "number" || count < 2) {
        throw new Error("generateRandomAnchors: 'count' must be a number ≥ 2");
    }

    const p = resolvePool(pool);
    const shuffled = shuffleInPlace([...p.all], rng);
    return shuffled.slice(0, count);
}

function getAnchorsByHarmony(harmony, { pool, rng = Math.random } = {}) {
    switch (harmony) {
        case "random":
            return generateRandomAnchors(3, { pool, rng });
        case "complementary":
            return generateComplementaryAnchors({ pool, rng });
        case "splitcomplementary":
            return generateSplitComplementaryAnchors({ pool, rng });
        case "triadic":
            return generateTriadicAnchors({ pool, rng });
        case "tetradic":
            return generateTetradicAnchors({ pool, rng });
        case "analogous":
            return generateAnalogousAnchors({ pool, rng });
        default:
            throw new Error(`Unknown harmony mode: ${harmony}`);
    }
}

export function generateChapterSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;

    switch (harmony) {
        case "random":
        case "complementary": {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            return [primary, secondary, metal];
        }

        case "splitcomplementary":
        case "triadic":
        case "analogous": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            return [primary, secondary, tertiary];
        }

        default: {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            return [primary, secondary, metal];
        }
    }
}

export function generateChaosSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;

    switch (harmony) {
        case "complementary": {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            const accent = getAccentColour(p, [primary, secondary, metal]);
            return [primary, secondary, metal, accent];
        }

        case "splitcomplementary":
        case "triadic":
        case "analogous": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        case "tetradic": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = anchors[3] ?? getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        case "random": {
            const tertiary = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;
            const accent = getAccentColour(p, [primary, secondary, tertiary]);
            return [primary, secondary, tertiary, accent];
        }

        default: {
            const used = makeUsedSet([primary, secondary]);
            const metal = getMetalColour(p, used, rng);
            const accent = getAccentColour(p, [primary, secondary, metal]);
            return [primary, secondary, metal, accent];
        }
    }
}

export function generateEldarSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;
    const secondary = anchors[1] ?? anchors[0] ?? null;
    const accent = getAccentColour(p, [primary, secondary]);

    return [primary, secondary, accent];
}

export function generateSistersSchemeColours(harmony, { pool, rng = Math.random } = {}) {
    const p = resolvePool(pool);
    const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

    const primary = anchors[0] ?? null;

    const secondaryUsed = makeUsedSet([primary]);
    const secondaryTarget = anchors[1] ?? anchors[0] ?? null;

    const secondary =
        secondaryTarget &&
            secondaryTarget.type !== "Metallic" &&
            !secondaryUsed.has(String(secondaryTarget.hex).toLowerCase())
            ? secondaryTarget
            : findClosestNonMetalColour(
                secondaryTarget,
                p,
                Array.from(secondaryUsed),
                { rng }
            ) ?? getNonMetalColour(p, secondaryUsed, rng);

    switch (harmony) {
        case "random": {
            const edgeUsed = makeUsedSet([primary, secondary]);
            const edgeTarget = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;

            const edge =
                edgeTarget &&
                    edgeTarget.type !== "Metallic" &&
                    !edgeUsed.has(String(edgeTarget.hex).toLowerCase())
                    ? edgeTarget
                    : findClosestNonMetalColour(
                        edgeTarget,
                        p,
                        Array.from(edgeUsed),
                        { rng }
                    ) ?? getNonMetalColour(p, edgeUsed, rng);

            const accent = getAccentColour(p, [primary, secondary, edge]);
            return [primary, secondary, edge, accent];
        }

        case "complementary":
        case "analogous":
        default: {
            const edgeUsed = makeUsedSet([primary, secondary]);
            const edge = getMetalColour(p, edgeUsed, rng);
            const accent = getAccentColour(p, [primary, secondary, edge]);

            return [primary, secondary, edge, accent];
        }
    }
}
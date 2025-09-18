import "server-only";
import { colourList } from "@/lib/colours";
import { randomElement } from "@/utils/randomElement";

function hueDistanceDeg(h1, h2) {
    const d = Math.abs(((h2 - h1 + 540) % 360) - 180);
    return d;
}

function deltaOKLCH(a, b, { wL = 0.8, wC = 1.0, wH = 1.2 } = {}) {
    const dL = (a.L ?? 0) - (b.L ?? 0);
    const dC = (a.C ?? 0) - (b.C ?? 0);

    const achroma = (a.C ?? 0) < 1e-4 || (b.C ?? 0) < 1e-4;
    const dH = achroma ? 0 : hueDistanceDeg(a.h ?? 0, b.h ?? 0);

    const dHrad = dH * Math.PI / 180;

    return Math.hypot(wL * dL, wC * dC, wH * dHrad);
}

function findClosestColour(
    target,
    colourPool,
    excludeHexes = [],
    options = {}
) {
    const weights = { wL: 0.8, wC: 1.0, wH: 1.2, ...(options.weights || {}) };
    const k = Math.max(1, options.k || 5);
    const pick = options.pick || "uniform";
    const rng = options.rng || Math.random;

    if (!Array.isArray(colourPool) || colourPool.length === 0) {
        throw new Error("findClosestColour: colourPool must be a non-empty array.");
    }
    if (!Array.isArray(excludeHexes)) {
        throw new Error("findClosestColour: excludeHexes must be an array.");
    }

    let targetOK;
    if (target && typeof target === "object" && "L" in target && "C" in target && "h" in target) {
        targetOK = { L: +target.L, C: +target.C, h: +target.h };
    } else if (target && "oklch" in target) {
        targetOK = { ...target.oklch };
    } else if ("h" in target && "s" in target && "l" in target) {
        targetOK = { L: 0.6, C: 0.1, h: +target.h };
    } else {
        throw new Error("findClosestColour: target must include OKLCH (L,C,h) or .oklch.");
    }

    const cleanedExcludes = excludeHexes.map((hex) => String(hex).toLowerCase());
    const eligible = colourPool.filter(
        (c) => !cleanedExcludes.includes(String(c.hex).toLowerCase())
    );

    if (eligible.length === 0) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("findClosestColour: No eligible colours after exclusions.");
        }
        return null;
    }

    const scored = eligible.map((c) => {
        const cOK = c.oklch;
        if (!cOK) throw new Error(`Palette color missing .oklch: ${c.name}`);
        const score = deltaOKLCH(targetOK, cOK, weights);
        return { colour: c, score };
    });

    scored.sort((a, b) => a.score - b.score);

    if (k === 1 || scored.length === 1) return scored[0].colour;

    const topK = scored.slice(0, Math.min(k, scored.length));
    if (pick === "ranked") {
        const weightsRank = topK.map((_, i) => 1 / (i + 1));
        const sum = weightsRank.reduce((a, b) => a + b, 0);
        let r = rng() * sum;
        for (let i = 0; i < topK.length; i++) {
            r -= weightsRank[i];
            if (r <= 0) return topK[i].colour;
        }
        return topK[topK.length - 1].colour;
    } else {
        const idx = Math.floor(rng() * topK.length);
        return topK[idx].colour;

    }
}

function gaussian(x, mu, sigma) {
    const z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z);
}

function pickAccent(existingColours, pool, rng = Math.random) {
    if (!Array.isArray(existingColours) || existingColours.length === 0) {
        throw new Error("pickAccent: existingColours must be non-empty");
    }
    if (!Array.isArray(pool) || pool.length === 0) {
        throw new Error("pickAccent: pool must be non-empty");
    }

    const Lmin = 0.32, Lmax = 0.86;
    const Cmin = 0.10, Cmax = 0.26;
    const targetLDelta = 0.40;
    const targetC = 0.17;
    const weights = { wL: 0.9, wC: 1.0, wH: 1.3 };
    const exOK = existingColours.map(c => c.oklch).filter(Boolean);
    const excludeHexes = new Set(existingColours.map(x => String(x.hex).toLowerCase()));

    const candidates = pool.filter(c => {
        if (c.type === "Metallic") return false;
        if (excludeHexes.has(String(c.hex).toLowerCase())) return false;
        const ok = c.oklch; if (!ok) return false;
        if (ok.L < Lmin || ok.L > Lmax) return false;
        if (ok.C < Cmin || ok.C > Cmax) return false;
        return true;
    });
    if (candidates.length === 0) return null;

    function minDelta(cOK) {
        let m = Infinity;
        for (const e of exOK) {
            const d = deltaOKLCH(cOK, e, weights);
            if (d < m) m = d;
        }
        return m;
    }

    const scored = candidates.map(c => {
        const ok = c.oklch;

        const sep = minDelta(ok);

        const avgL = exOK.reduce((s, x) => s + x.L, 0) / exOK.length;
        const Ldelta = Math.abs(ok.L - avgL);
        const Lscore = gaussian(Ldelta, targetLDelta, 0.12);

        const Cscore = gaussian(ok.C, targetC, 0.06);

        const yellowish = Math.abs(((ok.h - 60 + 540) % 360) - 180) <= 20;
        const hueBias = yellowish ? 0.65 : 1.0;

        const similar = sep < 0.045;
        const allow = similar ? 0 : 1;

        const weight = allow * Math.max(1e-6, sep * (0.6 + 0.25 * Lscore + 0.15 * Cscore) * hueBias);
        return { colour: c, weight };
    }).filter(x => x.weight > 0);

    if (scored.length === 0) {
        const relaxed = candidates
            .map(c => ({ c, sep: minDelta(c.oklch) }))
            .sort((a, b) => b.sep - a.sep);
        return relaxed[0].c;
    }

    const total = scored.reduce((s, x) => s + x.weight, 0);
    let r = rng() * total;
    for (const s of scored) {
        r -= s.weight;
        if (r <= 0) return s.colour;
    }
    return scored[scored.length - 1].colour;
}


// Exports

export function generateComplementaryColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const target = {
        L: base.oklch.L,
        C: base.oklch.C,
        h: (base.oklch.h + 180) % 360,
    };
    const complement = findClosestColour(target, colourList, [base.hex.toLowerCase()]);

    const metallic = colourList.filter(c => c.type === "Metallic");
    const metal = randomElement(metallic);

    if (!withAccent) return [base, complement, metal];
    const accent = pickAccent([base, complement, metal], colourList);

    return [base, complement, metal, accent];
}


export function generateSplitComplementaryColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const targetA = { L: base.oklch.L, C: base.oklch.C, h: (base.oklch.h + 150) % 360 };
    const targetB = { L: base.oklch.L, C: base.oklch.C, h: (base.oklch.h + 210) % 360 };

    const colourA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colourB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colourA?.hex?.toLowerCase(),
    ]);

    if (!withAccent) return [base, colourA, colourB];
    const accent = pickAccent([base, colourA, colourB], colourList);

    return [base, colourA, colourB, accent];
}


export function generateTriadicColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const targetA = { L: base.oklch.L, C: base.oklch.C, h: (base.oklch.h + 120) % 360 };
    const targetB = { L: base.oklch.L, C: base.oklch.C, h: (base.oklch.h + 240) % 360 };

    const colourA = findClosestColour(targetA, colourList, [base.hex.toLowerCase()]);
    const colourB = findClosestColour(targetB, colourList, [
        base.hex.toLowerCase(),
        colourA?.hex?.toLowerCase(),
    ]);

    if (!withAccent) return [base, colourA, colourB];
    const accent = pickAccent([base, colourA, colourB], colourList);

    return [base, colourA, colourB, accent];
}


export function generateTetradicColours() {
    const base = randomElement(colourList);

    const h2 = (base.oklch.h + 90) % 360;
    const h3 = (base.oklch.h + 180) % 360;
    const h4 = (h2 + 180) % 360;

    const target2 = { L: base.oklch.L, C: base.oklch.C, h: h2 };
    const target3 = { L: base.oklch.L, C: base.oklch.C, h: h3 };
    const target4 = { L: base.oklch.L, C: base.oklch.C, h: h4 };

    const colour2 = findClosestColour(target2, colourList, [base.hex.toLowerCase()]);
    const colour3 = findClosestColour(target3, colourList, [base.hex.toLowerCase(), colour2.hex.toLowerCase()]);

    const nonMetalPool = colourList.filter(c => c.type !== "Metallic");
    const colour4 = findClosestColour(target4, nonMetalPool, [base.hex.toLowerCase(), colour2.hex.toLowerCase(), colour3.hex.toLowerCase()]);

    return [base, colour2, colour3, colour4];
}


export function generateAnalogousColours({ withAccent = true } = {}) {
    const base = randomElement(colourList);

    const hA = (base.oklch.h + 30) % 360;
    const hB = (base.oklch.h + 60) % 360;

    const colourA = findClosestColour(
        { L: base.oklch.L, C: base.oklch.C, h: hA },
        colourList,
        [base.hex.toLowerCase()]
    );
    const colourB = findClosestColour(
        { L: base.oklch.L, C: base.oklch.C, h: hB },
        colourList,
        [base.hex.toLowerCase(), colourA?.hex.toLowerCase()]
    );

    if (!withAccent) return [base, colourA, colourB];
    const accent = pickAccent([base, colourA, colourB], colourList);

    return [base, colourA, colourB, accent];
}


export function generateFullyRandomColours(count) {
    if (typeof count !== "number" || count < 2) {
        throw new Error("generateFullyRandomScheme: 'count' must be a number ≥ 2");
    }

    const shuffled = [...colourList].sort(() => 0.5 - Math.random());
    const baseColours = shuffled.slice(0, count - 1);
    const nonMetal = shuffled.find(
        colour =>
            colour.type !== "Metallic" &&
            !baseColours.some(c => c.hex.toLowerCase() === colour.hex.toLowerCase())
    );

    return [...baseColours, nonMetal];
}
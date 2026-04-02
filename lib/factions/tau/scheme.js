// import "server-only";

// import { createSchemeGenerator } from "@/utils/createSchemeGenerator";
// import { resolvePool, getAnchorsByHarmony, makeUsedSet, findClosestNonMetalColour, getNonMetalColour, getAccentColour, getMetalColour } from "@/utils/colourTools";
// import { factionModes } from "./modes";

// function generateSistersSchemeColours(harmony, { pool, rng = Math.random } = {}) {
//     const p = resolvePool(pool);
//     const anchors = getAnchorsByHarmony(harmony, { pool: p, rng });

//     const primary = anchors[0] ?? null;

//     const secondaryUsed = makeUsedSet([primary]);
//     const secondaryTarget = anchors[1] ?? anchors[0] ?? null;

//     const secondary =
//         secondaryTarget &&
//             secondaryTarget.type !== "Metallic" &&
//             !secondaryUsed.has(String(secondaryTarget.hex).toLowerCase())
//             ? secondaryTarget
//             : findClosestNonMetalColour(
//                 secondaryTarget,
//                 p,
//                 Array.from(secondaryUsed),
//                 { rng }
//             ) ?? getNonMetalColour(p, secondaryUsed, rng);

//     switch (harmony) {
//         case "random": {
//             const edgeUsed = makeUsedSet([primary, secondary]);
//             const edgeTarget = anchors[2] ?? anchors[1] ?? anchors[0] ?? null;

//             const edge =
//                 edgeTarget &&
//                     edgeTarget.type !== "Metallic" &&
//                     !edgeUsed.has(String(edgeTarget.hex).toLowerCase())
//                     ? edgeTarget
//                     : findClosestNonMetalColour(
//                         edgeTarget,
//                         p,
//                         Array.from(edgeUsed),
//                         { rng }
//                     ) ?? getNonMetalColour(p, edgeUsed, rng);

//             const accent = getAccentColour(p, [primary, secondary, edge]);
//             return [primary, secondary, edge, accent];
//         }

//         case "complementary":
//         case "analogous":
//         default: {
//             const edgeUsed = makeUsedSet([primary, secondary]);
//             const edge = getMetalColour(p, edgeUsed, rng);
//             const accent = getAccentColour(p, [primary, secondary, edge]);

//             return [primary, secondary, edge, accent];
//         }
//     }
// }

// const weightsByMode = {
//     random: 1,
//     complementary: 4,
//     analogous: 3,
// };

// const strategies = factionModes.map((mode) => ({
//     mode,
//     weight: weightsByMode[mode],
//     fn: (pool, rng) => generateSistersSchemeColours(mode, { pool, rng }),
// }));

// export const generateScheme = createSchemeGenerator(strategies);
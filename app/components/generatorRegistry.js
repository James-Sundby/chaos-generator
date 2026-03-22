// import SpaceMarine from "../../lib/models/spaceMarine";
// import Terminator from "../../lib/models/terminator";
// import ChaosMarine from "../../lib/models/chaosSpaceMarine";
// import EldarAvenger from "../../lib/models/eldarAvenger";

// import {
//     createChapterAndGo,
//     createWarbandAndGo,
//     createWarhostAndGo,
// } from "@/app/(actions)/serverActions";

// export const generatorRegistry = {
//     chapter: {
//         group: "loyalist",
//         variant: "Chapter",
//         noun: "chapter",
//         basePath: "/chapter",
//         painterPath: "/painter",
//         buttonTheme: "btn-primary",
//         createAction: createChapterAndGo,

//         copy: {
//             completionBadge: "Generation Complete",
//             classification: "Adeptus Astartes",
//             statusLabel: "Sanctioned",
//             heroDescriptions: [
//                 "Archive logic confirms a viable chapter identity, with balanced heraldry, disciplined contrast, and colours worthy of service to the Throne.",
//                 "A stable chapter livery has been identified, suitable for immediate field use, later refinement, or preservation within the archive.",
//                 "Palette analysis suggests a credible Adeptus Astartes scheme, with strong chapter character and clean heraldic separation across the armour plate.",
//                 "Technical readouts indicate a sanctioned chapter colour identity, fit for successor lineages, crusading hosts, and further customization.",
//             ],
//             modelSectionLabel: "Armour Designation",
//             generateLabel: "Generate New Chapter",
//             customizeLabel: "Customize Chapter",
//             shareLabel: "Share Chapter",
//             cardTopLabel: "ADEPTUS ASTARTES",
//             paletteLabel: "Colour Palette",
//             idLabel: "Archive ID",
//             sourceLabel: "Lineage",
//         },

//         faction: {
//             key: "loyalist",
//             accentBarClass: "bg-faction-loyalist",
//             badgeClass: "badge-loyalist",
//             textClass: "text-faction-loyalist",
//             buttonClass: "btn-faction-loyalist",
//             softBgClass: "bg-faction-loyalist-soft",
//         },

//         models: {
//             marine: {
//                 label: "Marine",
//                 component: SpaceMarine,
//                 getModelProps: ({ colors, pattern }) => ({
//                     primary: colors[0]?.hex,
//                     secondary: colors[1]?.hex,
//                     trim: colors[2]?.hex,
//                     pattern,
//                 }),
//             },
//             terminator: {
//                 label: "Terminator",
//                 component: Terminator,
//                 getModelProps: ({ colors, pattern }) => ({
//                     primary: colors[0]?.hex,
//                     secondary: colors[1]?.hex,
//                     trim: colors[2]?.hex,
//                     pattern,
//                 }),
//             },
//         },

//         getSwatchIndices: ({ colors }) => {
//             const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
//             return areColorsDifferent
//                 ? [0, 1, 2].filter((i) => colors[i])
//                 : [0, 2].filter((i) => colors[i]);
//         },

//         search: {
//             placeholder: "chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random",
//             buttonLabel: "Look up a Chapter",
//             ariaLabel: "Chapter lookup code",
//         },
//     },

//     chaos: {
//         group: "chaos",
//         variant: "Chaos",
//         noun: "warband",
//         basePath: "/chaos",
//         painterPath: "/chaos-painter",
//         buttonTheme: "btn-accent",
//         createAction: createWarbandAndGo,

//         copy: {
//             completionBadge: "Generation Complete",
//             classification: "Heretic Astartes",
//             statusLabel: "Traitor",
//             heroDescriptions: [
//                 "Warp-tainted analysis confirms a stable warband livery, with profane trim balance and a silhouette fit for the Long War.",
//                 "Corrupted heraldic markers remain coherent across the plate, suggesting a warband identity worthy of terror, conquest, and display.",
//                 "Archive corruption detected: this livery exhibits strong trim separation, blasphemous colour discipline, and clear battlefield presence.",
//                 "The machine-spirit recoils, yet the results are undeniable: a viable traitor scheme fit for renegades, reavers, and damned champions.",
//             ],
//             modelSectionLabel: "Armour Designation",
//             generateLabel: "Generate New Warband",
//             customizeLabel: "Customize Warband",
//             shareLabel: "Share Warband",
//             cardTopLabel: "HERETIC ASTARTES",
//             paletteLabel: "Warband Palette",
//             idLabel: "Archive ID",
//             sourceLabel: "Allegiance",
//         },

//         faction: {
//             key: "chaos",
//             accentBarClass: "bg-faction-chaos",
//             badgeClass: "badge-chaos",
//             textClass: "text-faction-chaos",
//             buttonClass: "btn-faction-chaos",
//             softBgClass: "bg-faction-chaos-soft",
//         },

//         models: {
//             marine: {
//                 label: "Chaos Marine",
//                 component: ChaosMarine,
//                 getModelProps: ({ colors, pattern }) => ({
//                     primary: colors[0]?.hex,
//                     secondary: colors[1]?.hex,
//                     edge: colors[2]?.hex,
//                     accent: colors[3]?.hex,
//                     pattern,
//                 }),
//             },
//         },

//         getSwatchIndices: ({ colors, pattern }) => {
//             if (pattern === "Basic") {
//                 return [0, 2, 3].filter((i) => colors[i]);
//             }
//             return colors.map((_, i) => i).filter((i) => colors[i]);
//         },

//         search: {
//             placeholder: "chaos-the-oathbroken-claws-02134e-4b213c-875408-003d15-half-tetradic",
//             buttonLabel: "Look up a Warband",
//             ariaLabel: "Warband lookup code",
//         },
//     },

//     eldar: {
//         group: "xenos",
//         variant: "Eldar",
//         noun: "warhost",
//         basePath: "/warhost",
//         painterPath: "/warhost-painter",
//         buttonTheme: "btn-info",
//         createAction: createWarhostAndGo,

//         copy: {
//             completionBadge: "Generation Complete",
//             classification: "Aeldari Warhost",
//             statusLabel: "Catalogued",
//             heroDescriptions: [
//                 "Warhost analysis indicates a sleek alien palette with elegant contrast, measured rhythm, and colours fit for a dying empire.",
//                 "Archive augurs record a cohesive xenos identity, with bright panel separation and a refined warhost silhouette.",
//                 "This scheme carries the hallmarks of an ordered alien host: clean contrast, disciplined ornament, and an unmistakable martial presence.",
//                 "Visual analysis confirms a distinct warhost livery, suitable for swift blade-work, disciplined volleys, and ancient pride.",
//             ],
//             modelSectionLabel: "Aspect Designation",
//             generateLabel: "Generate New Warhost",
//             customizeLabel: "Customize Warhost",
//             shareLabel: "Share Warhost",
//             cardTopLabel: "XENOS HOST",
//             paletteLabel: "Warhost Palette",
//             idLabel: "Archive ID",
//             sourceLabel: "Origin",
//         },

//         faction: {
//             key: "xenos",
//             accentBarClass: "bg-faction-xenos",
//             badgeClass: "badge-xenos",
//             textClass: "text-faction-xenos",
//             buttonClass: "btn-faction-xenos",
//             softBgClass: "bg-faction-xenos-soft",
//         },

//         models: {
//             avenger: {
//                 label: "Dire Avenger",
//                 component: EldarAvenger,
//                 getModelProps: ({ colors, pattern }) => ({
//                     primary: colors[0]?.hex,
//                     secondary: colors[1]?.hex,
//                     accent: colors[2]?.hex,
//                     pattern,
//                 }),
//             },
//         },

//         getSwatchIndices: ({ colors }) => {
//             const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
//             return areColorsDifferent
//                 ? [0, 1, 2].filter((i) => colors[i])
//                 : [0, 2].filter((i) => colors[i]);
//         },

//         search: {
//             placeholder: "eldar-twilightbound-989898-6d655f-2c9bcc-8-analogous",
//             buttonLabel: "Look up a Warhost",
//             ariaLabel: "Warhost lookup code",
//         },
//     },
// };
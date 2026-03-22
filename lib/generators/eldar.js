import EldarAvenger from "../models/eldarAvenger";
import { createWarhostAndGo } from "@/app/(actions)/serverActions";

export const eldarGenerator = {
    key: "eldar",
    group: "xenos",
    variant: "Eldar",
    noun: "warhost",
    basePath: "/warhost",
    painterPath: "/warhost-painter",
    buttonTheme: "btn-info",
    createAction: createWarhostAndGo,

    copy: {
        completionBadge: "Generation Complete",
        classification: "Aeldari Warhost",
        statusLabel: "Catalogued",
        heroDescriptions: [
            "Warhost analysis indicates a sleek alien palette with elegant contrast, measured rhythm, and colours fit for a dying empire.",
            "Archive augurs record a cohesive xenos identity, with bright panel separation and a refined warhost silhouette.",
            "This scheme carries the hallmarks of an ordered alien host: clean contrast, disciplined ornament, and an unmistakable martial presence.",
            "Visual analysis confirms a distinct warhost livery, suitable for swift blade-work, disciplined volleys, and ancient pride.",
        ],
        modelSectionLabel: "Aspect Designation",
        generateLabel: "Generate New Warhost",
        customizeLabel: "Customize Warhost",
        shareLabel: "Share Warhost",
        cardTopLabel: "XENOS HOST",
        paletteLabel: "Warhost Palette",
        idLabel: "Archive ID",
        sourceLabel: "Origin",
    },

    faction: {
        key: "xenos",
        accentBarClass: "bg-faction-xenos",
        badgeClass: "badge-xenos",
        textClass: "text-faction-xenos",
        buttonClass: "btn-faction-xenos",
        softBgClass: "bg-faction-xenos-soft",
    },

    models: {
        avenger: {
            label: "Dire Avenger",
            component: EldarAvenger,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0]?.hex,
                secondary: colors[1]?.hex,
                accent: colors[2]?.hex,
                pattern,
            }),
        },
    },

    getSwatchIndices: ({ colors }) => {
        const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
        return areColorsDifferent
            ? [0, 1, 2].filter((i) => colors[i])
            : [0, 2].filter((i) => colors[i]);
    },

    search: {
        placeholder: "eldar-twilightbound-989898-6d655f-2c9bcc-8-analogous",
        buttonLabel: "Look up a Warhost",
        ariaLabel: "Warhost lookup code",
    },

}
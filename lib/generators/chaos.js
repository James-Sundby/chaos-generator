import ChaosMarine from "../models/chaosSpaceMarine";
import { createWarbandAndGo } from "@/app/(actions)/serverActions";

export const chaosGenerator = {
    key: "chaos",
    group: "chaos",
    variant: "Chaos",
    noun: "warband",
    basePath: "/chaos",
    painterPath: "/chaos-painter",
    buttonTheme: "btn-accent",
    createAction: createWarbandAndGo,

    copy: {
        completionBadge: "Generation Complete",
        classification: "Heretic Astartes",
        statusLabel: "Traitor",
        heroDescriptions: [
            "Warp-tainted analysis confirms a stable warband livery, with profane trim balance and a silhouette fit for the Long War.",
            "Corrupted heraldic markers remain coherent across the plate, suggesting a warband identity worthy of terror, conquest, and display.",
            "Archive corruption detected: this livery exhibits strong trim separation, blasphemous colour discipline, and clear battlefield presence.",
            "The machine-spirit recoils, yet the results are undeniable: a viable traitor scheme fit for renegades, reavers, and damned champions.",
        ],
        modelSectionLabel: "Armour Designation",
        generateLabel: "Generate New Warband",
        customizeLabel: "Customize Warband",
        shareLabel: "Share Warband",
        cardTopLabel: "HERETIC ASTARTES",
        paletteLabel: "Warband Palette",
        idLabel: "Archive ID",
        sourceLabel: "Allegiance",
    },

    faction: {
        key: "chaos",
        accentBarClass: "bg-faction-chaos",
        badgeClass: "badge-chaos",
        textClass: "text-faction-chaos",
        buttonClass: "btn-faction-chaos",
        softBgClass: "bg-faction-chaos-soft",
    },

    models: {
        marine: {
            label: "Chaos Marine",
            component: ChaosMarine,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0]?.hex,
                secondary: colors[1]?.hex,
                edge: colors[2]?.hex,
                accent: colors[3]?.hex,
                pattern,
            }),
        },
    },

    getSwatchIndices: ({ colors, pattern }) => {
        if (pattern === "basic") {
            return [0, 2, 3].filter((i) => colors[i]);
        }
        return colors.map((_, i) => i).filter((i) => colors[i]);
    },

    search: {
        placeholder: "chaos-the-oathbroken-claws-02134e-4b213c-875408-003d15-half-tetradic",
        buttonLabel: "Look up a Warband",
        ariaLabel: "Warband lookup code",
    },
}
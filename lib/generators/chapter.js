import SpaceMarine from "@/lib/models/spaceMarine";
import Terminator from "@/lib/models/terminator";
import { createChapterAndGo } from "@/app/(actions)/serverActions";

export const chapterGenerator = {
    key: "chapter",
    group: "loyalist",
    variant: "Chapter",
    noun: "chapter",
    basePath: "/chapter",
    painterPath: "/painter",
    buttonTheme: "btn-primary",
    createAction: createChapterAndGo,

    copy: {
        completionBadge: "Generation Complete",
        classification: "Adeptus Astartes",
        statusLabel: "Sanctioned",
        heroDescriptions: [
            "Archive logic confirms a viable chapter identity, with balanced heraldry, disciplined contrast, and colours worthy of service to the Throne.",
            "A stable chapter livery has been identified, suitable for immediate field use, later refinement, or preservation within the archive.",
            "Palette analysis suggests a credible Adeptus Astartes scheme, with strong chapter character and clean heraldic separation across the armour plate.",
            "Technical readouts indicate a sanctioned chapter colour identity, fit for successor lineages, crusading hosts, and further customization.",
        ],
        modelSectionLabel: "Armour Designation",
        generateLabel: "Generate New Chapter",
        customizeLabel: "Customize Chapter",
        shareLabel: "Share Chapter",
        cardTopLabel: "ADEPTUS ASTARTES",
        paletteLabel: "Colour Palette",
        idLabel: "Archive ID",
        sourceLabel: "Lineage",
    },

    faction: {
        key: "loyalist",
        accentBarClass: "bg-faction-loyalist",
        badgeClass: "badge-loyalist",
        textClass: "text-faction-loyalist",
        buttonClass: "btn-faction-loyalist",
        softBgClass: "bg-faction-loyalist-soft",
    },

    models: {
        marine: {
            label: "Marine",
            component: SpaceMarine,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0]?.hex,
                secondary: colors[1]?.hex,
                trim: colors[2]?.hex,
                pattern,
            }),
        },
        terminator: {
            label: "Terminator",
            component: Terminator,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0]?.hex,
                secondary: colors[1]?.hex,
                trim: colors[2]?.hex,
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
        placeholder: "chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random",
        buttonLabel: "Look up a Chapter",
        ariaLabel: "Chapter lookup code",
    },
}
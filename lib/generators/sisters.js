import SisterOfBattle from "../models/sisterOfBattle";
import { createSistersAndGo } from "@/app/(actions)/serverActions";

export const sistersGenerator = {
    key: "sisters",
    group: "loyalist",
    variant: "Order",
    noun: "order",
    basePath: "/sisters",
    painterPath: "/sisters-painter",
    buttonTheme: "btn-primary",
    createAction: createSistersAndGo,

    copy: {
        completionBadge: "Generation Complete",
        classification: "Adepta Sororitas",
        statusLabel: "Sanctioned",
        heroDescriptions: [
            "Archive logic confirms a viable order identity, with disciplined heraldry, ceremonial contrast, and colours worthy of service to the Throne.",
            "A stable order livery has been identified, suitable for immediate field use, later refinement, or preservation within the archive.",
            "Palette analysis suggests a credible Adepta Sororitas scheme, with strong order character and clear separation across armour, vestments, and sacred trim.",
            "Technical readouts indicate a sanctioned Sororitas colour identity, fit for battle convents, shrine worlds, and further customization.",
        ],
        modelSectionLabel: "Armour Designation",
        generateLabel: "Generate New Order",
        customizeLabel: "Customize Order",
        shareLabel: "Share Order",
        cardTopLabel: "ADEPTA SORORITAS",
        paletteLabel: "Colour Palette",
        idLabel: "Archive ID",
        sourceLabel: "Convent",
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
        sister: {
            label: "Sister",
            component: SisterOfBattle,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0]?.hex,
                secondary: colors[1]?.hex,
                edge: colors[2]?.hex,
                accent: colors[3]?.hex,
                pattern,
            }),
        },
    },

    getSwatchIndices: ({ colors }) => [0, 1, 2, 3].filter((i) => colors[i]),

    search: {
        placeholder: "sisters-order-of-the-ashen-mantle-1a1a1a-e8e2d0-c9a227-9f1d20-sanctified-analogous",
        buttonLabel: "Look up an Order",
        ariaLabel: "Order lookup code",
    },
};
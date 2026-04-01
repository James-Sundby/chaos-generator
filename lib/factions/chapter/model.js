import SpaceMarine from "@/lib/factions/chapter/models/spaceMarine";
import Terminator from "@/lib/factions/chapter/models/terminator";

export const modelConfig = {
    models: {
        marine: {
            label: "Marine",
            component: SpaceMarine,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0],
                secondary: colors[1],
                trim: colors[2],
                pattern,
            }),
        },
        terminator: {
            label: "Terminator",
            component: Terminator,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0],
                secondary: colors[1],
                trim: colors[2],
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
};
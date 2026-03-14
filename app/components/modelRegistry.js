import SpaceMarine from "./models/spaceMarine";
import ChaosMarine from "./models/chaosSpaceMarine";
import Terminator from "./models/terminator";
import EldarAvenger from "./models/eldarAvenger";

function getLoyalistComponent(model) {
    return model === "terminator" ? Terminator : SpaceMarine;
    // return model === "terminator" ? Terminator : EldarAvenger;
}

export const modelRegistry = {
    // Chapter: {
    //     getComponent: ({ model }) => getLoyalistComponent(model),
    //     getModelProps: ({ colors, pattern }) => ({
    //         primary: colors[0]?.hex,
    //         secondary: colors[1]?.hex,
    //         accent: colors[2]?.hex,
    //         pattern: "1",
    //     }),
    //     getSwatchIndices: ({ colors }) => {
    //         const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
    //         return areColorsDifferent ? [0, 1, 2].filter(i => colors[i]) : [0, 2].filter(i => colors[i]);
    //     },
    // },

    Chapter: {
        getComponent: ({ model }) => getLoyalistComponent(model),
        getModelProps: ({ colors, pattern }) => ({
            primary: colors[0]?.hex,
            secondary: colors[1]?.hex,
            trim: colors[2]?.hex,
            pattern,
        }),
        getSwatchIndices: ({ colors }) => {
            const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
            return areColorsDifferent ? [0, 1, 2].filter(i => colors[i]) : [0, 2].filter(i => colors[i]);
        },
    },

    Chaos: {
        getComponent: () => ChaosMarine,
        getModelProps: ({ colors, pattern }) => ({
            primary: colors[0]?.hex,
            secondary: colors[1]?.hex,
            edge: colors[2]?.hex,
            accent: colors[3]?.hex,
            pattern,
        }),
        getSwatchIndices: ({ colors, pattern }) => {
            if (pattern === "Basic") {
                return [0, 2, 3].filter(i => colors[i]);
            }
            return colors.map((_, i) => i).filter(i => colors[i]);
        },
    },

    Eldar: {
        getComponent: () => EldarAvenger,
        getModelProps: ({ colors, pattern }) => ({
            primary: colors[0]?.hex,
            secondary: colors[1]?.hex,
            accent: colors[2]?.hex,
            pattern,
        }),
        getSwatchIndices: ({ colors }) => {
            const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
            return areColorsDifferent ? [0, 1, 2].filter(i => colors[i]) : [0, 2].filter(i => colors[i]);
        },
    },
};

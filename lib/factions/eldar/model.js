import EldarAvenger from "./models/eldarAvenger";

export const modelConfig = {
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
}
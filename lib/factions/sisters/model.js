import SisterOfBattle from "./models/sisterOfBattle"

export const modelConfig = {
    models: {
        sister: {
            label: "Sister",
            component: SisterOfBattle,
            getModelProps: ({ colors, pattern }) => ({
                primary: colors[0],
                secondary: colors[1],
                edge: colors[2],
                accent: colors[3],
                pattern,
            }),
        },
    },

    getSwatchIndices: ({ colors }) => [0, 1, 2, 3].filter((i) => colors[i]),
}
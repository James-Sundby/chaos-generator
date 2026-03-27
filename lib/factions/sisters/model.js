import SisterOfBattle from "./models/sisterOfBattle"

export const modelConfig = {
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
}
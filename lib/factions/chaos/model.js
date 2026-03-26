import ChaosMarine from "./models/chaosSpaceMarine";

export const modelConfig = {
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
}
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const makeSampleEntity = ({ colorCount, pattern }) => ({
    name: "Sample",
    slug: "sample",
    pattern,
    colors: Array.from({ length: colorCount }, () => ({
        name: "White Scar",
        hex: "#FFFFFF",
    })),
    message: "",
    mode: "",
    isSample: true,
});

const defaultEntities = {
    chapter: makeSampleEntity({ colorCount: 3, pattern: "arms" }),
    chaos: makeSampleEntity({ colorCount: 4, pattern: "basic" }),
    sisters: makeSampleEntity({ colorCount: 4, pattern: "1" }),
    eldar: makeSampleEntity({ colorCount: 3, pattern: "1" }),
};

export const useFactionStore = create(
    persist(
        (set, get) => ({
            entities: defaultEntities,

            setEntity: (key, data) => {
                set((state) => {
                    if (!state.entities[key]) return state;

                    return {
                        entities: {
                            ...state.entities,
                            [key]: {
                                ...state.entities[key],
                                ...data,
                                isSample: false,
                            },
                        },
                    };
                });
            },

            resetEntity: (key) => {
                set((state) => {
                    if (!defaultEntities[key]) return state;

                    return {
                        entities: {
                            ...state.entities,
                            [key]: defaultEntities[key],
                        },
                    };
                });
            },

            getEntity: (key) => get().entities[key],
        }),
        {
            name: "faction-store",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ entities: state.entities }),
        }
    )
);
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRecentSchemesStore = create(
    persist(
        (set) => ({
            schemes: [],

            addScheme: (scheme) =>
                set((state) => {
                    const deduped = state.schemes.filter((item) => item.slug !== scheme.slug);
                    return {
                        schemes: [scheme, ...deduped].slice(0, 5),
                    };
                }),

            clearSchemes: () => set({ schemes: [] }),
        }),
        {
            name: "recent-schemes",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ schemes: state.schemes }),
        }
    )
);
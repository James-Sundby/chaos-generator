import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Default, no restrictions on patterns or colours, current functionality.
// SM2, should limit colour list to the ones available in the game, and may need to limit patterns based on feedback on recolourable zones. 
// Constrast, limit the colour choices to contrast paints, remove split patterns due to difficulty in application on models.

export const useSettingsStore = create(
    persist(
        (set) => ({
            colourMode: "default",
            setColourMode: (mode) => set({ colourMode: mode }),
        }),
        {
            name: "chapter-gen-settings",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ colourMode: state.colourMode }),
        }
    )
);
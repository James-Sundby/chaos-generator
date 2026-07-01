import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const DEFAULT_SECTIONS = {
    "Right-Shoulder-Trim": "#FFFFFF",
    "Right-Shoulder-Pad": "#FFFFFF",
    "Left-Shoulder-Trim": "#FFFFFF",
    "Left-Shoulder-Pad": "#FFFFFF",

    "Right-Arm": "#FFFFFF",
    "Left-Arm": "#FFFFFF",

    "Right-Leg": "#FFFFFF",
    "Right-Shin": "#FFFFFF",
    "Left-Shin": "#FFFFFF",
    "Left-Leg": "#FFFFFF",

    "Right-Helmet": "#FFFFFF",
    "Left-Helmet": "#FFFFFF",

    "Cod-Right": "#FFFFFF",
    "Cod-Left": "#FFFFFF",

    "Torso-Right": "#FFFFFF",
    "Torso-Left": "#FFFFFF",

    "Right-Backpack": "#FFFFFF",
    "Left-Backpack": "#FFFFFF",

    Belt: "#FFFFFF",
    Eagle: "#FFFFFF",
    Ribbing: "#FFFFFF",
};

function createDefaultSections() {
    return { ...DEFAULT_SECTIONS };
}

export const usePainterStore = create(
    persist(
        (set) => ({
            sections: createDefaultSections(),

            setColor: (sectionIds, color) =>
                set((state) => {
                    const ids = Array.isArray(sectionIds)
                        ? sectionIds
                        : [sectionIds];

                    const updatedSections = { ...state.sections };

                    ids.forEach((id) => {
                        if (id in updatedSections) {
                            updatedSections[id] = color;
                        } else {
                            console.warn(`Unknown painter section id: ${id}`);
                        }
                    });

                    return { sections: updatedSections };
                }),

            resetColors: () =>
                set(() => ({
                    sections: createDefaultSections(),
                })),
        }),
        {
            name: "painter-store-v2",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ sections: state.sections }),
        }
    )
);
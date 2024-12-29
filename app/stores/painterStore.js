import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const usePainterStore = create(
    persist(
        (set) => ({
            sections: {
                'Right-Shoulder-Trim': '#FFFFFF',
                'Right-Shoulder-Pad': '#FFFFFF',
                'Left-Shoulder-Trim': '#FFFFFF',
                'Left-Shoulder-Pad': '#FFFFFF',
                'Right-Hand': '#FFFFFF',
                'Right-Forearm': '#FFFFFF',
                'Left-Forearm': '#FFFFFF',
                'Left-Hand': '#FFFFFF',
                'Right-Thigh': '#FFFFFF',
                'Right-Boot': '#FFFFFF',
                'Left-Boot': '#FFFFFF',
                'Right-Shin': '#FFFFFF',
                'Left-Shin': '#FFFFFF',
                'Left-Thigh': '#FFFFFF',
                'Right-Helmet': '#FFFFFF',
                'Left-Helmet': '#FFFFFF',
                'Cod-Right': '#FFFFFF',
                'Cod-Left': '#FFFFFF',
                'Torso-Right': '#FFFFFF',
                'Torso-Left': '#FFFFFF',
                'Right-Backpack': '#FFFFFF',
                'Left-Backpack': '#FFFFFF',
                'Right-Belt': '#FFFFFF',
                'Left-Belt': '#FFFFFF',
                'Eagle': '#FFFFFF',
                'Ribbing': '#FFFFFF',
            },

            setColor: (sectionIds, color) =>
                set((state) => {
                    const updatedSections = { ...state.sections };
                    sectionIds.forEach((id) => {
                        updatedSections[id] = color; // Assign color to each section ID
                    });
                    return { sections: updatedSections };
                }),

            resetColors: () =>
                set((state) => {
                    const resetSections = Object.keys(state.sections).reduce((acc, id) => {
                        acc[id] = '#FFFFFF';
                        return acc;
                    }, {});
                    return { sections: resetSections };
                }),
        }),
        {
            name: 'painter-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ sections: state.sections }),
        }
    )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const defaultWarhost = {
    warbandName: 'Sample',
    slug: 'sample',
    pattern: '1',
    colors: [
        { name: "White Scar", hex: "#FFFFFF" },
        { name: "White Scar", hex: "#FFFFFF" },
        { name: "White Scar", hex: "#FFFFFF" },
    ],
    message: '',
    mode: '',
    isSample: true
};

export const useWarhostStore = create(
    persist(
        (set) => ({
            warhost: defaultWarhost,
            setWarhost: (data) => {
                set((state) => ({
                    warhost: { ...state.warhost, ...data, isSample: false },
                }));
            },
            resetWarhost: () => {
                set({
                    warhost: defaultWarhost,
                });
            },
        }),
        {
            name: 'warhost-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ warhost: state.warhost }),
        }
    )
);
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useWarbandStore = create(
    persist(
        (set, get) => ({
            warband: {
                warbandName: 'Sample',
                slug: 'sample',
                pattern: 'Arms',
                colors: [
                    { name: "White Scar", hex: "#FFFFFF" },
                    { name: "White Scar", hex: "#FFFFFF" },
                    { name: "White Scar", hex: "#FFFFFF" },
                ],
                message: '',
            },
            setWarband: (data) => {
                // console.log('Updating warband with data:', data);
                set((state) => ({ warband: { ...state.warband, ...data } }))
            },
            resetWarband: () => {
                // console.log('Resetting warband to initial state.');
                set({
                    warband: {
                        warbandName: '',
                        slug: '',
                        pattern: '',
                        colors: [],
                        message: '',
                    },
                });
            },
        }),
        {
            name: 'warband-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ warband: state.warband }),
        }
    )
);


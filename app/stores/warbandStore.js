// stores/warbandStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useWarbandStore = create(
    persist(
        (set, get) => ({
            warband: {
                warbandName: '',
                slug: '',
                pattern: 'Arms',
                metal: {
                    code: "gks",
                    name: "Grey Knight's Steel",
                    hex1: "#ffffff",
                    hex2: "#a5b4be",
                    hex3: "#465863",
                },
                colors: [{ name: "White Scar", hex: "#FFFFFF" }, { name: "White Scar", hex: "#FFFFFF" },],
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
                        metal: {
                            code: '',
                            hex1: '',
                            hex2: '',
                            hex3: '',
                            name: '',
                        },
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


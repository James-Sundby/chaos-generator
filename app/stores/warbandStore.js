// stores/warbandStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useWarbandStore = create(
    persist(
        (set, get) => ({
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
            },
            setWarband: (data) => {
                console.log('Updating warband with data:', data);
                set({ warband: data });
            },
            resetWarband: () => {
                console.log('Resetting warband to initial state.');
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


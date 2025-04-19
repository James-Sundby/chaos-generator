import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChaosStore = create(
    persist(
        (set, get) => ({
            chaosBand: {
                warbandName: 'Loading...',
                slug: 'loading',
                pattern: 'Basic',
                colors: [
                    { name: "White Scar", hex: "#FFFFFF" },
                    { name: "White Scar", hex: "#FFFFFF" },
                    { name: "White Scar", hex: "#FFFFFF" },
                ],
                message: '',
            },
            setChaosBand: (data) => {
                set((state) => ({
                    chaosBand: { ...state.chaosBand, ...data }
                }));
            },
            resetChaosBand: () => {
                set({
                    chaosBand: {
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
            name: 'chaos-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ chaosBand: state.chaosBand }),
        }
    )
);
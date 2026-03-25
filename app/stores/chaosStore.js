// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// const defaultChaosWarband = {
//     name: 'Sample',
//     slug: 'sample',
//     pattern: 'Basic',
//     colors: [
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//     ],
//     message: '',
//     mode: '',
//     isSample: true,
// }

// export const useChaosStore = create(
//     persist(
//         (set, get) => ({
//             chaosBand: defaultChaosWarband,
//             setChaosBand: (data) => {
//                 set((state) => ({
//                     chaosBand: { ...state.chaosBand, ...data, isSample: false }
//                 }));
//             },
//             resetChaosBand: () => {
//                 set({
//                     chaosBand: defaultChaosWarband,
//                 });
//             },
//         }),
//         {
//             name: 'chaos-store',
//             storage: createJSONStorage(() => sessionStorage),
//             partialize: (state) => ({ chaosBand: state.chaosBand }),
//         }
//     )
// );
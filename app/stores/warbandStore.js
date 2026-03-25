// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// const defaultChapter = {
//     name: 'Sample',
//     slug: 'sample',
//     pattern: 'Arms',
//     colors: [
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//     ],
//     message: '',
//     mode: '',
//     isSample: true,
// }

// export const useWarbandStore = create(
//     persist(
//         (set, get) => ({
//             warband: defaultChapter,
//             setWarband: (data) => {
//                 set((state) => ({ warband: { ...state.warband, ...data, isSample: false } }))
//             },
//             resetWarband: () => {
//                 set({
//                     warband: defaultChapter,
//                 });
//             },
//         }),
//         {
//             name: 'warband-store',
//             storage: createJSONStorage(() => sessionStorage),
//             partialize: (state) => ({ warband: state.warband }),
//         }
//     )
// );


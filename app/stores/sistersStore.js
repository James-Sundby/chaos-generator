// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// const defaultOrder = {
//     name: "Sample",
//     slug: "sample",
//     pattern: "1",
//     colors: [
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//         { name: "White Scar", hex: "#FFFFFF" },
//     ],
//     message: "",
//     mode: "",
//     isSample: true,
// };

// export const useSistersStore = create(
//     persist(
//         (set, get) => ({
//             order: defaultOrder,
//             setOrder: (data) =>
//                 set((state) => ({
//                     order: { ...state.order, ...data, isSample: false },
//                 })),
//             resetOrder: () => {
//                 set({
//                     order: defaultOrder
//                 });
//             },
//         }),
//         {
//             name: "sisters-store",
//             storage: createJSONStorage(() => sessionStorage),
//             partialize: (state) => ({ order: state.order }),
//         }
//     )
// );
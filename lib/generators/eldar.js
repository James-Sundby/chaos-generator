import { createWarhostAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/eldar/meta";

export const eldarGenerator = {
    ...meta,
    createAction: createWarhostAndGo,

    modelOptions: [
        {
            key: "avenger",
            label: "Dire Avenger",
        },
    ],
};
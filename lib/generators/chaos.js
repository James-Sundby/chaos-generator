import { createWarbandAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/chaos/meta";

export const chaosGenerator = {
    ...meta,
    createAction: createWarbandAndGo,

    modelOptions: [
        {
            key: "marine",
            label: "Chaos Marine",
        },
    ],
};
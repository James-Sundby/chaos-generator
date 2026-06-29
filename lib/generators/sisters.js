import { createSistersAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/sisters/meta";

export const sistersGenerator = {
    ...meta,
    createAction: createSistersAndGo,

    modelOptions: [
        {
            key: "sister",
            label: "Battle Sister",
        },
    ],
};
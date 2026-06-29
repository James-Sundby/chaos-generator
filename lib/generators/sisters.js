import { createSistersAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/sisters/meta";
import { modelConfig } from "@/lib/factions/sisters/model";

export const sistersGenerator = {
    ...meta,
    createAction: createSistersAndGo,
    models: modelConfig.models,
};
import { createWarhostAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/eldar/meta";
import { modelConfig } from "@/lib/factions/eldar/model";

export const eldarGenerator = {
    ...meta,
    createAction: createWarhostAndGo,
    models: modelConfig.models,
};
import { createWarbandAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/chaos/meta";
import { modelConfig } from "@/lib/factions/chaos/model";

export const chaosGenerator = {
    ...meta,
    createAction: createWarbandAndGo,
    models: modelConfig.models,
};
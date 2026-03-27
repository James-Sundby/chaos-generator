import { createWarbandAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";
import { getModelConfig } from "@/lib/factions/models";

const chaos = getPublicFaction("chaos");
const modelConfig = getModelConfig("chaos");

export const chaosGenerator = {
    ...chaos.meta,
    createAction: createWarbandAndGo,
    ...modelConfig,
};
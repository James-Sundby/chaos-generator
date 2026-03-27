import { createWarhostAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";
import { getModelConfig } from "../factions/models";


const eldar = getPublicFaction("eldar");
const modelConfig = getModelConfig("eldar");

export const eldarGenerator = {
    ...eldar.meta,
    createAction: createWarhostAndGo,
    ...modelConfig,
};
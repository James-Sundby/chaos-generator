import { createWarhostAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";

const eldar = getPublicFaction("eldar");

export const eldarGenerator = {
    ...eldar.meta,
    createAction: createWarhostAndGo,
    ...eldar.modelConfig,
};
import { createSistersAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";

const sisters = getPublicFaction("sisters");

export const sistersGenerator = {
    ...sisters.meta,
    createAction: createSistersAndGo,
    ...sisters.modelConfig,
};
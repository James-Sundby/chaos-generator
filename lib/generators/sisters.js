import { createSistersAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";
import { getModelConfig } from "../factions/models";

const sisters = getPublicFaction("sisters");
const modelConfig = getModelConfig("sisters");


export const sistersGenerator = {
    ...sisters.meta,
    createAction: createSistersAndGo,
    ...modelConfig,
};
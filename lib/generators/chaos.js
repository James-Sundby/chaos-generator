import { createWarbandAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";

const chaos = getPublicFaction("chaos");

export const chaosGenerator = {
    ...chaos.meta,
    createAction: createWarbandAndGo,
    ...chaos.modelConfig,
};
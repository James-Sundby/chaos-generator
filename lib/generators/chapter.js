import { createChapterAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";
import { getModelConfig } from "../factions/models";

const chapter = getPublicFaction("chapter");
const modelConfig = getModelConfig("chapter");

export const chapterGenerator = {
    ...chapter.meta,
    createAction: createChapterAndGo,
    ...modelConfig,
};
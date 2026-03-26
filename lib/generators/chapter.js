import { createChapterAndGo } from "@/app/(actions)/serverActions";
import { getPublicFaction } from "@/lib/factions/public";

const chapter = getPublicFaction("chapter");

export const chapterGenerator = {
    ...chapter.meta,
    createAction: createChapterAndGo,
    ...chapter.modelConfig,
};
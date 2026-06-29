import { createChapterAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/chapter/meta";
import { modelConfig } from "@/lib/factions/chapter/model";

export const chapterGenerator = {
    ...meta,
    createAction: createChapterAndGo,
    models: modelConfig.models,
};
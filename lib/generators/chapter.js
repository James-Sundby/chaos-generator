import { createChapterAndGo } from "@/app/(actions)/serverActions";
import { meta } from "@/lib/factions/chapter/meta";

export const chapterGenerator = {
    ...meta,
    createAction: createChapterAndGo,

    modelOptions: [
        {
            key: "marine",
            label: "Space Marine",
        },
        {
            key: "terminator",
            label: "Terminator",
        },

    ],
};
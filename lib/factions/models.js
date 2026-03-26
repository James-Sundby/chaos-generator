import { modelConfig as chapterModelConfig } from "./chapter/model";
import { modelConfig as chaosModelConfig } from "./chaos/model";
import { modelConfig as eldarModelConfig } from "./eldar/model";
import { modelConfig as sistersModelConfig } from "./sisters/model";

export const publicModelRegistry = {
    chapter: chapterModelConfig,
    chaos: chaosModelConfig,
    eldar: eldarModelConfig,
    sisters: sistersModelConfig,
};

export function getModelConfig(faction) {
    const entry = publicModelRegistry[faction];

    if (!entry) {
        throw new Error("bad-faction");
    }

    return entry;
}
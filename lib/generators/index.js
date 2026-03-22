import { chapterGenerator } from "./chapter";
import { chaosGenerator } from "./chaos";
import { eldarGenerator } from "./eldar";

export const generatorRegistry = {
    chapter: chapterGenerator,
    chaos: chaosGenerator,
    eldar: eldarGenerator,
};
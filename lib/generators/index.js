import { chapterGenerator } from "./chapter";
import { chaosGenerator } from "./chaos";
import { eldarGenerator } from "./eldar";
import { sistersGenerator } from "./sisters";

export const generatorRegistry = {
    chapter: chapterGenerator,
    chaos: chaosGenerator,
    eldar: eldarGenerator,
    sisters: sistersGenerator
};
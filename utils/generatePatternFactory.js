import { randomElement } from "@/utils/randomElement";

export function createPatternGenerator(patternList) {
    return () => randomElement(patternList);
}
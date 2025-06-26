import { randomElement } from "@/utils/randomElement";
import { chaosPatterns, patterns as loyalistPatterns } from "@/lib/armourPatterns";


function patternGenerator(patternList) {
    return () => randomElement(patternList);
}

export const generateChaosPattern = patternGenerator(chaosPatterns);
export const generateLoyalistPattern = patternGenerator(loyalistPatterns);
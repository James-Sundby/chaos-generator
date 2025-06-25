import { chaosPatterns, patterns as loyalistPatterns } from "@/lib/armourPatterns";
import { createPatternGenerator } from "./generatePatternFactory";

export const generateChaosPattern = createPatternGenerator(chaosPatterns);
export const generateLoyalistPattern = createPatternGenerator(loyalistPatterns);
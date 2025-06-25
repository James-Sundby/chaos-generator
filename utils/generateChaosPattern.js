import { randomElement } from "@/utils/randomElement";

import { chaosPatterns } from "@/lib/armourPatterns";

export function generateRandomPattern() {
    return randomElement(chaosPatterns);
}
import "server-only";

import { createPatternGenerator } from "@/utils/createPatternGenerator";
import { patterns } from "./patternOptions";

export const generatePattern = createPatternGenerator({
    patterns,
    excludedByColourMode: {
        contrast: new Set(["half", "quarter"]),
    },
});
import "server-only";

import { createNameGenerator } from "@/utils/createNameGenerator";
import { randomElement } from "@/utils/randomElement";
import { blacklist } from "./blacklist";
import {
    virtues,
    warriorTerms,
    placesOrEntities,
    adjectives,
    animals,
} from "./nameParts";

const formulae = [
    (rng) => `${randomElement(adjectives, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `${randomElement(warriorTerms, rng)} of ${randomElement(virtues, rng)}`,
    (rng) => `${randomElement(warriorTerms, rng)} of ${randomElement(placesOrEntities, rng)}`,
    (rng) => `The ${randomElement(adjectives, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `${randomElement(adjectives, rng)} ${randomElement(animals, rng)}`,
    (rng) => `${randomElement(animals, rng)} of ${randomElement(placesOrEntities, rng)}`,
    (rng) => `${randomElement(placesOrEntities, rng).replace(/^the\s+/i, "")}'s ${randomElement(warriorTerms, rng)}`,
];

export const generateName = createNameGenerator({
    formulae,
    blacklist,
    fallback: "Unregistered Chapter",
});
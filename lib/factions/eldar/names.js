import "server-only";

import { createNameGenerator } from "@/utils/createNameGenerator";
import { randomElement } from "@/utils/randomElement";
import { eldarAdjectives, eldarWarriorTerms, eldarAbstracts, eldarCelestial } from "./nameParts"

const formulae = [
    (rng) => `${randomElement(eldarAdjectives, rng)} ${randomElement(eldarWarriorTerms, rng)}`,
    (rng) => `${randomElement(eldarWarriorTerms, rng)} of ${randomElement(eldarAbstracts, rng)}`,
    (rng) => `${randomElement(eldarWarriorTerms, rng)} of the ${randomElement(eldarCelestial, rng)}`,
    (rng) => `The ${randomElement(eldarAdjectives, rng)} ${randomElement(eldarWarriorTerms, rng)}`,
    (rng) => `${randomElement(eldarAbstracts, rng)} of the ${randomElement(eldarCelestial, rng)}`,
    (rng) => `Children of the ${randomElement(eldarCelestial, rng)}`,
    (rng) => `${randomElement(eldarAdjectives, rng)} ${randomElement(eldarAbstracts, rng)}`,
    (rng) => `The ${randomElement(eldarAbstracts, rng)} Weavers`,
    (rng) => `${randomElement(eldarAbstracts, rng)}bound`,
    (rng) => `${randomElement(eldarCelestial, rng)}borne`,
];

export const generateName = createNameGenerator({
    formulae,
    fallback: "Unregistered Warhost",
});
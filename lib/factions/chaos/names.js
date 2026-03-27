import "server-only";

import { createNameGenerator } from "@/utils/createNameGenerator";
import { randomElement } from "@/utils/randomElement";
import { blacklist } from "./blacklist";
import {
    chaoticDescriptors,
    darkEntities,
    warriorTerms,
    abstractNouns,
    adjectives,
} from "./nameParts";

const formulae = [
    (rng) => `${randomElement(warriorTerms, rng)} of ${randomElement(darkEntities, rng)}`,
    (rng) => `${randomElement(chaoticDescriptors, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `${randomElement(abstractNouns, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `${randomElement(adjectives, rng)} ${randomElement(warriorTerms, rng)} of ${randomElement(darkEntities, rng)}`,
    (rng) => `${randomElement(abstractNouns, rng)} of ${randomElement([...darkEntities, ...chaoticDescriptors], rng)}`,
    (rng) => `The ${randomElement(adjectives, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `Children of the ${randomElement(chaoticDescriptors, rng)}`,
    (rng) => `${randomElement(adjectives, rng)} ${randomElement(warriorTerms, rng)} of ${randomElement(abstractNouns, rng)}`,
    (rng) => `The ${randomElement(chaoticDescriptors, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `The ${randomElement(warriorTerms, rng)} of ${randomElement(chaoticDescriptors, rng)}`,
    (rng) => `${randomElement(darkEntities, rng)} ${randomElement(warriorTerms, rng)}`,
    (rng) => `Cult of ${randomElement(abstractNouns, rng)}`,
    (rng) => `Order of the ${randomElement(chaoticDescriptors, rng)} ${randomElement(abstractNouns, rng)}`,
    (rng) => `The Fallen ${randomElement(warriorTerms, rng)}`,
    (rng) => `The Oath-Broken ${randomElement(warriorTerms, rng)}`,
    (rng) => `${randomElement(warriorTerms, rng)} of ${randomElement(["Blood", "Decay", "Change", "Excess"], rng)}`,
    (rng) => `The ${randomElement(abstractNouns, rng)}bound`,
    (rng) => `${randomElement(abstractNouns, rng)}forged`,
];

export const generateName = createNameGenerator({
    formulae,
    blacklist,
    fallback: "Unregistered Warband",
});
import { randomElement } from "@/utils/randomElement";

import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives as chaosAdjectives } from "@/lib/chaosData";
import { virtues, warriorTerms as loyalTerms, placesOrEntities, adjectives as loyalAdjectives, animals } from "@/lib/loyalData";


function nameGenerator(formulae) {
    return () => randomElement(formulae)();
}

// Chaos Warbands
const chaosFormulas = [
    () => `${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
    () => `${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
    () => `${randomElement(abstractNouns)} ${randomElement(warriorTerms)}`,
    () => `${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
    () => `${randomElement(abstractNouns)} of ${randomElement([...darkEntities, ...chaoticDescriptors])}`,
    () => `The ${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)}`,
    () => `Children of the ${randomElement(chaoticDescriptors)}`,
    () => `${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
    () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
    () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
    () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`
];

export const generateWarbandName = nameGenerator(chaosFormulas);

// Loyalist Chapters
const loyalistFormulas = [
    () => `${randomElement(loyalAdjectives)} ${randomElement(loyalTerms)}`,
    () => `${randomElement(loyalTerms)} of ${randomElement(virtues)}`,
    () => `${randomElement(loyalTerms)} of ${randomElement(placesOrEntities)}`,
    () => `The ${randomElement(loyalAdjectives)} ${randomElement(loyalTerms)}`,
    () => `${randomElement(loyalAdjectives)} ${randomElement(animals)}`,
    () => `${randomElement(animals)} of ${randomElement(placesOrEntities)}`,
];

export const generateChapterName = nameGenerator(loyalistFormulas);

// Xenos?
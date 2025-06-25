import { randomElement } from "@/utils/randomElement";
import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives } from "@/lib/chaosData";

export function generateWarbandName() {
    const formulas = [
        () => `${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(abstractNouns)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(abstractNouns)} of ${randomElement([...darkEntities, ...chaoticDescriptors])}`,
        () => `The ${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `Children of the ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
        () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`

    ];
    return randomElement(formulas)();
}
